import { jwtDecode } from "jwt-decode";
import { createRouter, createWebHistory } from 'vue-router'

const decodeTOKEN: any = localStorage.getItem("TOKEN_AUTH") ? jwtDecode(localStorage.getItem("TOKEN_AUTH")) : "";

export const ROUTES_ADMIN = ({ role }: any, components: any) => {
  if (role === "USUARIO") return components.USER;
  if (role === "ADMINISTRADOR") return components.ADMIN;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("../components/Auth/MainAuth.vue"),
      redirect: '',
      children: [
        {
          path: "",
          name: "auth-login",
          component: () => import("../components/Auth/Login.vue")
        },
        {
          path: "confirm/:id",
          name: "auth-confirm",
          component: () => import("../components/Auth/Confirm.vue")
        },
        {
          path: "register",
          name: "auth-register",
          component: () => import("../components/Auth/Register.vue")
        },
        {
          path: "reset/:id",
          name: "auth-reset",
          component: () => import("../components/Auth/Reset.vue")
        },
        {
          path: "recovery",
          name: "auth-recovery",
          component: () => import("../components/Auth/Recovery.vue")
        }
      ]
    },
    {
      path: "/dashboard",
      name: "dash-",
      component: () => import("../components/Dashboard/MainDashboard.vue"),
      children: ROUTES_ADMIN(decodeTOKEN, {
        ADMIN: [
          {
            path: "",
            name: "dash-admin-account",
            component: () => import("../components/Dashboard/admin/AdminAccount.vue"),
          },
          {
            path: "select-encrypt",
            name: "dash-select-encrypt",
            component: () => import("../components/Dashboard/admin/TypeEncrypt.vue")
          },
          {
            path: "admin-resources",
            name: "dash-admin-resources",
            component: () => import("../components/Dashboard/admin/AdminResources.vue")
          },
          {
            path: "modify-profile-admin",
            name: "dash-modify-profile-admin",
            component: () => import("../components/Dashboard/admin/AdminFormModifyProfile.vue")
          }
        ],
        USER: [
          {
            path: "",
            name: "dash-user-resources",
            component: () => import("../components/Dashboard/user/Resources.vue")
          },
          {
            path: "form-resource/add",
            name: "dash-user-form-resource-add",
            component: () => import("../components/Dashboard/user/FormAddOrEditResource.vue")
          },
          {
            path: "form-resource/edit/:id?",
            name: "dash-user-form-resource-edit",
            component: () => import("../components/Dashboard/user/FormAddOrEditResource.vue"),
          },
          {
            path: "form-modify-profile",
            name: "dash-user-form-modify-profile/:id",
            component: import("../components/Dashboard/user/UserFormModifyProfile.vue"),
          }
        ]
      })
    }
  ]
});

router.beforeEach((to: any, from: any) => {
  let isAuth = false;

  if (localStorage.getItem("TOKEN_AUTH")) isAuth = true;
  else isAuth = false;

  if (to.name === undefined) {
    return "/";
  }

  if (to.name.includes("dash-") && !isAuth) return "/";
  if (to.name.includes("auth-") && isAuth) return "/dashboard";
})

export default router
