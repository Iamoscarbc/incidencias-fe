<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Incidencias</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Incidencias</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="a in incidencias" @click="redirectDetail(a._id)">
        <ion-card-header>
          <ion-card-title>Incidencia #{{ a._id.substr(a._id.length-4,4) }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <Timeline :steps="a.timeline"/>
        </ion-card-content>
      </ion-card>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="redirectAdd()">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonIcon, IonFabButton, IonFab  } from '@ionic/vue';
import Timeline from '@/components/Timeline.vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    Timeline,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonIcon,
    IonFabButton,
    IonFab
  },
  setup() {
    const router = useRouter();
    const incidencias = ref<any>([]);

    const redirectDetail = (id: any) => {
      router.push({ name: 'DetalleIncidencia', params: { id: id } })
    };

    const redirectAdd = () => {
      router.push({ name: 'AgregarIncidencia'})
    }

    const getIncidences = async () => {
      let token = localStorage.getItem("token")
      const res:any = await axios.get("/api/incidences", {
          headers: {
              "Authorization": 'Bearer '+ token
          }
      })
      const response = res.data
      if(response.success){
        incidencias.value = response.data
      }
    }

    onMounted(() => {
      getIncidences()
    })

    return {
      incidencias,
      redirectDetail,
      redirectAdd,
      add
    }
  }
  // Resto del código de tu vista
});
</script>
