
<script lang="ts">
import ButtonApp from "../../UI/ButtonApp.vue"
export default {

    data() {
        return {
            DATA: [
                {
                    nombre: "Tipo de recurso A",
                },
                {
                    nombre: "Tipo de recurso B",
                },
                {
                    nombre: "Tipo de recurso C",
                }
            ]
        }
    },
    components:{
        ButtonApp
    }
}
</script>
<template>
    <div class="basis-12/12 content_list_data">
        <!-- <div v-for="d in DATA" :key="d" class="item_data">
            <div class="flex flex-row">
                <div class="basis-10/12" style="padding:1%; font-weight:bold">
                    {{ d.nombre }}
                </div>
                <div class="basis-3/12" style="text-align:center">
                    <div class="inline-block relative w-30">
                        <select
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Seleccionar</option>
                            <option>Seleccionar1</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <ButtonApp :text="'Crear nuevo recurso'" :orientation="'center'" :type="'submit'"/>
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