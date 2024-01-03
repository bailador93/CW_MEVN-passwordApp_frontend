
<script lang="ts">
import { defineComponent } from 'vue';
import TitleHead from '../UI/TitleHead.vue';
import LabelInput from '../UI/LabelInput.vue';
import ButtonApp from '../UI/ButtonApp.vue';
import { authStore } from "../../stores/auth";
import { mapStores } from 'pinia';

export default defineComponent({
    props: [],
    components: { TitleHead, LabelInput, ButtonApp },
    computed: {
        ...mapStores(authStore)
    },
    mounted(){
        console.log("hoasd", this.$route.params.id)
    }
});
</script>

<template>
    <TitleHead :text="'Nueva contraseña'" :orientation="'left'" :isUpper="false" />

    <div v-if="authStore.data_API.response.msg" :style="{
        backgroundColor: 'black',
        color: authStore.data_API.response.status === 404 ? 'rgb(224, 40, 40)' : 'green', padding: '3%', fontSize: '2em'
    }">
        {{ authStore.data_API.response.msg }}
    </div>
    
    <div class="content_form" style="margin:0;">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="authStore.onSubmitFormAuth('RESET', $route.params.id)">
            <div class="mb-6">
                <LabelInput :text="'Contraseña'" :for_name="'password'" />
                <input class="auth_form_inputs  w-full   leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" v-model="authStore.form_data.password" placeholder="******************">
            </div>
            <div class="mb-4">
                <LabelInput :text="'Confirmar contraseña'" :for_name="'confirm_password'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm_password" v-model="authStore.form_data.confirm_password" type="password"
                    placeholder="******************">
            </div>
            <div style="text-align: center;">
                <ButtonApp :text="'Aceptar'" :orientation="'center'" :type="'submit'" />
            </div>
        </form>
    </div>
</template>