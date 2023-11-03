<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title v-if="!!$route.params.id">Incidencia #{{ $route.params.id.substr($route.params.id.length-4,4) }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" v-if="!!$route.params.id">Incidencia #{{ $route.params.id.substr($route.params.id.length-4,4) }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <AddViewIncidence :create="false"/>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import AddViewIncidence from '@/components/AddViewIncidence.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButtons, IonBackButton} from '@ionic/vue';
export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButtons,
    IonBackButton,
    AddViewIncidence
  },
  setup() {
  }
})
</script>
  