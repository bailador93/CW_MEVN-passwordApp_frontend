import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { jwtDecode } from "jwt-decode";
import { connectAPI } from '@/Helpers/connectAPI';
import { defineStore } from 'pinia'


export const userResourceStore = defineStore('userResource', () => {

    const DATA_RESPONSE_API = ref({ isLoading: true, response: {} });

    const $toast = useToast();

    const select_type = ref("");
    const form_data = ref({});

    const isEditDataResource = ref(false);
    const type_resource = ref({ _id: "", name_field: "", type_field: "text" });

    const data_resources = ref([]);

    const isRefresh = ref(true);


    const onActionUserResource = (ACTION: string, idParam: any = "") => {
        const TOKEN: string = localStorage.getItem("TOKEN_AUTH") ? jwtDecode(localStorage.getItem("TOKEN_AUTH") || "") : "";
        const IS_AUTH: boolean = TOKEN ? true : false;
        let isToast = false;
        let param: string = "";
        let msg: string = "";
        let data_form: any = {};
        let method: string = "";

        switch (ACTION) {
            case "CREATE_USER_RESOURCE":
                method = "POST";
                param = "user/create-resource";
                data_form.user_id = TOKEN._id;
                if (typeof form_data.value.resource_admin_id === "string") data_form.resource_admin_id = form_data.value.resource_admin_id;
                data_form.resource = form_data.value;
                isToast = true;


                // isRefresh.value= false;
                break;

            case "GET_USER_RESOURCES":
                method = "GET";
                param = "user/get-resources";
                break;

            case "GET_USER_RESOURCE_ID_TO_EDIT":
                method = "GET";
                param = `user/get-resource/${idParam}`;
                break;

            case "UPDATE_USER_RESOURCE":
                // method = "PUT";
                // param = `admin/edit-resource/${idParam}`;
                // data_form.user_id = TOKEN._id;
                // data_form.name_type = name_type.value;
                // data_form.fields = data_resources.value;
                // isToast = true;
                break;

            case "DELETE_USER_RESOURCE":
                // method = "DELETE";
                // param = `admin/delete-resource/${idParam}`;
                // isToast = true;

                break;
        }

        connectAPI(IS_AUTH, param, method, data_form, isToast ? $toast : null, DATA_RESPONSE_API);

    }
    return {
        isRefresh, select_type, form_data, DATA_RESPONSE_API, isEditDataResource, type_resource, data_resources,
        onActionUserResource
    }
})
