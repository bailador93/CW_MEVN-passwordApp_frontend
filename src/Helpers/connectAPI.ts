import axios from "axios";

export const connectAPI = async (isToken: Boolean, VERB: string, param: any, data: any = {}, TOAST: any, data_API: any = {}) => {

    const URI = `http://localhost:7000/${param}`;

    const HEADER = !isToken ? {} : { headers: { "usuario_autorizacion": `${localStorage.getItem("TOKEN_AUTH")}` } };

    const AXIOS_action: any = (VERB === "GET" && axios.get(URI, HEADER)) || (VERB === "POST" && axios.post(URI, data, HEADER))
        || (VERB === "PUT" && axios.put(URI, HEADER)) || (VERB === "DELETE" && axios.delete(URI, HEADER));

    AXIOS_action.then((res: any) => {

        if (VERB === "GET") {
            data_API.value.isLoading = false;
            data_API.value.response = {
                status: res.status,
                msg: res.data.msg,
                data: param === "users" ? res.data.data : []
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

        if (param === "login") {
            localStorage.setItem("TOKEN_AUTH", res.data.data.token_auth);
            window.location.replace("/dashboard")
        }
        if (param === "register") {
            window.location.replace("/auth")
        }


    }).catch((error: any) => {

        console.log(error)
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
    })


    // return "GET" === "GET" && AXIOS.get("/get") || "POST" === "GET" && AXIOS.post("/post").then((res) => {
    //     console.log("res")
    // });



    // switch (VERB) {
    //     case "GET":
    //         axios.get(URI, data)
    //             .then(function (response) {
    //                 // console.log(response);

    //                 console.log(param)
    //                 // data.isExist = true;
    //                 // TOAST.success("Created user, activate your account", {
    //                 //     position: 'top'
    //                 // });

    //                 // if (param === "register") {
    //                 //     setTimeout(() => {
    //                 //         window.location.replace("/");
    //                 //     }, 3000)

    //                 // }
    //             })
    //             .catch(function (error) {
    //                 console.log(error.data)
    //                 data.isExist = false;
    //                 TOAST.error(error.response.data.msg, {
    //                     position: 'top'
    //                 });
    //             });
    //         break;

    //     case "POST":
    //         axios.post(URI, data)
    //             .then(function (response) {
    //                 console.log(response);

    //                 let msg = "";

    //                 if (param === "register") {
    //                     msg = "Created user, activate your account"
    //                     setTimeout(() => {
    //                         window.location.replace("/");
    //                     }, 3000)
    //                 } else if (param === "login") {
    //                     msg = "User logged in successfully"
    //                 }

    //                 TOAST.success(msg, {
    //                     position: 'top'
    //                 });
    //             })
    //             .catch(function (error) {
    //                 console.log(error.response)
    //                 TOAST.error(error.response.data.msg, {
    //                     position: 'top'
    //                 });
    //             });
    //         break;

    //     case "PUT":
    //         break;

    //     case "DELETE":
    //         break;


    // }
    // // 




}