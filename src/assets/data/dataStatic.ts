export const ROLE: string[] = ["PUBLICO", "ADMINISTRADOR", "USUARIO"];

export const PUBLIC_PATH: string[] = ["/", "/register", "/recovery"];

export const ADMIN_PATH: string[] = ["/admin", "/admin/admin-accounts", "/admin/select-encrypt",
    "/admin/admin-resources", "/admin/modify-profile-admin"]

export const USER_PATH: string[] = ["/admin/user", "/admin/user/user-entries", "/admin/user/modify-profile-user",
    "/admin/user/generate-new-password"];


// <i class="fa-solid fa-lock"></i> <i class="fa-solid fa-gear"></i> <i class="fa-solid fa-user-tie"></i> <i class="fa-solid fa-pen-to-square"></i>
export const MENU_ADMIN: Array<object> = [
    {
        url: "/admin/admin-accounts",
        name: "Administrar cuentas",
        icon: "fa-solid fa-gear"
    },
    {
        url: "/admin/select-encrypt",
        name: "Seleccionar tipo de encriptación",
        icon: "fa-solid fa-lock"
    },
    {
        url: "/admin/admin-resources",
        name: "Administrar los recursos",
        icon: "fa-solid fa-user-tie"
    },
    {
        url: "/admin/modify-profile-admin",
        name: "Modificar perfil del administrador",
        icon: "fa-solid fa-pen-to-square"
    }
];

export const MENU_USER: Array<object> = [
    {
        url: "/admin/user/user-entries",
        name: "Entrada de usuarios",
        icon: "fa-solid fa-gear"
    },
    {
        url: "/admin/user/modify-profile-user",
        name: "Modificar perfil del usuario",
        icon: "fa-solid fa-gear"
    },
    {
        url: "/admin/user/generate-new-password",
        name: "Generar nueva contraseña",
        icon: "fa-solid fa-gear"
    }
];