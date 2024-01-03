<script lang="ts">
import type { log } from 'console';
import { defineComponent } from 'vue';

import TitleHead from '../../UI/TitleHead.vue';
import LabelInput from '../../UI/LabelInput.vue';
import ButtonApp from '../../UI/ButtonApp.vue';
import { jwtDecode } from "jwt-decode";

export default defineComponent({
    props: [],
    components: {
        TitleHead, LabelInput, ButtonApp
    },
    data() {
        return {
            decodeTOKEN: jwtDecode(localStorage.getItem("TOKEN_AUTH")),
        }
    },
    mounted() {
        console.log(this.$route);
    },
});

</script>

<template>
    <TitleHead :text="'Modificar perfil'" :orientation="'left'" :isUpper="false" />

    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4">

            <div class="circle_with_char">
                {{ decodeTOKEN.name.charAt(0) }}
            </div>



            <div class="mb-4">
                <LabelInput :text="'Usuario'" :for_name="'user'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="user"
                    type="text" placeholder="Usuario">
            </div>

            <div class="mb-4">
                <LabelInput :text="'E-mail'" :for_name="'email'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                    type="text" placeholder="E-mail">
            </div>


            <div class="mb-4">
                <LabelInput :text="'Contraseña'" :for_name="'password'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="password"
                    type="text" placeholder="******************">
            </div>

            <div class="mb-4">
                <LabelInput :text="'Confirmar contraseña'" :for_name="'confirm_password'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm_password" type="text" placeholder="******************">
            </div>

            <div style="text-align: center;">
                <ButtonApp :text="$route.params.id ? 'Editar' : 'Guardar'" :orientation="'left'" :type="'submit'" />
                <ButtonApp v-if="$route.params.id" :text="$route.params.id ? 'Borrar' : ''" :orientation="'left'"
                    :type="'submit'" />
            </div>
        </form>
    </div>
</template>