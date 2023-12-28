<script lang="ts">
import { defineComponent } from 'vue';

import TitleHead from "../UI/TitleHead.vue"
import ButtonApp from "../UI/ButtonApp.vue"
import LabelInput from "../UI/LabelInput.vue"


export default defineComponent({
    props: ["dataToEdit", "textFormToEdit"],
    components: { ButtonApp, TitleHead, LabelInput }
})
</script>

<template>
    <TitleHead :text="textFormToEdit == 'AGREGAR' ? 'Agregar recurso' : ''" />
    <TitleHead :text="textFormToEdit == 'EDITAR' ? 'Editar recurso' : ''" />


    <form class="px-8 pt-6 pb-8 mb-4">

        <div v-if="textFormToEdit == 'AGREGAR'">
            <div class="mb-4">
                <LabelInput :text="'Tipo'" :for_name="'tipo'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="tipo"
                    type="text" placeholder="Tipo">
            </div>
        </div>

        <div class="mb-4">
            <LabelInput :text="'Nombre'" :for_name="'nombre'" />
            <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="nombre"
                type="text" placeholder="Nombre">
        </div>

        <div class="mb-4">
            <LabelInput :text="'Contraseña'" :for_name="'password'" />
            <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="password"
                type="text" placeholder="******************">
        </div>

        <div class="mb-4">
            <LabelInput :text="'Ingrese su correo'" :for_name="'email'" />
            <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="email"
                type="text" placeholder="E-mail">
        </div>

    </form>

    <div style="padding: 1%;">
        <ButtonApp :text="textFormToEdit == 'AGREGAR' ? 'Guardar' : 'Editar'
            " :orientation="'left'" :type="'button'" />
        <ButtonApp :text="textFormToEdit == 'AGREGAR' ? 'Cancelar' : 'Borrar'
            " :orientation="'left'" :type="'button'" />
    </div>
</template>

 