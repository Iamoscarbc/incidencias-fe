<template>
    <div class="ion-padding add-view-incidence">
        <ion-input v-model="form.date" label-placement="floating" fill="outline" disabled>
            <div slot="label">Fecha y Hora</div>
        </ion-input>
        <ion-input :value="(user.firstname + ' ' + user.lastname)" label-placement="floating" fill="outline" disabled>
            <div slot="label">Usuario Registrador</div>
        </ion-input>
        <ion-select v-model="form.categorie" label="Categoría" label-placement="floating" fill="outline"
            interface="action-sheet">
            <ion-select-option :value="cat._id" v-for="cat in listOfCategories">{{ cat.name }}</ion-select-option>
        </ion-select>
        <ion-select v-model="form.specialist" label="Especialista" label-placement="floating" fill="outline"
            interface="action-sheet">
            <ion-select-option :value="cat._id" v-for="cat in listOfSpecialist">{{ cat.firstname }} {{ cat.lastname }}</ion-select-option>
        </ion-select>
        <ion-input v-model="form.documentNumber" label-placement="floating" fill="outline" type="number">
            <div slot="label">DNI Alumno</div>
        </ion-input>
        <ion-textarea v-model="form.incidence" label-placement="floating" fill="outline" auto-grow>
            <div slot="label">Incidencia</div>
        </ion-textarea>
        <div class="container-images" v-if="!!$route.params.id">
            <div class="area__image" @click="selectImage()">
                <ion-icon :icon="addCircleOutline" size="large"></ion-icon>
            </div>
            <div v-for="f in form.files" class="images">
                <ion-button color="danger" @click="deleteImage(f)">
                    <ion-icon :icon="closeCircleOutline" size="large"></ion-icon>
                </ion-button>
                <img :src="f.src">
            </div>
        </div>
        <ion-button expand="full" @click="createIncidence()" v-if="!$route.params.id" :disabled="invalidForm">Crear Incidencia</ion-button>
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
            return (!this.form.categorie || !this.form.specialist || !this.form.incidence || !this.form.documentNumber)
        }
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const currentDateTime = ref<any>('')
        const listOfSpecialist = ref<any>([])
        const listOfCategories = ref<any>([])
        const form = ref<any>({
            date: !!route.params.id ? '23/10/2023 23:35:40' : currentDateTime,
            user: {
                _id: '12312312312',
                name: 'Kevin Kaarl'
            },
            categorie: null,
            specialist: null,
            incidence: null,
            documentNumber: null,
            files: [
                {src: 'https://metodologiadelainvestigacion31.files.wordpress.com/2017/12/indices_incidencia_2013_cabecera.png'},
                {src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBITEBUSFxUVFxUXFRUVFRUVFhUWFhUVFRUYHSggGhonGxUVITEhJSktLi4uFx8zOzMtNygtLisBCgoKDg0OGhAQGy8lICUuLS0tLS8tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABgIDBAUHAf/EAEMQAAIBAgMFBQMJBgQHAQAAAAECAAMRBBIhBQYxQWETIlFxgQcykRQjQlKCobGywTM0YnJz0RUkovBDU2ODwtLhZP/EABsBAQACAwEBAAAAAAAAAAAAAAAEBQECAwYH/8QAMxEAAgECAwYDCAMAAwEAAAAAAAECAxEEITEFEkFRYXETgfAikaGxwdHh8RQyMyNSYgb/2gAMAwEAAhEDEQA/AO4xEQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBESObf23lvSpG7cz4dJvCDm7I1lJRV2YW/O9NXC0TUwopu1Nlz5wzDKxKgjKR9LL8Zv8AYO0PlGGo4jQdrTRyBwDEDMPQ3HpOe42ga1KrS4mrTcC/17Zk/wBQWbf2OY/tMB2XOhUdfsv86Pvdh6SRWoqEMjlTqOUsyeRESIdxERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREjO8G3LXpUTrwZxy8QvXrN4Qc3ZGspKKuyreDbmW9Kke9wZvDoOsihMRLOnTjBWRCnNydz1GsQRyIPwmP7M6vYbSxmD4LUBqJ4WRgyDzKVr/Zl+aPFYr5LtPCYvk/ca3O16R+CPT+ExWjeEr8n8MxTdmmdriR/DbyoTaopTqO8PXnN1QxCOMyMGHQygw+NoYj/KSfz9zzJ5eiIkoCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIlJa3GAYu0aDuhSm/Zk87X08OOnnIZjdjVqXvIWH1l7w+7Ueok0oY+lUJWnVpuRxCurEeYBmVOlHEOC9mzXrkaVKN3aV0zmMTM2xiBUrOwta9hbwGl/W1/WYctYttXZBdk8hI/vvh82HDjjTcG/grgqbfa7OSCYm1sP2lCpT5sjW/mGq/eBMgzMBiO1pJU+uqN6kAn75axW20w5uHOcckPe9eQ9ZCdnbUqfJ1pq5AUsNNDY2Ya8bd4y1PmVXZvgYiUW8lJ2tllfLPhlyJsXvJM7XuTtmpi6DVagAIqMgt4BVOvie8eQkjkL9lP7m39Z/yU5NJ6zDNulFvkjoIiJ3AiIgCIiAIiIAiIgCIiAIiIAiIgCIiAJFvaDXZMJmF8ude0I/5dm49M2UeslMge++IbG16exqDECpari3X/h4dSCEv9Zjb7uRmJUfGi6d7JrN8kb063gzVS17PTmQ3Ze0hUq0KmFvmNRAuljfNYi3ha9+l51zbuL7Ki7A2JGVf5m0Hw4+ktbN3ewuHbNQoU6bAWBAuQPAE8B5TRb5Y7NUWiOFPU/zNw+A/NOOzcCqUnBaN37Lh9CRtLHKvGLtZpWb5v7clc0QMqloGKtUKpdjYKCxPQC5/CeiKIjO3a5qYynTUkCgLkgkEE2Y6j7E2dDaTrx7w68fjI/sgM5qYhxY1WJHlc3t0vp9mbK88dtbaFaGMapSa3Ullz1d+D1sSqdNbuZp2wPZM1iuViSo+qL6D4H7pQTM3ah931/SYDGV868678Spq/I6pJKyOu+yf9zf+s/5KcmshPsl/c3/rP+SnJtL/AA3+UeyNxETRbX2q1OoFSxsO8DzvwHw/GYxOJp4an4lTTJe86U6cqkt2OpvYmnwe3KbaP82euo+P95tVcEXBuOkzQxNKvHepST9ceXmYnTnB2krFcRE7mgiIgCIiAIiIAiIgCRXbe9fZVDSpU+1Ke+S2UA8cosDc/hJVOQb1YXE/4k+HwY7bMnb1FFroHNrE3AvfXyYSLi1iHT/4NdX2S9JdSXglQdS1bThyu2ln0WvxOi7u7bTFUyyqUZDZ0OuUnUEHmD49DNzec52RuFVZO0q4nE4OsToMPVy2XkKmhDHj5S7tPYG1aNKo1DabV1CN83VoIXIsb2qjvZrTvh7ypJ1GlK2eT+iZzxUaca8o0s43yfrWxIN4N6sPhqVWp2iVHpKbUlYFmfgEsOpF/AXPKYm4Ww3oUnxOK1xeMbtqx5rf3KQ8AoPDkSfATmi4tuyUVMufmV4dLTtWx8/YUe1v2nZpnvxz5Rmv1vIuCx0q2/BxSs9U7prv8euRKx+zv40YTu8+DVnw/XRl3H4paVNqjcFF/M8h6mw9ZzKtWLsXY3LEk+ZN5IN9dpZmGHU6J3n/AJuQ9Br6jwkaBnoMJT3Y7z1ZQ153lbkXAZo97cUezXDpq9dgoA4kXFh6tlHxm5B9PwmL7P8ABfLtoti2F6WFtkuOLaikPzPbkbTtUkoRb5HOEd52L28uzBhDh8MLHs8PTBI0zOXqF29WJPrNNeSn2lfva/0U/PUkTnzvHZ4mb6k+1sjD2ofd9f0mvLTO2qfd9f0mtJ0PrN6S9hA7H7I/3J/67/kpybyDeyA/5J/67/kpycz0WH/yj2NiziawRS7cFBMhFWoWYueLEn4zd7yYzhRB6t+g/X4TRTye38X4lZUo6Q17v7LL3lxgKO7Dfer+XrMSzU2xUw9SktLvFnF0v7yk5cvmSdD0l0zH3Qw3ynGNXIulHUetxTH5m8xIOy6M54iLhlnqd8VNRpu50eexE+gFAIiIAiIgCIiAIiIBZxFZUVnc5VQFmJ4AAXJPoJDfZrQaquI2nVBD4+qWUHitCmSlFfgD5i0ue03FucPTwNE2q7QqLQXxWncGs5H1Quh6NJXgMIlGklGmMqUkVFHgqgAfcJ0/rT7/ACX5+RprLsZM8M9iczc1i7DwwftRh6QqXvnyLmv9a9uPWe7a2muHpGobE8FHix4Dy5+QmdUcAEkgAAkk6AAcSZzLePbBxNW4/Zpog6c2PU/hadsNQ8SduHH11Odeq4pXeeiMB6hYlmNyxJJPMnUmegyyDFWsqKXc2VRcnp068gPEiXNrFca3ejHFKYpJcvW7thqcnA2Hix7o+1Orbj7BGCwiUSB2h79UjnUYC+vMAAKOiicl3ZwzYnENjKo7qHuDlmA7oHRRY+ZB8Z0XBbZrU9M2dfBtfgeInltqbcoUcR/HlfLVrOz5W1yWtudrEyhGyuaX2mH/ADa/0k/PUkTvJBvzjhWrrUFlORUKZrsCGc3t4d4SOXnncRONSrKcHdPT3Hcwtqn3fX9Jrr6mZu1j7vmf0mvY6zvSXsIHZfY5+4v/AF3/ACU5McdilpIXPLgPE8hIV7InC4GoxIAFeoSToAMlO8v7X2r2z6aIvujx6mT8XjVhcMmv7Neyvr2RKw1B1p24cS1UqliWY3LG5lMsK0qasFBZjYAXJ6TwzUpPm2X+SRgbexeVMg41NOoXmfXh8ZIKG6tU4OlSp4h8JUzitUZL3JItkNiOAt0uOE026mzzi8Ua9QfN0iDblcfs0624ny6yYb0bFTF00R6z0AlRWBRgpJ1AGvPXTrPYbJwXh0nNq98lw7u/fJdEVGLrXmkvXI3Yns8E9l+V4iIgCIiAIiIAiJzzfzbmTELhmqGmrKpABIzs19TbiNLeF5xxFbwYOe630R3w9Dxp7t0ur9c7IyNlf53bFfEnvUtnJ8mpeHbvc1mHUC6H0k7nOPZzjSteph1t2bq1Y2A0cFFLX6gjj9UTo8zRxKxEFNKy0t2/OYxOFlhqjpyd+N+4iJEt8d4+xBoUT86w7xH/AAwf/I8vDj4SRTpynLdiRpzUVdmDvtt7MThaR0B+cYcz9Qfr8PGRAGWwZ6DLylSjTjur9lZOo5u7LwMj23cWa1QYakdFPePIsOP2V18zfpMvbe0+yXIh+cccuKKfpfzHl8fCWNj4Ds1uR3m49ByWV21NoRwlK6/s9O/Py4+46Uae8zfbN2hToUhTyEKg+jrfmSQeZOs120N4alQEU/mhrw94/a5ekpxXuHymmJ1Pp/v7p8/p0YSk6kld3vnz1uT0rF7DtdvG/wATebkbJr2v2bfFb/C95a3JwueqXOopL/qJsPuDSczhjMU6VTdSvzLDC4JVY78n2scx23h3UAMhXjxUjwmHhtnVqtslNvMiy69TOt5pqcRtOhci5PUC4iltKbW7GHx+n5Oz2dCOsvgY+w1ehh/k2e4Lmo1tAWIUW6gZRMtXlgOjao6npex+BlDV1X3mA9bn4DWR6rqVpb0rtkyEYU1uxyRnK01+Id8TUXD0BmufRj4k/VGp+/wlntqldhRoKzFtLD3mHXkq/wCyZ0Hdbd5cKmZrNVcd5uQH1F6defwk/Z+zpVZXenF/br8iPicSoK3rzNjsXZqYaktFNbalubMeLH/fC0wd7dmYXEU0XF1OyVagKntFp3axGW7eIJ4a+E38j+9lDBPTQY8qqBxkuzLd7EWuOVr35T1soRjT3UlbroVKbcrm/E9ngns6moiIgCIiAIiRPezeo0GXCYVPlOMrfs6Q4IP+bWP0VHHr0Gs2jFydkYbSV2X97N6UwarTVTiMTW7tHDpq7seBa3up4noZpMBuB298VtOo9TFVLG6GyUFHClSBuLDxt+pO13S3VGHLYrEP8pxlb9pWPBf+nSH0UHDQC9uQsBKrzM93dcI5p6vn+Pi+PIU3KMlPRrNdPyabYO7tHCA9lmYvbM7m7m3AXFgB0Am6lGeRDe3e4Ub0MOQ1XgzcRT/u/Tlz8JijRcmoU0ZrV226lR3fUyd7N51w4NKkQ1Y+opg82/i8B6+fNWqEksxJJNySbkk8STzMstULEsxJJJJJ1JJ4kmegy+oYeNKNlrxZVVarqO7L4Mx9oY8UUzGzMfcU8/4m/hH3nTxIoxmMWkud9Sb5E5uRz6KOZ9B02O4u6TY2p8txovRvdUIt2xGgFuVIWtbna3C99a9ZQizNOm5Mw9m7s1Pkx2liSb1HXslPFg1yardDYZR4a+EqJnRt/wB/8p/3E/BpzNnngdsTdTE3fJeWpYRgoqyKcW/dPlNK7a+k2WMbuN5Ga2jRaq6U01Z2Cj7Wl/L+0i0FaOZuTrcnBlcOXPGqxb7I7o+8MfWSArK8NhhTRaa8EUKPICwlwrKSuvEqOXNnoaK3IKPI1O2axSkxHE2UevH7rzn+L2g+Zlp2ATQk63POTPezEBQq+ALny1A/BpzcAklr9T1lls+ilBtkTGVXdJHR9x93vl+FNdqppuKjJooKkKqm9rg37x5yR4b2e0wfnK7uPBUCfeS0xvY01sC4/wD0VPyU5PQ89JSwOHlFScV66afAgfyKn/Yw9mbKo4dctFAl+J4s3mx1Mz54DF5OjFRVkcm23dnsj+9tXBLTQ48KUNQZcys3fsde7yte/K0kEj+9m08Lh6dNsZT7VWqAKMgqWexOax4WAPXzmtR2g3l56GY6o34ns8E9m5qIiIAmHtPFCjSqVSLimjPbxygm0zJYxFBXVkcZlYFWB5gixHwmHezsZVr56HM8VvPitXWvlJv3QqZR5Ag/fJNuBsWjRoLiFLVa+JAqVa1TWo7HiL8lB4Caur7OyXsMSRTve2TvgeGbNa/W3pJrhcOtJFpUxlVFCqPAAWAkDAU8VS3lWldPrf120LPaNTCTjDwEr56K1ly0zfv7l8tKGe2pNgOcpJnMvaDt+p274PNkpoEva/fLIrd8jlrw4afC2oUXVnup2KepUUI3NhvVvre9HCNpwasOfiKf/t8PGQgGW8ptfiPEajyuNL9J7TUkgAEk8ANSfKX9GjClG0f2VVSrKbvIuAy3jcYtEXbvORdafQ8GfwXpxPQayxjtpLS7qFalTx0ZKZ6cnb/SOvKzs7ZxLdtX71zmytclj4vfj5SFjtoU8NDek/u+i+/A606TkzO2BsN8U/ynE3yGxAOnaW4ADlTHT0nSMHtWpTAXRlAAAPIDQAEcJGcNtxOFQZOo1X4cRKNobx0qfdT51umijzb+0+bYraOPxOI8RXjySeSXyfVvX4E+EVFZEh3ux4rYXKobMHViLX0ANzcctZz1nlvG7Xq1iQ7aX90aL005+sodp2qSq1GpVbb1uB0PMQ3dPlN57ONl52bEsNKd0T+cjvEeSm32ppKWGeqwpUxdnOUeZ5noOJ8p1bZWAShSSinBBa/ieLMepJJ9ZiUrQa5knC07z3uCLhSMsv2mm3nxvZUco96rdR0X6Z+Gn2pD8JMs94g+9OLaszdmGdqrZUVQSxUeCjUkgcOstYbcnFB8Oa9GoqVnCsEszotwCz6FU0JIv4G9p0ndDZ4pUQ7AZ6nevbUKbZVv4WANusy9q47EpUoLQoisjvaqxNuzW668fAsb6+7bnPRYbBqFFOd888vXIq60t+p2yM7YmyqOEpdjh1yLcsbksWY2BYk89B8JsQ8xg0uAy1SSyRwMgPKw0xgZWDMgyQ00m9G2qeFpo9Si9cPUVQFUNY6kNrz0053m2UysGayTasmZWuZWJ7PBPZsYEREASkyqeGAW2ltpdIlBEAtGRneTc2hi2NUlqVUgAuDmBsLDMh04AcLSTsJYxNdKYu7BR958hxMyqvhe3e1uOhrKKkrM5DtPdDG4Ul0BqqPp0rk2/iT3vxHWaN8RiK7DDUFzPUuCKahXccwxGgUc+A8Z17GbbJ0pDKPrc/QcBMLC48oxfKrFrBmsA7AcAXGp4njeRJf/AFWGjLcln/6Sy92rXZEf+PG90zW7qbi08KO2xFqtcAkDjTpG30b+838R9PExJm0nVKe0qbgi+U2Oh8uR4Tk1W40YEEcQRYjzBlXtTERxDhOMlJZ6eXu8zukkrItVHmsr1NfX8ZnVDNTiH97oT9xkWjEyXqbd8DxI/GdL2pudSck0SaJ101ZPgdR6H0nLsOGarTCgsWYAAAknW+gE7ri6gXQcTJ9N0YUpTrLJW/S6s6U6bnLdRGd2tgnDlqlXKX91bG4C8yLgan8B1kjDzGDSvNPNyxG9K5dU6KhHdRfNQDUmwGpJ4ADUkyK0VOOxdyD2Scv+mDoPNj+J8Jd3k2gdMOmrNbPbjrbKg6nT7hzMkW7+yuwpBT77d5z15L5Dh8Za7Ow7rTW9os39F58ehHr1NyOWvD7mxE1+1amLFSh8mWmyF/ni3EJdeGo5ZuFze02QWYG1qOLNSgcM9NED3rBhqyXXQaHlm4W1I1npan9cr+Wvrn0KyNrm0BlwSlRKwJuYKhKxKVErUQCsS4soAlYEArEqlIlUAREQBERAPCJQVlyIBYKzm292LdMbUytpanodR+zXlOn2nMd/Nn1hiHr9mxpsEs4Fxoig5re7qDxlZtaG/QStfP6MwzEw+2VOjjKfHiP/AJMqtjqSLnZ1APDW9/IDUyJl5rtoP3lPp8Z5iODhOWWRrY320N5ibrRXLb6TWJ9F4D1kv3U2fSxeApNiEFVianfPvj5xuDjUDpwnKaeZnyKCzNwVQSxPgANTO1bhbOq0MDSpVkNNwahKm1wGqMy3t0I0l9s3DQhJ2jlY2Iztb2fMLthamb+CpofRxofUDzmn2N7N69Ri2KYYdCx7q2eoRfx1VfPXynXik1WP2oq92nZm8foj+8l14YXDLxKjsuXPsufY6U6UqjtFGtwuy8NgUy0KahiLXPedurOdbdOExWqEm51Jh3JJJNyecpnkNobQnip5K0Vovq+F/lp3vMNho0Y9eZXmmJtPaIopfi7e6P8AyPQfedPGzHYxaS5m1J91ebf2XrLG7exHxdT5RX/Zg+Wcj6K+CDn8PG2cDhJ1prLt930FerGCMrc/YpJ+V1gSWuUvxJPGofPl8fCS4JMgUvCeinPc4ehGjBQj+yjqTc5XZYCSoJL4SehJ2NC0ElQWXQkrCQC0FlYWXAkqtAKAsqCyqIAiIgCIiAIiIAiIgCIiAR3a+5+FxFzk7Fz9On3deq+6fhfrIkfZc71fnMQBSHNF+cbXhZu6vnr5Tp8SPLC0pS3nHP1qDUbD3ew2EW2HpBCRYudajfzOdfThNrllUTukkrIEf3uD9iDTDGzgmwJ7uVr3Hhe0iVHaA+mPUf2nTJq9obCoVrlkysfpL3W9eR9ZS7S2U8TPxItXtaz6dSbhsUqcd1rIilMhtUIbyPDzB1HrNfj9r06eiEVX6aovmfpeQ06zY7W3QrAEUStUG3GyEajjfS3r6TN2FuQlMipiSKzDUIB3Aet/f9dOkqaGxqjnaUbd9PyS6mMja6d/maXd3dupi2+UYksKZ110ap4Bfqp1+HiOi06AUBVAVVFgBoABwAEvCez1GGwsKEbR14vmVdSq5vMoyRklcSScynJGWVRAPLT2IgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAmlq7zYVSQzsMuYn5qrYKmbM98tsgyt3/d04zdTV4fYmHTNakpz5wxYAlg5JZT4qSzacNT4mZVuJh34GIN7cHk7TttL5fcfNfhbLlvxFr246SulvThXsUqM+b3ctKq3acL9nZfnLZhfLe3O0yW2LhyArUUIChRcXIUOKgF+PvgN5i8uVdkUGADUkIGa2nDMVZrHlcqvwmXudTHtGvG9WFvlzOWvlyilUY5rgZQFUknUaC9gdbStd5sMSoV3fObJlpVWz6XOSy96w963u8Daef4Cq1DUpCjTN7g9iCy6C2ubxF724ADlLdDd0K2e1G4DKCKNsoZcune420Pj0j2THtGyfalIcSRx1yNbQ2ve1rX0vwlzC45KhIUm411Vl/MBNf8A4Q5a5ala9yOx111Njntx14W6HjMvA4N0Ys7q+htamEOpubm5vwE0s+aMre4mwiImTYREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//Z'},
                {src: 'https://www.shutterstock.com/image-vector/incident-management-process-business-technology-260nw-1633763863.jpg'}
            ]
        })

        const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
            const reader = new FileReader;
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        })

        const readAsBase64 = async (photo) => {
            if (isPlatform('hybrid')) {
                const file = await Filesystem.readFile({
                    path: photo.path
                });

                return file.data;
            }
            else {
                // Fetch the photo, read as a blob, then convert to base64 format
                const response = await fetch(photo.webPath);
                const blob = await response.blob();

                return await convertBlobToBase64(blob) as string;
            }
        }

        const selectImage = async () => {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos // Camera, Photos or Prompt!
            });

            if (image) {
                let base64 = await readAsBase64(image)
                console.log("base64", base64)
            }
        }

        const updateDateTime = () => {
            const now = moment();
            currentDateTime.value = now.format('DD/MM/YYYY HH:mm:ss');
        }
        
        onMounted(() => {
            getSpecialist()
            getCategories()
            if(!route.params.id){
                updateDateTime();
                setInterval(updateDateTime, 1000); // Actualiza cada segundo
            }
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

        const createIncidence = async () => {
            let { date, categorie, specialist, incidence, documentNumber } = form.value
            if(!!categorie && !!specialist && !!incidence && !!documentNumber){
                let payload = {
                    date,
                    categorie,
                    specialist,
                    incidence,
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
                    console.log("response.data", response.data)
                    // router.replace({ name: 'DetalleIncidencia', params: { id: 1 } })
                }
            }else{
                console.log("Completa el formulario")
            }
        }

        const deleteImage = async (file) => {
            console.log("param", file)
        }

        return {
            listOfSpecialist,
            listOfCategories,
            form,
            addCircleOutline,
            closeCircleOutline,
            selectImage,
            deleteImage,
            createIncidence
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
    