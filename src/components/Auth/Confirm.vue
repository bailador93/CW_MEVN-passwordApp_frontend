<script lang="ts">
import TitleHead from '../UI/TitleHead.vue';

import { authStore } from "../../stores/auth";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: { TitleHead },
    computed: { ...mapStores(authStore) },
    mounted() { this.authStore.onActionAuth("GET_TOKEN_CONFIRM"); }
});

</script>

<template>
    <div v-if="authStore.DATA_RESPONSE_API.isLoading">
        CARGANDO
    </div>
    <div v-else-if="authStore.DATA_RESPONSE_API.response.status === 404" style="text-align:center; font-size: 5em;">
        {{ authStore.DATA_RESPONSE_API.response.msg }}
    </div>
    <div v-else style="text-align: center;">

        <div v-if="authStore.DATA_RESPONSE_API.response.status === 201" style="text-align:center; font-size: 3em;">
            <div>
                {{ authStore.DATA_RESPONSE_API.response.msg }}
            </div>
        </div>
    </div>
    <div v-if="!authStore.DATA_RESPONSE_API.isLoading" style="text-align: center;">
        <RouterLink :to="{ path: '/' }" style="color:#005CD2; margin-top: 3%;"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            ACCEDER
        </RouterLink>
    </div>
</template>