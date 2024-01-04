import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification';
import { connectAPI } from '@/Helpers/connectAPI';

export const authStore = defineStore('auth', () => {

  const $toast = useToast();

  const form_data = ref({
    name: "",
    lastname: "",
    email: "",
    birth: "",
    password: "",
    confirm_password: ""
  });

  const data_API = ref({
    isLoading: true,
    response: {}
  });

  const onSubmitFormAuth = (typeAuth: string, idParam: string = "") => {

    let msg = "";
    let new_data: any = {};

    const { name, lastname, email, birth, password, confirm_password } = form_data.value;

    if (typeAuth === "LOGIN") {
      new_data.email = email;
      new_data.password = password;
      if (email.trim() === "" || password.trim() === "") {
        msg = "All fields are required";
      }
    } else if (typeAuth === "RECOVERY") {
      new_data.email = email;
      if (email.trim() === "") {
        msg = "Field E-mail is required";
      }
    } else if (typeAuth === "REGISTER") {
      new_data = form_data.value;
      if (name.trim() === "" || lastname.trim() === "" || email.trim() === "" || birth.trim() === "" || password.trim() === ""
        || confirm_password.trim() === "") {
        msg = "All fields are required";

      } else if (password !== confirm_password) {
        msg = "The password must be the same";
      }
    } else if (typeAuth === "RESET") {
      new_data = form_data.value;

      if (password.trim() === "" || confirm_password.trim() === "") {
        msg = "All fields are required";

      } else if (password !== confirm_password) {
        msg = "The password must be the same";
      }
    }

    if (msg) {
      $toast.error(msg, {
        position: 'top'
      });
    } else {
      connectAPI(false, "POST", typeAuth === "REGISTER" && "auth/register" ||
        typeAuth === "LOGIN" && "auth/login" || typeAuth === "RECOVERY" && "auth/recovery" || typeAuth === "RESET" && `auth/reset-password/${idParam}`, new_data, $toast, data_API);
    }
  }

  return {
    form_data,
    data_API,
    onSubmitFormAuth
  }
})
