import axios from "axios";

export const connectAPI = async (isToken: Boolean, VERB: string, param: any, data: any = {}, TOAST: any, data_API: any = {}) => {

    const URI = `http://localhost:7000/${param}`;

    const HEADER = !isToken ? {} : { headers: { "usuario_autorizacion": `${localStorage.getItem("TOKEN_AUTH")}` } };

    const AXIOS_action: any = (VERB === "GET" && axios.get(URI, HEADER)) || (VERB === "POST" && axios.post(URI, data, HEADER))
        || (VERB === "PUT" && axios.put(URI, data, HEADER)) || (VERB === "DELETE" && axios.delete(URI, HEADER));

    AXIOS_action.then((res: any) => {

        if (VERB === "GET") {
            data_API.value.isLoading = false;
            data_API.value.response = {
                status: res.status,
                msg: res.data.msg,
                data: param === "user/users" ? res.data.data : []
            };
        } else if (VERB === "POST") {
            data_API.value.isLoading = false;
            data_API.value.response = {
                status: res.status,
                msg: res.data.msg
            };

            if (param.includes("reset-password")) {
                setTimeout(() => {
                    window.location.replace("/");
                }, 3000);
            }
        }

        if (param === "auth/login") {
            localStorage.setItem("TOKEN_AUTH", res.data.data.token_auth);
            window.location.replace("/dashboard")
        }
        if (param === "auth/register") {
            window.location.replace("/auth")
        }


    }).catch((error: any) => {

        console.log(error.response)
        TOAST.error(error.response.statusText, {
            position: 'top'
        });

        if (VERB === "GET") {
            if (param.includes("confirm-account")) {
                data_API.value.isLoading = false;
                data_API.value.response = {
                    status: error.response.status,
                    msg: error.response.statusText
                };
                setTimeout(() => {
                    window.location.replace("/");
                }, 3000);
            }
        } else if (VERB === "POST") {
            data_API.value.isLoading = false;
            data_API.value.response = {
                status: error.response.status,
                msg: error.response.data.msg
            };

            if (param.includes("reset-password")) {
                setTimeout(() => {
                    window.location.replace("/");
                }, 3000);
            }
        }
    });
}