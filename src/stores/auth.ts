import { ref } from 'vue'
import { useToast } from 'vue-toast-notification';
import { useRoute } from 'vue-router';
import { connectAPI } from '@/Helpers/connectAPI';
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', () => {

  const $toast = useToast();
  const DATA_RESPONSE_API = ref({ isLoading: true, response: {} });
  const form_data = ref({ name: "", lastname: "", email: "", birth: "", password: "", confirm_password: "" });
  const $route = useRoute();

  const onActionAuth = (ACTION: string, idParam: string = "") => {
    const TOKEN: string = "";
    const IS_AUTH: boolean = TOKEN ? true : false;
    let isToast = false;
    let param: string = "";
    let msg: string = "";
    let data_form: any = {};
    let method: string = "POST";

    const { name, lastname, email, birth, password, confirm_password } = form_data.value;

    switch (ACTION) {
      case "LOGIN":
        param = "auth/login";
        data_form.email = email;
        data_form.password = password;
        if (email.trim() === "" || password.trim() === "") msg = "Todos los campos son requeridos";
        break;

      case "REGISTER":
        param = "auth/register";
        data_form = form_data.value;
        if (name.trim() === "" || lastname.trim() === "" || email.trim() === "" || birth.trim() === "" || password.trim() === ""
          || confirm_password.trim() === "") msg = "Todos los campos son requeridos"
        else if (password !== confirm_password) msg = "Las contraseñas ingresadas deben ser iguales";
        break;

      case "RECOVERY":
        param = "/auth/recovery";
        data_form.email = email;
        if (email.trim() === "") msg = "El campo 'E-mail' es requerido";
        break;

      case "RESET":
        param = `auth/reset-password/${idParam}`;
        data_form = form_data.value;
        if (password.trim() === "" || confirm_password.trim() === "") msg = "Todos los campos son requeridos"
        else if (password !== confirm_password) msg = "Las contraseñas ingresadas deben ser iguales";
        break;

      case "GET_TOKEN_CONFIRM":
        method = "GET";
        param = `auth/confirm-account/${$route.params.id}`;
        break;
    }
    if (msg) $toast.error(msg, {
      position: 'top'
    })
    else connectAPI(IS_AUTH, param, method, data_form, isToast ? $toast : null, DATA_RESPONSE_API);
  }

  return { form_data, DATA_RESPONSE_API, onActionAuth }
})
