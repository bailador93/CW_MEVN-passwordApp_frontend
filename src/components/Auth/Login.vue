<script lang="ts">
import ButtonApp from '../UI/ButtonApp.vue';
import TitleHead from '../UI/TitleHead.vue';
import LabelInput from '../UI/LabelInput.vue';

import { authStore } from "../../stores/auth";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: { TitleHead, LabelInput, ButtonApp },
    computed: { ...mapStores(authStore) }
});
</script>

<template>
    <TitleHead :text="'Bienvenido'" :orientation="'center'" :isUpper="true" />
    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="authStore.onActionAuth('LOGIN')">
            <div class="mb-4">
                <LabelInput :text="'Correo electrónico'" :for_name="'email'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                    type="text" placeholder="E-mail" v-model="authStore.form_data.email">
            </div>
            <div class="mb-6">
                <LabelInput :text="'Contraseña'" :for_name="'password'" />
                <input class="auth_form_inputs  w-full   leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************" v-model="authStore.form_data.password">
            </div>
            <div style="text-align: center;">
                <ButtonApp :text="'Iniciar sesión'" :orientation="'center'" :type="'submit'" />
                <div>
                    <RouterLink :to="{ name: 'auth-recovery' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Recuperar contraseña
                    </RouterLink>
                    |
                    <RouterLink :to="{ name: 'auth-register' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        No tienes una cuenta?
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>