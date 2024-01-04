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

    const userActive = ref("");


    const onDesactivateUser = () => {
        const str_arrs = userActive.value.split(' ');
        if (!userActive.value) {
            return;
        }

        // userActive.value=  str_arrs[0] === "true" ? "Activo" : "Inactivo"
        connectAPI(true, "PUT",
            `user/desactivate-user/${str_arrs[1]
            }`
            , { userIsActiveByAdmin: str_arrs[0] }, $toast)
    }



    const getDataAPI = (isToken: boolean, type: string) => {

        connectAPI(isToken, "GET",
            type === "CONFIRM" && `auth/confirm-account/${$route.params.id}` ||
            type === "USERS" && `user/users`
            , null, $toast, data_API)
    }

    return {
        data_API,
        userActive,
        getDataAPI,
        onDesactivateUser
    }
})
