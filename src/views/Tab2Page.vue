<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reportes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reportes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-datetime-button datetime="datetime"></ion-datetime-button>
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime id="datetime" presentation="month-year" :show-default-buttons="true" max="2023-10-16" done-text="Filtrar" cancel-text="Cancelar"></ion-datetime>
      </ion-modal>
      <apexchart type="bar" :options="graphicData.chartOptions" :series="graphicData.series"></apexchart>
      <apexchart type="bar" :options="graphicData.chartOptions" :series="graphicData.series"></apexchart>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonDatetime, IonDatetimeButton, IonModal
  },
  setup() {
    const graphicData = ref({
      series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          background: '#ffffff'
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
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
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
      }
    })

    return {
      graphicData
    }
  },
})
</script>

<style scoped>
ion-datetime-button{
  margin-bottom: 16px;
}
ion-datetime-button::part(native){
  width: 100%;
}
</style>