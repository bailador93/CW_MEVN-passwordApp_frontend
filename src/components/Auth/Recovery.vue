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
    <TitleHead :text="'Recuperar cuenta'" :orientation="'left'" :isUpper="false" />
    <div v-if="authStore.DATA_RESPONSE_API.response.msg" :style="{
        backgroundColor: 'black',
        color: authStore.DATA_RESPONSE_API.response.status === 404 ? 'rgb(224, 40, 40)' : 'green', padding: '3%', fontSize: '2em'
    }">
        {{ authStore.DATA_RESPONSE_API.response.msg }}
    </div>
    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent="authStore.onActionAuth('RECOVERY')">
            <div class="mb-4">
                <LabelInput :text="'Correo electrónico'" :for_name="'email'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                    type="email" placeholder="E-mail" v-model="authStore.form_data.email">
            </div>
            <div style="text-align: center;">
                <ButtonApp :text="'Recuperar'" :orientation="'center'" :type="'submit'" />
                <div>
                    <RouterLink :to="{ name: 'auth-login' }" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Ya la recuerdo
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