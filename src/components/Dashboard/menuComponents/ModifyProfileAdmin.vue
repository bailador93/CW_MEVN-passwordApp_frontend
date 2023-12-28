
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonApp from "../../UI/ButtonApp.vue"
import LabelInput from "../../UI/LabelInput.vue"

export default defineComponent({
    components: {
        ButtonApp,
        LabelInput
    }
})

</script>
<template>
    <div class="content_list_data">

        <p class="head_title_homeApp" style="font-size:1.2em; text-align:left">
            Modificar perfil
        </p>


        <form class="px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <LabelInput :text="'Modificar usuario'" :for_name="'username'" />
                <input class="input_with_bradius_custom  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="User">
            </div>

            <div class="mb-4">
                <LabelInput :text="'Modificar contraseña'" :for_name="'password'" />
                <input class="input_with_bradius_custom  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="text" placeholder="******************">
            </div>

            <div class="mb-4">
                <LabelInput :text="'Repetir contraseña'" :for_name="'confirm_password'" />
                <input class="input_with_bradius_custom  w-full leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm_password" type="text" placeholder="******************">
            </div>
            <ButtonApp :text="'Guardar'" :orientation="'center'" :type="'submit'" />
        </form>
    </div>
</template>

<style>
.content_list_data {
    height: 65vh;
    overflow-y: auto;
}

.item_data {
    background-color: #108554;
    margin-bottom: 3%;
    padding: 3%;
    border-radius: 10px;
}
</style>