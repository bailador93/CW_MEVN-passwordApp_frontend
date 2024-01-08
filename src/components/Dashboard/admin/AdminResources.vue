<script lang="ts">
import ButtonApp from '@/components/UI/ButtonApp.vue';
import AddNewResource from "./AddNewResource.vue";

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { adminResourceStore } from "../../../stores/adminResource";
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";


export default defineComponent({
    props: [],
    components: { AddNewResource, ButtonApp },
    data() {
        return { DATA_TYPE: DATA_TYPE_RESOURCE_DEFAULT, isModalOpen: false, resourcerToEdit: {}, isRefresh: false }
    },
    computed: { ...mapStores(adminResourceStore) },
    beforeUpdate() {
        setTimeout(() => {
            if (this.isRefresh) {
                this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");
            }
            this.isRefresh = false;
        }, 500);
    },
    methods: {
        async onCloseAndPostPutModalResource() {
            this.$emit('oncloseandpostputmodalresource');
            await this.adminResourceStore.onActionAminResource(Object.keys(this.resourcerToEdit).length === 0 ? "CREATE_ADMIN_RESOURCE" : "UPDATE_ADMIN_RESOURCE", Object.keys(this.resourcerToEdit).length === 0 ? '' : this.resourcerToEdit._id);
            this.isModalOpen = false;
            this.resourcerToEdit = {};
            this.isRefresh = true;
        },
        onOpenModalActionResource() {
            this.$emit('onopenmodalactionresource');
            this.isModalOpen = true;
            this.isRefresh = true;
        },
        onCloseModalActionResource() {
            this.$emit('onclosemodalactionresource');
            this.isModalOpen = false;
            this.resourcerToEdit = {};
            this.isRefresh = true;

        },
        onOpenModalEditResource(src: any) {
            this.isModalOpen = true;
            this.resourcerToEdit = src;
        },
        onDeleteResource(src: any, i: any) {
            console.log("asd")
            this.$confirm.require({
                message: `Querés eliminar el registro '${src.name_type}'`,
                header: 'Confirmar eliminación',
                icon: 'pi pi-info-circle',
                rejectClass: 'p-button-text p-button-text',
                acceptClass: 'p-button-danger p-button-text',
                accept: () => {
                    this.adminResourceStore.DATA_RESPONSE_API.response.data.splice(i, 1);
                    this.adminResourceStore.onActionAminResource("DELETE_ADMIN_RESOURCE", src._id);
                    this.isRefresh = true;
                },
            });
        }
    },
    mounted() {
        if (!this.isRefresh) this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");
    }
});
</script>

<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="content_table_data_list">
        <div class="list_resource_content_user">
            <div style="padding-top:3%; padding-right: 3%;">
                <ButtonApp :text="'fa-solid fa-plus'" :orientation="'right'" :isIcon="true"
                    @onopenmodalactionresource="onOpenModalActionResource" />
            </div>
            <div v-if="adminResourceStore.DATA_RESPONSE_API.isLoading">
                CARGANDO...
            </div>
            <div v-else>
                <div v-if="!isModalOpen">
                    <table>
                        <tr>
                            <th class="center">Tipo</th>
                            <th class="center">Creación</th>
                            <th class="center">Acción</th>
                        </tr>
                        <tr v-for="d in DATA_TYPE.RESOURCES_DEFAULT" :key="d">
                            <td><i class="fa-solid fa-lock" style="color:rgb(247, 165, 165); margin-right: 5%;"></i> {{
                                d }}
                            </td>
                            <td class="center">Por Defecto</td>
                            <td class="center">-</td>
                        </tr>
                        <div style="padding: 5%;"
                            v-if="adminResourceStore.DATA_RESPONSE_API.response?.data?.data?.length === 0">
                            <p>{{ adminResourceStore.DATA_RESPONSE_API.response.data.msg }}</p>
                        </div>
                        <tr v-else v-for="(r, i) in adminResourceStore.DATA_RESPONSE_API.response.data">
                            <td><i class="fa-solid fa-lock-open" style="color: rgb(217, 247, 165);  margin-right: 5%;"></i>
                                {{
                                    r.name_type }}</td>
                            <td class="center">Personalizado</td>
                            <td class="center">
                                <button type="button" class="btn_action_custom btn_edit"
                                    @click="onOpenModalEditResource(r)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button type="button" class="btn_action_custom btn_danger" @click="onDeleteResource(r, i)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <AddNewResource v-else :resourcerToEdit="resourcerToEdit"
                    @oncloseandpostputmodalresource="onCloseAndPostPutModalResource"
                    @onclosemodalactionresource="onCloseModalActionResource" />
            </div>
        </div>
    </div>
</template>

 