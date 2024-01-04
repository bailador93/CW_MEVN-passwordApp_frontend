<script lang="ts">
import { defineComponent } from 'vue';
import { getData } from "../../../stores/getData";
import { mapStores } from 'pinia';


export default defineComponent({
    props: [],
    components: {
    },
    computed: {
        ...mapStores(getData)
    },
    mounted() {
        this.getDataStore.getDataAPI(true, "USERS");
    },
    updated() {
        this.getDataStore.getDataAPI(true, "USERS");
    }
});

</script>

<template>
    <div v-if="getDataStore.data_API.isLoading">
        CARGANDO...
    </div>

    <div v-else style="padding:0" class="list_resource_content_user">
        <div class="item_resource item_no_hover" v-for="u in getDataStore.data_API.response.data">
            <div class="flex flex-row">
                <div class="basis-1/2" style="padding: 1%;">
                    {{ u.name + " " + u.lastname }}
                </div>
                <div class="mb-4 basis-1/2">
                    <LabelInput :text="'Tipo'" :for_name="'type'" />
                    <div class="inline-block relative w-64">
                        {{u.userIsActiveByAdmin ? "Activo" : "Inactivo"}} Stored.
                        <select v-model="getDataStore.userActive" 
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option :value="'true ' + u._id" >Activo</option>
                            <option :value="'false ' + u._id">Inactivo</option>
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
</template>

<style scoped>
.item_no_hover {
    font-weight: bold;
    background-color: rgb(130, 183, 126);
}

.item_no_hover:hover {
    cursor: auto;
    color: black;
    background-color: rgb(130, 183, 126);
}
</style>