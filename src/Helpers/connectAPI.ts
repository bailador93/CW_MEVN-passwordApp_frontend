import axios from "axios";

export const connectAPI = async (IS_AUTH: boolean, param: string, method: string, data_form: any, toast: any, DATA_RESPONSE_API: any, FORM_RESET: any) => {

    const URI = `http://localhost:7000/${param}`;
    const HEADER = !IS_AUTH ? {} : { usuario_autorizacion: `${localStorage.getItem("TOKEN_AUTH")}` };

    console.log(param);

    await axios({
        method: method,
        url: URI,
        data: data_form,
        headers: HEADER
    }).then((res: any) => {
        // mostramos el toast (menos para lo que es AUTH) pero hacemos otras lógica
        if (method === "POST" || method === "PUT" || method === "DELETE") {

            if (param === "auth/login") {
                localStorage.setItem("TOKEN_AUTH", res.data.data.token_auth);
                window.location.replace("/dashboard")
            }
            if (param === "auth/register") {
                alert("Se te ha enviado un correo para que confirmes tu cuenta. Ahora serás redireccionado");
                window.location.replace("/auth")
            }
            if (param.includes("user/desactivate-user/")) {
                toast.success(res.data.msg, {
                    position: 'top-right'
                });
            }
            if (param === "admin/create-resource" || param.includes("admin/edit-resource/")
                || param.includes("admin/delete-resource/") || param.includes("user/edit-profile/")) {
                toast.success(res.data.msg, {
                    position: 'top-right'
                });

                if (param.includes("user/edit-profile/")) {
                    FORM_RESET.email= "";
                    FORM_RESET.password= "";
                    FORM_RESET.confirm_password= "";
                }
            }
            if (param === "user/create-resource" || param.includes("user/edit-resource/")) {
                window.location.replace("/dashboard")
            }

        }

        // DATA_RESPONSE_API <-- LO USAMOS ACÁ :D PARA ALMACENAR LA RESPUESTA.
        if (method === "GET") {
            DATA_RESPONSE_API.value.isLoading = false;
            DATA_RESPONSE_API.value.response = {
                status: res.status,
                msg: res.data.msg,
                data: res.data.data
            };
        }

    }).catch((error: any) => {

        // mostramos el toast (menos para lo que es AUTH)
        if (method === "POST" || method === "PUT" || method === "DELETE") {
            console.log(error);

            console.log(param)
            if (param === "auth/login" || param === "auth/recovery" || param === "auth/register") {
                toast.error(error.response.data.msg, {
                    position: 'top'
                });
            }
        }

        // DATA_RESPONSE_API <-- LO USAMOS ACÁ :D PARA ALMACENAR LA RESPUESTA EN CASO DE ERROR.
        if (method === "GET") {
            DATA_RESPONSE_API.value.isLoading = false;
            DATA_RESPONSE_API.value.response = {
                msg: error.response.data.msg,
                data: error.response.data
            };
        }
    });
}