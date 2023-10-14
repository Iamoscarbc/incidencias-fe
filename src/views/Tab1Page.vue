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
      <ion-card v-for="a in incidencias" @click="redirectDetail(a.id)">
        <ion-card-header>
          <ion-card-title>Incidencia #{{ a.code }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <Timeline :steps="a.timeline"/>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/vue';
import Timeline from '@/components/Timeline.vue';
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
    IonCardContent
  },
  setup() {
    const router = useRouter();
    const incidencias = ref([
      {
        id: 1,
        code: 1,
        timeline: [
          {
            title: 'Registrada',
            completed: true,
          },
          {
            title: 'En revisión',
            completed: false,
          },
          {
            title: 'Finalizada',
            completed: false,
          },
        ]
      },
      {
        id: 2,
        code: 2,
        timeline: [
          {
            title: 'Registrada',
            completed: true,
          },
          {
            title: 'En revisión',
            completed: true,
          },
          {
            title: 'Finalizada',
            completed: false,
          },
        ]
      },
      {
        id: 3,
        code: 3,
        timeline: [
          {
            title: 'Registrada',
            completed: true,
          },
          {
            title: 'En revisión',
            completed: true,
          },
          {
            title: 'Finalizada',
            completed: true,
          },
        ]
      }
    ]);

    const redirectDetail = (id: any) => {
      router.push({ name: 'DetalleIncidencia', params: { id: id } })
    };

    return {
      incidencias,
      redirectDetail
    }
  }
  // Resto del código de tu vista
});
</script>
