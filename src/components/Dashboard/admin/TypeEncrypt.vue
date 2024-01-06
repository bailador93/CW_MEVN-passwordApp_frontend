<script lang="ts">
import ButtonApp from '@/components/UI/ButtonApp.vue';
import LabelInput from '@/components/UI/LabelInput.vue';
import { defineComponent } from 'vue';
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";
import { adminResourceStore } from "../../../stores/adminResource";
import { mapStores } from 'pinia';

export default defineComponent({
    props: [],
    components: { ButtonApp, LabelInput },
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
        this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");
    },
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
                    <option v-if="!adminResourceStore.DATA_RESPONSE_API.isLoading" v-for="r in adminResourceStore.DATA_RESPONSE_API.response.data"
                        :key="r._id" :value="r._id">{{ r.name_type }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            <div class="card_content_badges_type_selected" v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[0]">
                <p class="title_selected">Tipo de contraseña</p>
                <div class="content_item">
                    <p v-for="t in DATA_TYPE.TYPE_PASSWORD" class="item_badge_span_type">
                        {{ t.name_input }}: type="{{ t.type_input }}"
                    </p>
                </div>
            </div>
            <div class="card_content_badges_type_selected" v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[1]">
                <p class="title_selected">Tipo de tarjeta</p>
                <div class="content_item">
                    <p v-for="t in DATA_TYPE.TYPE_CARD" class="item_badge_span_type">
                        {{ t.name_input }}: type="{{ t.type_input }}"
                    </p>
                </div>
            </div>
            <div class="card_content_badges_type_selected" v-if="select_type === DATA_TYPE.RESOURCES_DEFAULT[2]">
                <p class="title_selected">Nota</p>
                <div class="content_item">
                    <p v-for="t in DATA_TYPE.NOTE" class="item_badge_span_type">
                        {{ t.name_input }}: type="{{ t.type_input }}"
                    </p>
                </div>
            </div>
            <div v-for="d in adminResourceStore.DATA_RESPONSE_API.response.data">
                <div v-if="d._id === select_type">
                    <div class="card_content_badges_type_selected">
                        <p class="title_selected">{{ d.name_type }}</p>
                        <div class="content_item">
                            <p v-for="t in d.fields" class="item_badge_span_type">
                                {{ t.name_field }}: type="{{ t.type_field }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>