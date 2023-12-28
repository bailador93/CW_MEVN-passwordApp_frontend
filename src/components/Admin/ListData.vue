<script lang="ts">
import { defineComponent } from 'vue';

import ButtonApp from "../UI/ButtonApp.vue"


export default defineComponent({
    props: ["section", "withSelect", "ongetdatatoedit", "onshowformadduser"],
    components: { ButtonApp }
})
</script>

<template>
    <div class="hide_btn_create_new_resources" style="padding: 1%;" v-if="section === 'USER-ENTRIES'">
        <ButtonApp :text="'Nuevo recurso'" :orientation="'center'" :type="'button'" @click="$emit('onshowformadduser')" />
    </div>

    <div class="list_data_container hide_list_data_only_user">
        <div v-for="i in 50" class="flex flex-row list_data_content">
            <div :class="withSelect ? 'basis-8/12' : 'basis-11/12'" @click="$emit('ongetdatatoedit', i)">
                <div class="data_item">
                    {{ section === "ADMIN-ACCOUNTS" ? "Nombre Apellido" : null }}
                    {{ section === "SELECT-ENCRYPT" ? "Tipo de encriptación" : null }}
                    {{ section === "ADMIN-RESOURCES" ? "Tipo de recurso" : null }}
                    {{ section === "USER-ENTRIES" ? "Recursos" : null }}
                </div>
            </div>
            <div  class="basis-4/12 " v-if="withSelect">
                <div style="text-align: right;">
                    <div class="inline-block relative w-30">
                        <select
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>
                                {{ section === "ADMIN-ACCOUNTS" ? "Activo" : null }}
                                {{ section === "SELECT-ENCRYPT" ? "Tipo" : null }}
                                {{ section === "ADMIN-RESOURCES" ? "Seleccionar" : null }}
                            </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="padding: 1%;" v-if="section === 'ADMIN-RESOURCES'">
        <ButtonApp :text="'Crear nuevo recurso'" :orientation="'center'" :type="'button'" />
    </div>
</template>

 