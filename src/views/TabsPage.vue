<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>Incidencias</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/tab2" v-if="roles.includes('view-reports')">
          <ion-icon aria-hidden="true" :icon="barChart" />
          <ion-label>Reportes</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/tab3" v-if="roles.includes('view-users')">
          <ion-icon aria-hidden="true" :icon="people" />
          <ion-label>Usuarios</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab4" href="/tabs/tab4" @click="closeSession()">
          <ion-icon aria-hidden="true" :icon="closeCircleOutline" />
          <ion-label>Salir</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { barChart, addCircle, people, closeCircleOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
  },
  setup() {
    const router = useRouter()
    const store = useStore();
    const roles = computed(() => {
      if(!!store.state.usuarios.user){
        return store.state.usuarios.user.idProfile.roles
      }
      return []
    })

    const closeSession = async () => {
      await store.dispatch('usuarios/logout')
      router.replace({name: 'Login'})
    }

    return { roles, barChart, addCircle, people, closeSession, closeCircleOutline };
  },
};
</script>
