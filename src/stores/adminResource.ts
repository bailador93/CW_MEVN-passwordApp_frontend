import shortid from "shortid";

import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { jwtDecode } from "jwt-decode";
import { connectAPI } from '@/Helpers/connectAPI';
import { defineStore } from 'pinia'

export const adminResourceStore = defineStore('adminResource', () => {

    const DATA_RESPONSE_API = ref({ isLoading: true, response: {} });

    const $toast = useToast();

    const name_type = ref("");
    const isEditDataResource = ref(false);
    const type_resource = ref({ _id: "", name_field: "", type_field: "text" });

    const data_resources = ref([]);


    const onAddData = () => {
        if (isEditDataResource.value) {
            data_resources.value = data_resources.value.map((e: any) => e._id == type_resource.value._id ? type_resource.value : e);
            isEditDataResource.value = false;
            type_resource.value = { _id: "", name_field: "", type_field: "" };
        } else {
            data_resources.value.push({ _id: shortid.generate(), name_field: type_resource.value.name_field, type_field: type_resource.value.type_field });
            type_resource.value = { name_field: "", type_field: "" };
        }
    }

    const onEditData = (data: any) => {
        type_resource.value = {
            _id: data._id,
            name_field: data.name_field,
            type_field: data.type_field
        }
        isEditDataResource.value = true;
    }

    const onDeleteData = (data: any) => {
        data_resources.value = data_resources.value.filter((e: any) => e._id !== data._id);
    }

    const onActionAminResource = (ACTION: string, idParam: string = "") => {
        const TOKEN: string = localStorage.getItem("TOKEN_AUTH") ? jwtDecode(localStorage.getItem("TOKEN_AUTH") || "") : "";
        const IS_AUTH: boolean = TOKEN ? true : false;
        let isToast = false;
        let param: string = "";
        let msg: string = "";
        let data_form: any = {};
        let method: string = "";

        switch (ACTION) {
            case "CREATE_ADMIN_RESOURCE":
                method = "POST";
                param = "admin/create-resource";
                data_form.user_id = TOKEN._id;
                data_form.name_type = name_type.value;
                data_form.fields = data_resources.value;
                break;

            case "GET_ADMIN_RESOURCES":
                method = "GET";
                param = "admin/get-resources";
                break;

            case "UPDATE_ADMIN_RESOURCE":
                method = "PUT";
                param = `admin/edit-resource/${idParam}`;
                data_form.user_id = TOKEN._id;
                data_form.name_type = name_type.value;
                data_form.fields = data_resources.value;
                break;

            case "DELETE_ADMIN_RESOURCE":
                method = "DELETE";
                param = `admin/delete-resource/${idParam}`;
                break;
        }

        connectAPI(IS_AUTH, param, method, data_form, isToast ? $toast : null, DATA_RESPONSE_API);
    }
    return {
        name_type, DATA_RESPONSE_API, isEditDataResource, type_resource, data_resources,
        onActionAminResource, onAddData, onEditData, onDeleteData
    }
})
