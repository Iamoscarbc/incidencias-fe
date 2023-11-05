<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Usuarios</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item-sliding v-for="a in users">
        <ion-item lines="none">
          <ion-card style="width: 100%; margin: 10px 0;">
            <ion-card-header>
              <ion-card-title style="display: flex; align-items: center; gap: 8px;">
                <ion-icon :icon="personCircle" size="large"></ion-icon>
                <span>{{ a.firstname }}  {{ a.lastname }}</span>
              </ion-card-title>
            </ion-card-header>
          </ion-card>
        </ion-item>

        <ion-item-options>
          <ion-item-option @click="redirectEditUser(a._id)">Editar</ion-item-option>
          <ion-item-option color="danger" @click="openDeleteAlert(a._id)">Eliminar</ion-item-option>
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
import axios from 'axios'
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonIcon, IonFabButton,
  IonFab, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonAlert, IonRefresher, IonRefresherContent } from '@ionic/vue';
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
    IonAlert,
    IonRefresher, 
    IonRefresherContent
  },
  setup() {
    const router = useRouter();

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
    let idForDelete = ref(null)
    let users = ref<any>([])

    const redirectEditUser = (id: any) => {
      router.push({ name: 'EditarUsuario', params: { id: id } })
    }

    const redirectAddUser = () => {
      router.push({ name: 'AgregarUsuario'})
    }
    const openDeleteAlert = async (id: any) => {
      isOpen.value = true
      idForDelete.value = id
    }

    const logResult = async (ev: CustomEvent) => {
      isOpen.value = false
      if(ev.detail.role){
        let token = localStorage.getItem("token")
        const res:any = await axios.delete("/api/user/"+idForDelete.value, {
            headers: {
                "Authorization": 'Bearer '+ token
            }
        })
        const response = res.data
        if(response.success){
          await getUsers()
        }
      }
      idForDelete.value = null
    }

    const getUsers = async () => {
      let token = localStorage.getItem("token")
      const res:any = await axios.get("/api/users", {
          headers: {
              "Authorization": 'Bearer '+ token
          }
      })
      const response = res.data
      if(response.success){
        users.value = response.data
      }
    }

    const handleRefresh = async (event: any) => {
      await getUsers()
      event.target.complete()
    }

    const ionViewDidEnter = () => {
      getUsers()
    }

    return {
      add,
      personCircle,
      isOpen,
      idForDelete,
      alertButtons,
      users,
      getUsers,
      ionViewDidEnter,
      redirectAddUser,
      redirectEditUser,
      openDeleteAlert,
      logResult,
      handleRefresh
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
