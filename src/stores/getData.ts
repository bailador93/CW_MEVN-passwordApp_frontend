import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification';
import { connectAPI } from '@/Helpers/connectAPI';
import { useRoute } from 'vue-router';

export const getData = defineStore('getData', () => {

    const $toast = useToast();

    const $route = useRoute();

    const data_API = ref({
        isLoading: true,
        response: {}
    });

    const getDataAPI = (isToken: boolean, type: string) => {

        connectAPI(isToken, "GET",
            type === "CONFIRM" && `confirm-account/${$route.params.id}` ||
            type === "USERS" && `users`
            , null, $toast, data_API)
    }

    return {
        data_API,
        getDataAPI
    }
})
