
<script lang="ts">
import { getData } from "../../stores/getData";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import TitleHead from '../UI/TitleHead.vue';

export default defineComponent({
    props: [],
    components: { TitleHead },
    computed: {
        ...mapStores(getData)
    },
    mounted() {
        this.getDataStore.getDataAPI(false, "CONFIRM");
    }
});

</script>

<template>
    <div v-if="getDataStore.data_API.isLoading">
        CARGANDO
    </div>
    <div v-else-if="getDataStore.data_API.response.status === 404" style="text-align:center; font-size: 5em;">
        {{ getDataStore.data_API.response.msg }}
    </div>
    <div v-else style="text-align: center;">

        <div v-if="getDataStore.data_API.response.status === 201" style="text-align:center; font-size: 3em;">
            <div>
                {{ getDataStore.data_API.response.msg }}
            </div>
        </div>
    </div>
    <div v-if="!getDataStore.data_API.isLoading" style="text-align: center;">
        <RouterLink :to="{ path: '/' }" style="color:#005CD2; margin-top: 3%;"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            ACCEDER
        </RouterLink>
    </div>
</template>