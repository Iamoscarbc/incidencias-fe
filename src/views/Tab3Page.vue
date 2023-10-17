<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Usuarios</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item-sliding v-for="a in usuarios">
        <ion-item lines="none">
          <ion-card style="width: 100%; margin: 10px 0;">
            <ion-card-header>
              <ion-card-title style="display: flex; align-items: center; gap: 8px;">
                <ion-icon :icon="personCircle" size="large"></ion-icon>
                <span>{{ a.username }}</span>
              </ion-card-title>
            </ion-card-header>
          </ion-card>
        </ion-item>

        <ion-item-options>
          <ion-item-option @click="redirectEditUser(a.id)">Editar</ion-item-option>
          <ion-item-option color="danger" @click="openDeleteAlert(a.id)">Eliminar</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end" @click="redirectAddUser()">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-alert
        :is-open="isOpen"
        header="¿Estás seguro de eliminar este usuario?"
        :buttons="alertButtons"
        @didDismiss="logResult($event)"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonIcon, IonFabButton,
  IonFab, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonAlert } from '@ionic/vue';
import Timeline from '@/components/Timeline.vue';
import { add, personCircle } from 'ionicons/icons';
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
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonAlert
  },
  setup() {
    const router = useRouter();
    const usuarios = ref([
      {
        id: 1,
        username: 'Jhon Doe'
      },
      {
        id: 2,
        username: 'Manuel Smith'
      },
      {
        id: 3,
        username: 'Roger Berth'
      }
    ]);

    const alertButtons = [
      {
        text: 'Sí',
        role: true
      },
      {
        text: 'No',
        role: false
      }
    ]

    let isOpen = ref(false)

    const redirectEditUser = (id: any) => {
      router.push({ name: 'EditarUsuario', params: { id: id } })
    }

    const redirectAddUser = () => {
      router.push({ name: 'AgregarUsuario'})
    }
    const openDeleteAlert = async (id: any) => {
      isOpen.value = true
    }

    const logResult = (ev: CustomEvent) => {
      isOpen.value = false
      if(ev.detail.role){
        console.log("eliminar")
      }else{
        console.log("no eliminar")
      }
    }

    return {
      add,
      personCircle,
      usuarios,
      isOpen,
      alertButtons,
      redirectAddUser,
      redirectEditUser,
      openDeleteAlert,
      logResult
    }
  }
  // Resto del código de tu vista
});
</script>

<style scoped>
ion-item::part(native){
  background: #121212;
}
</style>
