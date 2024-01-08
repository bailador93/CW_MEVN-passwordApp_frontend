<script lang="ts">
import ButtonApp from '@/components/UI/ButtonApp.vue';
import TitleHead from '@/components/UI/TitleHead.vue';
import LabelInput from '@/components/UI/LabelInput.vue';

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { adminResourceStore } from "../../../stores/adminResource";
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";

export default defineComponent({
    props: ["resourcerToEdit", "oncloseandpostputmodalresource", "onclosemodalactionresource"],
    components: { TitleHead, LabelInput, ButtonApp },
    data() { return { select_type: "", DATA_TYPE: DATA_TYPE_RESOURCE_DEFAULT, srcToEdit: {} } },
    computed: { ...mapStores(adminResourceStore) },
    mounted() {
        if (Object.keys(this.resourcerToEdit).length > 0) {
            this.srcToEdit = this.resourcerToEdit
            this.adminResourceStore.name_type = this.resourcerToEdit.name_type;
            this.adminResourceStore.data_resources = this.resourcerToEdit.fields
        } else {
            this.srcToEdit = {};
            this.adminResourceStore.name_type = "";
            this.adminResourceStore.data_resources = [];
        }
    }
})
</script>

<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="content_modal_app fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <TitleHead style="color:black"
                                :text="Object.keys(srcToEdit).length === 0 ? 'Agregar nuevo recurso' : 'Editar recurso'"
                                :orientation="'left'" :isUpper="true" />
                        </div>

                        <form class="pt-3 pb-3 mb-4">
                            <div class="mb-4" v-if="!(Object.keys(srcToEdit).length > 0)">
                                <LabelInput :text="'Tipo de encriptado'" :for_name="'type_encrypt'" />
                                <div style="width:100%; color:black" class="inline-block relative">
                                    <select
                                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                        <option v-for="r in ['RFC 7519 - JSON Web Token (JWT)', 'AES-256 - Cryptr', 'hashids ??']" :key="r"
                                            :value="r">{{
                                                r }}</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <LabelInput :text="'Nombre del recurso'" :for_name="'name_type'" />
                                <input v-model="adminResourceStore.name_type" 
                                    class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                                    id="name_type" type="text" placeholder="Nombre del recurso">
                            </div>
                            <div class="content_inputs_add_resource">
                                <div class="mb-4">
                                    <LabelInput :text="'Nombre del campo'" :for_name="'name_field'" />
                                    <input
                                        class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                                        id="name_field" type="text" placeholder="Nombre del campo"
                                        v-model="adminResourceStore.type_resource.name_field" />
                                </div>
                                <div class="mb-4">
                                    <LabelInput :text="'Tipo del campo'" :for_name="'type_field'" />
                                    <div style="width:100%; color:black" class="inline-block relative">
                                        <select v-model="adminResourceStore.type_resource.type_field"
                                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            <!-- https://www.geeksforgeeks.org/html-input-type-attribute/ -->
                                            <option v-for="i in ['text', 'password', 'email', 'time', 'date',
                                               'tel', 'number', 'url']" :key="i" :value="i">{{ i }}
                                            </option>
                                        </select>
                                        <div
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align:center">
                                    <button style="color:black" type="button" class="btn_add_mini"
                                        @click="adminResourceStore.onAddData()">
                                        <i
                                            :class="[adminResourceStore.isEditDataResource ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-plus']"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="content_data_loaded" v-if="adminResourceStore.data_resources.length > 0">
                            <div class="item_data_loaded" v-for=" r  in  adminResourceStore.data_resources "
                                :key="r.name_field">
                                <div class="btn_actions">
                                    <button type="button" class=" btn_edit_mini" @click="adminResourceStore.onEditData(r)"
                                        :style="{ color: adminResourceStore.isEditDataResource ? 'white' : '', pointerEvents: adminResourceStore.isEditDataResource ? 'none' : '' }">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button type="button" class="btn_delete_mini"
                                        @click="adminResourceStore.onDeleteData(r)"
                                        :style="{ filter: adminResourceStore.isEditDataResource ? 'grayscale(2)' : '', pointerEvents: adminResourceStore.isEditDataResource ? 'none' : '' }">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <p style="font-size: .8em;"><b>{{ r.name_field }}</b> </p>
                                <p style="font-size: .8em;"><b>{{ r.type_field }}</b></p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="button" @click="$emit('oncloseandpostputmodalresource')"
                            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                            <p v-text="Object.keys(srcToEdit).length === 0 ? 'Agregar' : 'Editar'"></p>
                        </button>
                        <button type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            @click="$emit('onclosemodalactionresource')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
