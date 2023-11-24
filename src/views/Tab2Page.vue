<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reportes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reportes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-datetime-button class="ion-padding" datetime="datetime"></ion-datetime-button>
      <ion-modal id="modal-datetime" :keep-contents-mounted="true">
        <ion-datetime v-model="period" id="datetime" color="primary" presentation="month-year" :show-default-buttons="true" min="2022-12-31" :max="periodCurrent" @ionChange="changePeriod" done-text="Filtrar" cancel-text="Cancelar"></ion-datetime>
      </ion-modal>
      <apexchart v-if="!loading" class="ion-padding" type="bar" width="100%" height="350" :options="chartOptions1" :series="series1"></apexchart>
      <apexchart v-if="!loading" class="ion-padding" type="bar" width="100%" height="350" :options="chartOptions2" :series="series2"></apexchart>
      <ion-loading :isOpen="true" message="Obteniendo datos..." v-if="loading"> </ion-loading>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
import * as moment from 'moment-timezone';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonDatetimeButton, IonModal, IonLoading } from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonLoading,
    apexchart: VueApexCharts
  },
  setup() {
    const loading = ref(true)
    const chartOptions1 = ref({
      theme: {
        mode: 'dark',
      },
      chart: {
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }]
    })

    const chartOptions2 = ref({
      theme: {
        mode: 'dark',
      },
      chart: {
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          return `
            <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${w.globals.labels[dataPointIndex]} ${series[seriesIndex][dataPointIndex] == 1 ? '' : '(Reincidente)'}</div>
            <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
              <span class="apexcharts-tooltip-marker" style="background-color: ${w.config.series[0].data[dataPointIndex].fillColor};"></span>
              <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label">Total de Incidencias: </span>
                  <span class="apexcharts-tooltip-text-y-value">${series[seriesIndex][dataPointIndex]}</span>
                </div>
                <div class="apexcharts-tooltip-goals-group">
                  <span class="apexcharts-tooltip-text-goals-label"></span>
                  <span class="apexcharts-tooltip-text-goals-value"></span>
                </div>
                <div class="apexcharts-tooltip-z-group">
                  <span class="apexcharts-tooltip-text-z-label"></span>
                  <span class="apexcharts-tooltip-text-z-value"></span>
                </div>
              </div>
            </div>`
        }
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        }
      }]
    })

    const graphicData = ref<any>({
        graphic1: [],
        graphic2: []
    })

    const series1 = computed({
      get() {
        return [
          {
            name: 'Total de Incidencias',
            data: graphicData.value.graphic1.map((a) => {
              return {
                x: a.date,
                y: a.incidences
              }
            })
          },
          {
            name: 'Incidencias Atendidas',
            data: graphicData.value.graphic1.map((a) => {
              return {
                x: a.date,
                y: a.incidencesEnded
              }
            })
          }
        ]
      },
      set() {

      }
    })

    const series2 = computed({
      get() {
        return [
          {
            name: 'Incidencias',
            data: graphicData.value.graphic2.map((a) => {
              return {
                x: a._id,
                y: a.count,
                fillColor: a.count == 1 ? 'rgb(78, 205, 196)' : '#EB8C87'
              }
            })
          }
        ]
      },
      set() {

      }
    })

    const periodCurrent = moment().format('YYYY-MM-DD')

    let period = ref(moment().format())

    const changePeriod = () => {
      let periodMoment = moment(period.value).format('YYYY-MM')
      getCharts(periodMoment)
    }
    
    const getCharts = async (period) => {
      loading.value = true
      try {
        let token = localStorage.getItem("token")
        const res:any = await axios.get("http://206.189.176.12:3002/api/indicators/"+period, {
          headers: {
            "Authorization": 'Bearer '+ token
          }
        })
        const response = res.data
        if(response.success){
          graphicData.value.graphic1 = response.data.graphic1
          graphicData.value.graphic2 = response.data.graphic2
          console.log("response.data", response.data)
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        loading.value = false
      }
    }

    const ionViewDidEnter = () => {
      changePeriod()
    }

    return {
      chartOptions1,
      chartOptions2,
      series1,
      series2,
      period,
      periodCurrent,
      loading,
      graphicData,
      changePeriod,
      ionViewDidEnter
    }
  },
})
</script>

<style scoped>
ion-datetime-button::part(native){
  width: 100%;
}
ion-modal#modal-datetime {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#modal-datetime h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#modal-datetime ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }

  ion-modal#modal-datetime .wrapper {
    margin-bottom: 10px;
  }
</style>