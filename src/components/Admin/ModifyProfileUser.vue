<script lang="ts">
import { defineComponent } from 'vue';

import ButtonApp from "../UI/ButtonApp.vue"
import TitleHead from "../UI/TitleHead.vue"
import LabelInput from "../UI/LabelInput.vue"

export default defineComponent({
    props: ["section"],
    components: { ButtonApp, TitleHead, LabelInput }
})
</script>

<template>
    <div style="margin-bottom: -3%;">
        <TitleHead :text="'Modificar perfil'" />
    </div>

    <form class="px-8 pt-6 pb-8 mb-4">
        <div class="flex flex-row">
            <div class="basis-8/12">
                <div class="mb-4">
                    <LabelInput :text="'Nombre'" :for_name="'nombre'" />
                    <input
                        class="auth_form_inputs input_form_admin  w-full leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre" type="text" placeholder="Nombre">
                </div>
                <div class="mb-4">
                    <LabelInput :text="'Correo'" :for_name="'correo'" />
                    <input
                        class="auth_form_inputs input_form_admin  w-full leading-tight focus:outline-none focus:shadow-outline"
                        id="correo" type="text" placeholder="E-mail">
                </div>

                <div class="mb-4">
                    <LabelInput :text="'Contraseña'" :for_name="'password'" />
                    <input
                        class="auth_form_inputs input_form_admin   w-full leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="text" placeholder="******************">
                </div>
                <div class="mb-4">
                    <LabelInput :text="'Confirmar contrasña'" :for_name="'confirm_password'" />
                    <input
                        class="auth_form_inputs input_form_admin  w-full leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm_password" type="text" placeholder="******************">
                </div>
            </div>

            <div class="basis-4/12">
                SUBIR IMAGEN?
            </div>

        </div>

        <div style="text-align: center;">
            <ButtonApp :text="'Guardar'" :orientation="'center'" :type="'submit'" />
        </div>
    </form>

    <div style="padding: 1%;" v-if="section === 'ADMIN-RESOURCES'">
        <ButtonApp :text="'Crear nuevo recurso'" :orientation="'center'" :type="'button'" />
    </div>
</template>

<style scoped>
.input_form_admin {
    padding: 1% !important;
}
</style>