import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { jwtDecode } from "jwt-decode";
import { connectAPI } from '@/Helpers/connectAPI';
import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', () => {

    const $toast = useToast();
    const $route = useRoute();
    const userActive = ref("");
    const useIsRefresh = ref(false);

    const DATA_RESPONSE_API = ref({ isLoading: true, response: {} });
    const form_data = ref({ username: "", password: "", confirm_password: "" });

    const onActionUser = (ACTION: string, idParam: string = "", isInactive: boolean = false) => {
        const TOKEN: string = localStorage.getItem("TOKEN_AUTH") ? jwtDecode(localStorage.getItem("TOKEN_AUTH") || "") : "";
        const IS_AUTH: boolean = TOKEN ? true : false;
        let isToast = false;
        let param: string = "";
        let msg: string = "";
        let data_form: any = {};
        let method: string = "";

        useIsRefresh.value = !useIsRefresh.value;

        switch (ACTION) {
            case "GET_USERS":
                method = "GET";
                param = "user/users";
                break;

            case "UPDATE_USER":
                method = "PUT";
                param = `user/desactivate-user/${idParam}`;
                data_form.userIsActiveByAdmin = isInactive;
                break;

            case "UPDATE_PROFILE_ADMIN":
                method = "PUT";
                param = `user/edit-profile/${TOKEN._id}`;

                data_form.username = form_data.value.username;
                data_form.password = form_data.value.password;
                data_form.confirm_password = form_data.value.confirm_password;
                break;
        }

        connectAPI(IS_AUTH, param, method, data_form, isToast ? $toast : null, DATA_RESPONSE_API);
    }
    return {
        userActive, useIsRefresh, DATA_RESPONSE_API, form_data, onActionUser
    }
})

