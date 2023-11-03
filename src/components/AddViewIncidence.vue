<template>
    <div class="ion-padding add-view-incidence" v-if="!loading">
        <ion-input v-model="form.date" label-placement="floating" fill="outline" disabled>
            <div slot="label">Fecha y Hora</div>
        </ion-input>
        <ion-input :value="(user.firstname + ' ' + user.lastname)" label-placement="floating" fill="outline" disabled>
            <div slot="label">Usuario Registrador</div>
        </ion-input>
        <ion-select v-model="form.categorie" label="Categoría" label-placement="floating" fill="outline" :disabled="!!$route.params.id"
            interface="action-sheet">
            <ion-select-option :value="cat._id" v-for="cat in listOfCategories">{{ cat.name }}</ion-select-option>
        </ion-select>
        <ion-select v-model="form.specialist" label="Especialista" label-placement="floating" fill="outline" v-if="!!$route.params.id" :disabled="form.timeline.length != 0 && !!form.timeline[1].completed"
            interface="action-sheet">
            <ion-select-option :value="cat._id" v-for="cat in listOfSpecialist">{{ cat.firstname }} {{ cat.lastname }}</ion-select-option>
        </ion-select>
        <ion-input v-model="form.documentNumber" label-placement="floating" fill="outline" type="number" :disabled="!!$route.params.id">
            <div slot="label">DNI Alumno</div>
        </ion-input>
        <ion-textarea v-model="form.description" label-placement="floating" fill="outline" auto-grow :disabled="!!$route.params.id">
            <div slot="label">Incidencia</div>
        </ion-textarea>
        <div class="container-images" v-if="!!$route.params.id">
            <div class="area__image" @click="openFileManager()" v-if="form.timeline.length != 0 && !form.timeline[1].completed">
                <ion-icon :icon="addCircleOutline" size="large"></ion-icon>
                <input type="file" accept=".jpg, .jpeg, .pdf" multiple ref="fileManager" @change="selectImage" style="display: none;">
            </div>
            <div v-for="(f,i) in form.documents" class="images">
                <ion-button color="danger" @click="deleteImage(f, i)" v-if="form.timeline.length != 0 && !form.timeline[1].completed">
                    <ion-icon :icon="closeCircleOutline" size="large"></ion-icon>
                </ion-button>
                <template v-if="f.type == 'image/jpeg'">
                    <img :src="urlDocuments[i]" v-if="form.timeline.length != 0 && !form.timeline[1].completed">
                    <img :src="'http://localhost:3000/api/files/'+$route.params.id+'/'+f.name" v-else>
                </template>
                <img src="@/assets/img/defaultPaymentSlip.png" v-else>
            </div>
        </div>
        <ion-button expand="full" @click="createIncidence()" v-if="!$route.params.id" :disabled="invalidForm">Crear Incidencia</ion-button>
        <ion-button expand="full" @click="updateIncidence()" v-if="form.timeline.length != 0 && !form.timeline[1].completed" :disabled="invalidFormUpdate">Actualizar Incidencia</ion-button>
    </div>
</template>
    
<script lang="ts">
import axios from "axios";
import * as moment from 'moment-timezone';
import { mapState } from 'vuex'
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { isPlatform } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
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
    computed:{
        ...mapState("usuarios",['user']),
        invalidForm(){
            return (!this.form.categorie || !this.form.description || !this.form.documentNumber)
        },
        invalidFormUpdate(){
            return (!this.form.specialist || this.form.documents.length == 0)
        }
    },
    methods: {
        openFileManager () {
            this.$refs.fileManager.click()
        }
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const currentDateTime = ref<any>('')
        const loading = ref<any>('')
        const listOfSpecialist = ref<any>([])
        const listOfCategories = ref<any>([])
        const form = ref<any>({
            date: !!route.params.id ? '23/10/2023 23:35:40' : currentDateTime,
            categorie: null,
            specialist: null,
            description: null,
            documentNumber: null,
            documents: [],
            timeline: []
        })

        const urlDocuments = ref<any>([])

        const selectImage = async ($event) => {
            for (let i = 0; i < $event.target.files.length; i++) {
                const element = $event.target.files[i];
                form.value.documents.push(element)
                urlDocuments.value.push(URL.createObjectURL(element))        
            }
        }

        const deleteImage = async (file, index) => {
            form.value.documents.splice(index, 1)
            urlDocuments.value.splice(index, 1)
        }

        const updateDateTime = () => {
            const now = moment();
            currentDateTime.value = now.format('DD/MM/YYYY HH:mm:ss');
        }
        
        onMounted( async () => {
            loading.value = true
            await getSpecialist()
            await getCategories()
            if(!route.params.id){
                await updateDateTime();
                setInterval(updateDateTime, 1000); // Actualiza cada segundo
            }else{
                await getOneIncidence(route.params.id)
            }
            loading.value = false
        })

        const getSpecialist = async () => {
            let token = localStorage.getItem("token")
            const res:any = await axios.get("/api/userByProfile/653752a46f75ce25da5cb7dd", {
                headers: {
                    "Authorization": 'Bearer '+ token
                }
            })
            const response = res.data
            if(response.success){
                listOfSpecialist.value = response.data
            }
        }

        const getCategories = async () => {
            let token = localStorage.getItem("token")
            const res:any = await axios.get("/api/categories", {
                headers: {
                    "Authorization": 'Bearer '+ token
                }
            })
            const response = res.data
            if(response.success){
                listOfCategories.value = response.data
            }
        }

        const getOneIncidence = async (id) => {
            let token = localStorage.getItem("token")
            const res:any = await axios.get("/api/incidence/"+id, {
                headers: {
                    "Authorization": 'Bearer '+ token
                }
            })
            const response = res.data
            if(response.success){
                form.value = response.data
            }
        }

        const createIncidence = async () => {
            let { date, categorie, description, documentNumber } = form.value
            if(!!categorie && !!description && !!documentNumber){
                let payload = {
                    date,
                    categorie,
                    description,
                    documentNumber
                }
                let token = localStorage.getItem("token")
                const res:any = await axios.post("/api/incidences", payload, {
                    headers: {
                        "Authorization": 'Bearer '+ token
                    }
                })
                const response = res.data
                if(response.success){
                    router.replace({ name: 'DetalleIncidencia', params: { id: response.data } })
                }
            }else{
                console.log("Completa el formulario")
            }
        }

        const updateIncidence = async () => {
            let { specialist, documents } = form.value
            if(!!specialist && !!documents){
                var formData = new FormData();
                for (let i = 0; i < documents.length; i++) {
                    const d = documents[i];
                    formData.append("file", d)            
                }
                formData.append("specialist", specialist)
                let token = localStorage.getItem("token")
                const res:any = await axios.put("/api/incidence/"+route.params.id, formData, {
                    headers: {
                        "Authorization": 'Bearer '+ token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                const response = res.data
                if(response.success){
                    router.back()
                }
            }else{
                console.log("Completa el formulario")
            }
        }

        return {
            listOfSpecialist,
            listOfCategories,
            form,
            addCircleOutline,
            closeCircleOutline,
            urlDocuments,
            loading,
            selectImage,
            deleteImage,
            createIncidence,
            updateIncidence
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
    