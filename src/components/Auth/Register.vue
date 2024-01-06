<script lang="ts">
import TitleHead from '../UI/TitleHead.vue';
import ButtonApp from '../UI/ButtonApp.vue';
import LabelInput from '../UI/LabelInput.vue';

import { authStore } from "../../stores/auth";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: { TitleHead, LabelInput, ButtonApp },
    computed: { ...mapStores(authStore) },
});
</script>

<template>
    <TitleHead :text="'Crear nueva cuenta'" :orientation="'left'" :isUpper="false" />
    <div class="content_form" style="margin:0;">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="authStore.onActionAuth('REGISTER')">
            <div class="mb-4">
                <LabelInput :text="'Nombre'" :for_name="'name'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="name"
                    type="text" v-model="authStore.form_data.name" placeholder="Nombre">
            </div>
            <div class="mb-4">
                <LabelInput :text="'Apellido'" :for_name="'apellido'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="apellido"
                    type="text" v-model="authStore.form_data.lastname" placeholder="Apellido">
            </div>
            <div class="mb-4">
                <LabelInput :text="'E-mail'" :for_name="'email'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                    type="email" v-model="authStore.form_data.email" placeholder="E-mail">
            </div>
            <div class="mb-4">
                <LabelInput :text="'Fecha de nacimiento'" :for_name="'fecha_nacimiento'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="fecha_nacimiento" v-model="authStore.form_data.birth" type="date">
            </div>
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
                <ButtonApp :text="'Crear cuenta'" :orientation="'center'" :type="'submit'" />
                <div>
                    <RouterLink :to="{ path: '/' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Ya tienes una cuenta?
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>