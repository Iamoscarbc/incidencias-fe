<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Editar Usuario</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Editar Usuario</ion-title>
          </ion-toolbar>
        </ion-header>
        <AddEditUser :create="false"/>
      </ion-content>
    </ion-page>
  </template>
    
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AddEditUser from '@/components/AddEditUser.vue'
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButtons, IonBackButton} from '@ionic/vue';
  import { add } from 'ionicons/icons';
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
      AddEditUser
    },
    setup() {
      return { add };
    }
  })
  </script>
    