
export const MENU_ADMIN: Array<object> = [
    {
        url: "dash-admin-account",
        name: "Administrar cuentas",
        icon: "fa-solid fa-gear"
    },
    {
        url: "dash-select-encrypt",
        name: "Seleccionar tipo de encriptación",
        icon: "fa-solid fa-lock"
    },
    {
        url: "dash-admin-resources",
        name: "Administrar los recursos",
        icon: "fa-solid fa-user-tie"
    },
    {
        url: "dash-modify-profile-admin",
        name: "Modificar perfil del administrador",
        icon: "fa-solid fa-pen-to-square"
    }
];

export const MENU_USER: Array<object> = [
    {
        url: "dash-user-resources",
        name: "Entradas",
        icon: "fa-solid fa-gear"
    },
    // {
    //     url: "dash-user-form-resource/:id?",
    //     name: "Modificar perfil del usuario",
    //     icon: "fa-solid fa-gear"
    // },
    {
        url: "dash-user-form-modify-profile/:id",
        name: "Modificar perfil",
        icon: "fa-solid fa-gear"
    }
];