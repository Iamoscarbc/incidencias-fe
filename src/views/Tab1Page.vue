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
  ionViewDidEnter() {
    this.getIncidences()
  },
  computed:{
      ...mapState("usuarios",['user']),
  },
  data(){
    return {
      incidences: []
    }
  },
  methods: {
    async getIncidences () {
      this.incidences = []
      let token = localStorage.getItem("token")
      const res:any = await axios.get("/api/incidences", {
          headers: {
              "Authorization": 'Bearer '+ token
          }
      })
      const response = res.data
      if(response.success){
        this.incidences = response.data
      }
    }
  },
  setup() {
    const router = useRouter();

    const redirectDetail = (id: any) => {
      router.push({ name: 'DetalleIncidencia', params: { id: id } })
    };

    const redirectAdd = () => {
      router.push({ name: 'AgregarIncidencia'})
    }

    return {
      redirectDetail,
      redirectAdd,
      add
    }
  }
});
</script>
