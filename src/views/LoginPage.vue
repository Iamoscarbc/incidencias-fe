<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <ion-icon class="login-icon" :icon="personCircleOutline"></ion-icon>
        <h2 class="login-title">Iniciar Sesión</h2>
        <ion-input v-model="docnumber" label-placement="floating" fill="outline" @input="updateFormValidity" type="number">
          <div slot="label">DNI</div>
        </ion-input>
        <ion-input v-model="password" label-placement="floating" fill="outline" @input="updateFormValidity" type="password">
          <div slot="label">Contraseña</div>          
        </ion-input>
        <ion-button expand="full" @click="login" :disabled="!isFormValid">Iniciar Sesión</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { personCircleOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonPage,
  },
  setup() {
    const store = useStore();
    const router = useRouter(); // Obtiene la instancia del enrutador
    const route = useRoute(); // Obtiene la instancia de la ruta actual
    const docnumber = ref('');
    const password = ref('');

    const isFormValid = ref(false);

    const login = async () => {
      if (isFormValid.value) {
        try {
          let payload = {
            docnumber: docnumber.value,
            password: password.value
          }
          const res:any = await axios.post("/api/auth/login", payload)
          const response = res.data
          if(response.success){
            localStorage.setItem("token", response.token)
            const res2:any = await axios.get("/api/auth/user", {
              headers: {
                "Authorization": 'Bearer '+response.token
              }
            })
            const response2 = res2.data
            if(response2.success){
              await store.dispatch('usuarios/login', response2.user)
              router.replace({ name: 'Tab1' })
            }
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    };

    // Validación de formulario
    const docnumberPattern = /^\d{8}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const updateFormValidity = () => {
      isFormValid.value = docnumberPattern.test(docnumber.value) && passwordPattern.test(password.value);
    };

    localStorage.removeItem("token")

    return {
      docnumber,
      password,
      isFormValid,
      login,
      updateFormValidity,
      personCircleOutline, // Icono de ionicons
    };
  },
});
</script>

<style scoped>
/* Estilos CSS personalizados */
.login-container {
  max-width: 300px;
  margin: 32px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-icon {
  font-size: 60px;
  color: #6a64ff;
}

.login-title {
  font-size: 24px;
  margin: 10px 0;
  text-align: center;
}

/* Estilos para los campos de entrada */
ion-input {
  margin: 16px 0;
}

/* Estilos para el botón */
ion-button {
  margin-top: 20px;
  width: 100%;
}
</style>