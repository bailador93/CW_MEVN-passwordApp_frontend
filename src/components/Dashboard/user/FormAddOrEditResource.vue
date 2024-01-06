<script lang="ts">
import type { log } from 'console';
import { defineComponent } from 'vue';
import TitleHead from '../../UI/TitleHead.vue';
import LabelInput from '../../UI/LabelInput.vue';
import ButtonApp from '../../UI/ButtonApp.vue';
import { adminResourceStore } from "../../../stores/adminResource";
import { mapStores } from 'pinia';
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";

export default defineComponent({
    props: [],
    components: {
        TitleHead, LabelInput, ButtonApp
    },
    data() {
        return {
            select_type: "Tipo de contraseña",
            DATA_TYPE: DATA_TYPE_RESOURCE_DEFAULT,
        }
    },
    computed: {
        ...mapStores(adminResourceStore)
    },
    mounted() {
        console.log(this.$route);
        this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");
    },
});

</script>

<template>
    <TitleHead :text="$route.params.id ? 'Editar recurso' : 'Crear recurso'" :orientation="'left'" :isUpper="false" />

    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <LabelInput :text="'Tipo'" :for_name="'type'" />
                <div style="width:100%; color:black" class="inline-block relative">
                    <select v-model="select_type"
                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="t in DATA_TYPE.RESOURCES_DEFAULT" :key="t" :value="t">{{ t }}</option>
                        <option v-if="!adminResourceStore.DATA_RESPONSE_API.isLoading"
                            v-for="r in adminResourceStore.DATA_RESPONSE_API.response.data" :key="r._id" :value="r._id">{{
                                r.name_type }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>













                <!-- <div class="inline-block relative w-64">
                    <select id="type"
                        class="auth_form_inputs block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>select</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div> -->
            </div>

            <div class="mb-4">
                <LabelInput :text="'Nombre'" :for_name="'name'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="name"
                    type="text" placeholder="Nombre">
            </div>

            <div class="mb-4">
                <LabelInput :text="'Usuario'" :for_name="'user'" />
                <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline" id="user"
                    type="text" placeholder="Usuario">
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