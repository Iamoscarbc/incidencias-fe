<template>
    <div class="ion-padding add-view-incidence" v-if="!loading">
        <ion-input v-model="form.firstname" label-placement="floating" fill="outline">
            <div slot="label">Nombres</div>
        </ion-input>
        <ion-input v-model="form.lastname" label-placement="floating" fill="outline">
            <div slot="label">Apellidos</div>
        </ion-input>
        <ion-input v-model="form.docnumber" label-placement="floating" fill="outline" type="number" @ionBlur="validateNumber('docnumber',8)">
            <div slot="label">DNI</div>
        </ion-input>
        <ion-input v-model="form.phone" label-placement="floating" fill="outline" type="number" @ionBlur="validateNumber('phone',9)">
            <div slot="label">Celular</div>
        </ion-input>
        <ion-input v-model="form.email" label-placement="floating" fill="outline">
            <div slot="label">Email</div>
        </ion-input>
        <ion-input v-model="form.password" label-placement="floating" fill="outline" type="password">
            <div slot="label">Password</div>
        </ion-input>
        <ion-select v-model="form.idProfile" label="Profile" label-placement="floating" fill="outline"
            interface="action-sheet">
            <ion-select-option :value="cat._id" v-for="cat in profiles">{{ cat.name }}</ion-select-option>
        </ion-select>
        <ion-button expand="full" @click="createUser()" v-if="!$route.params.id" :disabled="invalidForm">Crear Incidencia</ion-button>
        <ion-button expand="full" @click="updateUser()" v-else :disabled="invalidForm">Actualizar Incidencia</ion-button>
    </div>
</template>
    
<script lang="ts">
import axios from "axios";
import { mapState } from 'vuex'
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { isPlatform } from '@ionic/vue';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { addCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButtons, IonBackButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonIcon, IonButton } from '@ionic/vue';
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
        IonInput,
        IonSelect,
        IonSelectOption,
        IonTextarea,
        IonIcon,
        IonButton
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const invalidForm = computed({
            get() {
                return !form.value.firstname || !form.value.lastname || !form.value.phone || !form.value.email || !form.value.docnumber || !form.value.idProfile || !form.value.password || !docnumberPattern.test(form.value.docnumber) || !passwordPattern.test(form.value.password)
            },
            set() {

            }
        })
        
        // Validación de formulario
        const docnumberPattern = /^\d{8}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        let loading = ref(true)
        let profiles = ref<any>([])
        let form = ref({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            docnumber: '',
            idProfile:'',
            password: '',
            state: 1
        })

        const getOneUser = async () => {
            let token = localStorage.getItem("token")
            const res:any = await axios.get("/api/user/"+route.params.id, {
                headers: {
                    "Authorization": 'Bearer '+ token
                }
            })
            const response = res.data
            if(response.success){
                form.value = response.data
            }
        }

        const getProfiles = async () => {
            let token = localStorage.getItem("token")
            const res:any = await axios.get("/api/profiles/", {
                headers: {
                    "Authorization": 'Bearer '+ token
                }
            })
            const response = res.data
            if(response.success){
                profiles.value = response.data
            }
        }

        onMounted(() => {
            loading.value = true
            getProfiles()
            if(!!route.params.id){
                getOneUser()
            }
            loading.value = false
        })

        const createUser = async () => {
            if(!invalidForm.value){
                let token = localStorage.getItem("token")
                let payload = form.value
                const res:any = await axios.post("/api/user", payload, {
                    headers: {
                        "Authorization": 'Bearer '+ token
                    }
                })
                const response = res.data
                if(response.success){
                    router.back()
                }
            }
        }

        const updateUser = async () => {
            if(!invalidForm.value){
                let token = localStorage.getItem("token")
                let payload = form.value
                const res:any = await axios.put("/api/user/"+route.params.id, payload, {
                    headers: {
                        "Authorization": 'Bearer '+ token
                    }
                })
                const response = res.data
                if(response.success){
                    router.back()
                }
            }
        }

        const validateNumber = async (field, param) => {
            console.log("form.value[field]", form.value[field].length)
            if(form.value[field].length > param){
                form.value[field] = form.value[field].substr(0,param)
            }
        }
        
        return {
            addCircleOutline,
            closeCircleOutline,
            form,
            loading,
            profiles,
            invalidForm,
            createUser,
            updateUser,
            validateNumber
        }
    }
})
</script>

<style lang="scss">
.add-view-incidence {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .container-images{
        display: flex;
        gap: 16px;
        overflow-x: scroll;
        .images{
            position: relative;
            img{
                height: 100px;
                min-width: 100px;
                max-width: 500px;
            }
            ion-button{
                position: absolute;
                right: 0;
                top: 0;
                margin: 0;
                width: 24px;
                height: 24px;
                min-height: 24px;
                --padding-top: 2px;
                --padding-bottom: 2px;
                --padding-start: 2px;
                --padding-end: 2px;
            }
        }
    }
}
.area__image {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    min-width: 100px;
    height: 100px;
    border-radius: 8px;
    border: 1px dashed #b3b3b3;
    box-shadow: 0px 4px 6px rgba(21, 25, 47, 0.16);
}
</style>
    