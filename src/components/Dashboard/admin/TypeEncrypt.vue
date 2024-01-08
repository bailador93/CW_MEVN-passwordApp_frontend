<script lang="ts">
import ButtonApp from '@/components/UI/ButtonApp.vue';
import LabelInput from '@/components/UI/LabelInput.vue';

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { adminResourceStore } from "../../../stores/adminResource";
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";

export default defineComponent({
    props: [],
    components: { ButtonApp, LabelInput },
    data() {
        return {select_type: "Tipo de contraseña", DATA_TYPE: DATA_TYPE_RESOURCE_DEFAULT}
    },
    computed: {  ...mapStores(adminResourceStore)},
    mounted() {this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");},
});

</script>

<template>
    <div style="padding:0" class="list_resource_content_user">
        <div class="content_table_data_list">
            <LabelInput :text="'Tipo de recurso'" :for_name="'type'" style="color:white" />
            <div style="width:100%; color:black" class="inline-block relative">
                <select v-model="select_type"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="t in DATA_TYPE.RESOURCES_DEFAULT" :key="t" :value="t">{{ t }}</option>
                    <option
                        v-if="!adminResourceStore.DATA_RESPONSE_API.isLoading && adminResourceStore.DATA_RESPONSE_API.response.data.length > 0"
                        v-for="r in adminResourceStore.DATA_RESPONSE_API.response.data" :key="r._id" :value="r._id">{{
                            r.name_type }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            <div class="content_table_data_list">
                <div class="list_resource_content_user">
                    <div v-if="adminResourceStore.DATA_RESPONSE_API.isLoading">
                        CARGANDO...
                    </div>
                    <div v-else>
                        <div>
                            <select v-if="select_type" name="cars" id="cars" style="color:black">
                                <option v-for="i in ['RFC 7519', 'AES-256', '...']" value="volvo">{{ i }}</option>
                            </select>
                            <table>
                                <tr v-if="select_type">
                                    <th class="center">Campo</th>
                                    <th class="center">Tipo</th>
                                </tr>
                                <tr v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[0]"
                                    v-for="d in DATA_TYPE.TYPE_PASSWORD" :key="d.name_input">
                                    <td>{{ d.name_input }}</td>
                                    <td class="center">{{ d.type_input }}</td>
                                </tr>
                                <tr v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[1]" v-for="d in DATA_TYPE.TYPE_CARD"
                                    :key="d.name_input">
                                    <td>{{ d.name_input }}</td>
                                    <td class="center">{{ d.type_input }}</td>
                                </tr>
                                <tr v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[2]" v-for="d in DATA_TYPE.NOTE"
                                    :key="d.name_input">
                                    <td>{{ d.name_input }}</td>
                                    <td class="center">{{ d.type_input }}</td>
                                </tr>
                                <tr v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[2]" v-for="d in DATA_TYPE.NOTE"
                                    :key="d.name_input">
                                    <td>{{ d.name_input }}</td>
                                    <td class="center">{{ d.type_input }}</td>
                                </tr>
                                <tr v-if="select_type !== DATA_TYPE.RESOURCES_DEFAULT[0] && select_type !== DATA_TYPE.RESOURCES_DEFAULT[1] & select_type !== DATA_TYPE.RESOURCES_DEFAULT[2]"
                                    v-for="(r, i) in adminResourceStore.DATA_RESPONSE_API.response.data[0].fields">
                                    <td>{{ r.name_field }}</td>
                                    <td>{{ r.type_field }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>