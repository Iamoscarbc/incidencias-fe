<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Incidencias</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Incidencias</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="a in incidences" @click="redirectDetail(a._id)">
        <ion-card-header>
          <ion-card-title>Incidencia #{{ a._id.substr(a._id.length-4,4) }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <Timeline :steps="a.timeline"/>
        </ion-card-content>
      </ion-card>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="redirectAdd()" v-if="!!user && user.idProfile._id != '653752a46f75ce25da5cb7dd'">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios'
import { mapState } from 'vuex'
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonIcon, IonFabButton, IonFab, IonRefresher, IonRefresherContent  } from '@ionic/vue';
import Timeline from '@/components/TimeLine.vue';
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
    IonFab,
    IonRefresher,
    IonRefresherContent
  },
  computed:{
      ...mapState("usuarios",['user']),
  },
  setup() {
    const router = useRouter();

    let incidences = ref<any>([])

    const redirectDetail = (id: any) => {
      router.push({ name: 'DetalleIncidencia', params: { id: id } })
    };

    const redirectAdd = () => {
      router.push({ name: 'AgregarIncidencia'})
    }

    const getIncidences = async () => {
      let token = localStorage.getItem("token")
      const res:any = await axios.get("http://206.189.176.12:3002/api/incidences", {
          headers: {
              "Authorization": 'Bearer '+ token
          }
      })
      const response = res.data
      if(response.success){
        incidences.value = response.data
      }
    }

    const handleRefresh = async (event: any) => {
      await getIncidences()
      event.target.complete()
    }

    const ionViewDidEnter = () => {
      getIncidences()
    }

    return {
      incidences,
      redirectDetail,
      redirectAdd,
      handleRefresh,
      ionViewDidEnter,
      add
    }
  }
});
</script>
