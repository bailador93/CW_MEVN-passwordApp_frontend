<script  lang="ts">
import { RouterLink } from 'vue-router'
import { defineComponent } from 'vue';

import ButtonApp from "../UI/ButtonApp.vue"
import LabelInput from "../UI/LabelInput.vue"

export default defineComponent({
    components: { ButtonApp, LabelInput }
})
</script>
 
<template>
    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <LabelInput :text="'Correo electrónico'" :for_name="'email'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                    type="text" placeholder="E-mail">
            </div>

            <div style="text-align: center;">

                <ButtonApp :text="'Recuperar'" :orientation="'center'" :type="'submit'" />

                <div>
                    <RouterLink to="/" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Ya la recuerdo
                    </RouterLink>
                    |
                    <RouterLink to="/register" style="color:#005CD2; margin-top: 3%;"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        No tienes una cuenta?
                    </RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>
 