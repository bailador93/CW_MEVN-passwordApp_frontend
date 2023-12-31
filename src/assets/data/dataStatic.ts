export const DATA_TYPE_RESOURCE_DEFAULT = {
    RESOURCES_DEFAULT: ["Tipo de contraseña", "Tipo de tajeta", "Nota"],
    TYPE_PASSWORD: [
        {
            name_input: "Nombre",
            type_input: "text",
            field_model: "nombre"
        },
        {
            name_input: "Usuario",
            type_input: "text",
            field_model: "usuario"
        },
        {
            name_input: "Contraseña",
            type_input: "password",
            field_model: "password"
        }
    ],
    TYPE_CARD: [
        {
            name_input: "Nombre",
            type_input: "text",
            field_model: "nombre"
        },
        {
            name_input: "Nro de tarjeta",
            type_input: "password",
            field_model: "nro_de_tarjeta"
        },
        {
            name_input: "Mes de expiración",
            type_input: "text",
            field_model: "mes_de_expiracion"
        },
        {
            name_input: "Año de expiración",
            type_input: "text",
            field_model: "anio_de_expiracion"
        },
        {
            name_input: "Código de seguridad",
            type_input: "password",
            field_model: "codigo_de_seguridad"
        }
    ],
    NOTE: [
        {
            name_input: "Nombre",
            type_input: "text",
            field_model: "nombre"

        },
        {
            name_input: "Descripción",
            type_input: "textarea",
            field_model: "descripcion"

        }
    ],
};


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