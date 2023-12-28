<script  lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent } from 'vue';
import { ROLE, PUBLIC_PATH, ADMIN_PATH, USER_PATH } from "./assets/data/dataStatic";

import Login from './components/Auth/Login.vue';
import SlotApp from '@/components/SlotApp.vue'
import Register from './components/Auth/Register.vue';
import Recovery from './components/Auth/Recovery.vue';
import ListData from './components/Admin/ListData.vue';
import DashMenu from "./components/Dashboard/DashMenu.vue"
import TitleHead from "./components/UI/TitleHead.vue"
import ButtonApp from "./components/UI/ButtonApp.vue"
import MenuLogged from "./components/UI/MenuLogged.vue"
import ModifyProfileAdmin from './components/Admin/ModifyProfileAdmin.vue';
import AddOrEditUser from './components/Admin/AddOrEditUser.vue';
import ModifyProfileUser from './components/Admin/ModifyProfileUser.vue';


export default defineComponent({
  props: [],
  components: {
    SlotApp, TitleHead, Login, Register, Recovery, DashMenu,
    ButtonApp, MenuLogged, ListData, ModifyProfileAdmin, AddOrEditUser,
    ModifyProfileUser
  },
  data() {
    return {
      route: useRoute(),
      dataToEdit: {},
      userIsLogged: localStorage.getItem("TOKEN_AUTH") || "false",
      decisionTaken: localStorage.getItem("DECISION_TAKEN") || "PUBLICO",
      role_user: ROLE,
      route_public: PUBLIC_PATH,
      route_admin: ADMIN_PATH,
      route_user: USER_PATH,
      isShowMenuClicked: true,
      textFormToEdit: ""
    };
  },
  mounted() {
    const getPATHname = window.location.pathname;
    if (this.decisionTaken === ROLE[0]) {
      if (!PUBLIC_PATH.includes(getPATHname)) {
        this.$router.push("/")
      }
    } else if (this.decisionTaken === ROLE[1]) {
      if (!ADMIN_PATH.includes(getPATHname)) {
        this.$router.push("/admin")
      }
    } else if (this.decisionTaken === ROLE[2]) {
      if (!USER_PATH.includes(getPATHname)) {
        this.$router.push("/admin/user")
      }
    }
  },
  methods: {
    onAccessHowTo(decision: string) {
      if (decision === ROLE[0]) {
        this.userIsLogged = "false";
        localStorage.setItem("TOKEN_AUTH", "false");
      } else if (decision === ROLE[1] || decision === ROLE[2]) {
        this.userIsLogged = "true";
        localStorage.setItem("TOKEN_AUTH", "true");
      }
      this.decisionTaken = decision;
      localStorage.setItem("DECISION_TAKEN", decision);
    },
    onGetDataToEdit(object: any) {
      if (!["/admin/user/user-entries", "/admin/user/generate-new-password"].includes(this.route.path)) {
        return;
      }
      // console.log(object);
      this.dataToEdit = { ejemplo: object };
      this.textFormToEdit = "EDITAR";
      this.$emit('ongetdatatoedit');
    },
    resetDataToEdit() {
      this.dataToEdit = {};
    },
    onShowMenu(ui: any) {
      console.log("holsd")
      if (ui) {
        this.$router.push({ path: ui.url })
        this.isShowMenuClicked = false;
        // this.resetDataToEdit();
      }
      this.$emit('onshowmenu');
      this.isShowMenuClicked = !this.isShowMenuClicked;
    },
    onShowFormAddUser(ui: any) {
      console.log("holssssssssssssssssssssssssssssssssssssss")
      this.dataToEdit = {};
      this.textFormToEdit = "AGREGAR";
      this.$emit('onshowformadduser');
    }
  }
})
</script>
 
<template>
  <!--ELIMINAR LUEGO - SOLO PARA VISUALIZAR-->
  <div style="width:100%; background-color: gray;">
    <div>
      Preview componentes: {{ decisionTaken }}
    </div>
    <div style="background-color: black; text-align: center;">
      <div class="inline-flex">
        <RouterLink to="/">
          <button class="bg-red-300 hover:bg-gray-400 text-gray-800 font-bold  py-2 px-4 "
            @click="onAccessHowTo('PUBLICO')">
            Público
          </button>
        </RouterLink>

        <RouterLink to="/admin">
          <button class="bg-blue-300 hover:bg-gray-400 text-gray-800 font-bold  py-2 px-4 "
            @click="onAccessHowTo('ADMINISTRADOR')">
            Acceder como Administrador
          </button>
        </RouterLink>

        <RouterLink to="/admin/user">
          <button class="bg-green-300 hover:bg-gray-400 text-gray-800 font-bold  py-2 px-4 "
            @click="onAccessHowTo('USUARIO')">
            Acceder como Usuario
          </button>
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <SlotApp v-slot:LAYOUT_APP_CONTENT>
      <div
        :class="route_public.includes(route.path) ? 'slot_content_app_left_hide basis-4/12 slot_content_app_left' : 'basis-4/12 slot_content_app_left scaleft_p0'"
        :style="{ padding: !route_public.includes(route.path) ? '5%' : '0' }">

        <div class="app_content_side_left">
          <SlotApp v-slot:LAYOUT_APP_SIDE_LEFT>
            <div class="img_bg_auth hide_auth_only_img"
              v-if="decisionTaken === role_user[0] && route_public.includes(route.path) && userIsLogged === 'false'">
            </div>

            <div v-if="decisionTaken === role_user[1] && route_admin.includes(route.path) && userIsLogged === 'true'">

              <div class="hide_title_welcome" style="marginTop:14%;margin-bottom: 5%;">
                <TitleHead :text="'Administrador'" :orientation="'center'" :isUpper="true" />
              </div>

              <div class="content_left_logged">
                <MenuLogged :roleUSER="role_user[1]" :route="route" />
              </div>
            </div>

            <div v-if="decisionTaken === role_user[2] && route_user.includes(route.path) && userIsLogged === 'true'">
              <div class="hide_title_welcome" style="marginTop:14%; margin-bottom: 5%;">
                <TitleHead :text="'Hola Michelle'" :orientation="'center'" :isUpper="true" />
              </div>

              <div class="content_left_logged">
                <MenuLogged :roleUSER="role_user[2]" :route="route" :isShowMenuClicked="isShowMenuClicked"
                  @onshowmenu="onShowMenu" />

                <div class="content_data_user" v-if="isShowMenuClicked">
                  <ListData v-if="'/admin/user/user-entries'" :section="'USER-ENTRIES'" :withSelect="false"
                    @ongetdatatoedit="onGetDataToEdit" @onshowformadduser="onShowFormAddUser" />
                </div>
              </div>
            </div>
          </SlotApp>
        </div>
      </div>

      <div
        :class="route_admin.includes(route.path) ? 'basis-8/12 slot_content_app_right SCAR_admin' : 'basis-8/12 slot_content_app_right'">
        <div class="app_content_side_right">
          <SlotApp v-slot:LAYOUT_APP_SIDE_RIGHT>
            <div v-if="decisionTaken === role_user[0] && route_public.includes(route.path) && userIsLogged === 'false'">
              <div v-if="route.path === '/'" style="margin-bottom: 3%;">
                <TitleHead :text="'Bienvenido'" :orientation="'center'" :isUpper="true" />
              </div>
              <div v-if="route.path === '/register'" style="margin-bottom: 3%;">
                <TitleHead :text="'Registrarse'" :orientation="'left'" />
              </div>
              <div v-if="route.path === '/recovery'" style="margin-bottom: 3%;">
                <TitleHead :text="'Recuperar cuenta'" :orientation="'center'" />
              </div>
              <Login v-if="route.path === '/'" />
              <Register v-if="route.path === '/register'" />
              <Recovery v-if="route.path === '/recovery'" />
            </div>

            <div v-if="decisionTaken === role_user[1] && route_admin.includes(route.path) && userIsLogged === 'true'">

              <div class="show_title_welcome">
                <TitleHead :text="'Administrador'" :orientation="'center'" :isUpper="true" />
              </div>

              <ButtonApp :text="'Cerrar sesión'" :orientation="'right'" :type="'button'" />
              <div class="content_right_logged"
                :style="{ height: route.path === '/admin/modify-profile-admin' ? '70vh' : '65vh' }">
                <div v-if="route.path !== '/admin'">
                  <div v-if="route.path === '/admin/admin-accounts'">
                    <ListData :section="'ADMIN-ACCOUNTS'" />
                  </div>

                  <div v-if="route.path === '/admin/select-encrypt'">
                    <ListData :section="'SELECT-ENCRYPT'" />
                  </div>

                  <div v-if="route.path === '/admin/admin-resources'">
                    <ListData :section="'ADMIN-RESOURCES'" />
                  </div>

                  <div v-if="route.path === '/admin/modify-profile-admin'">
                    <ModifyProfileAdmin />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="decisionTaken === role_user[2] && route_user.includes(route.path) && userIsLogged === 'true'">

              <ButtonApp :text="'Cerrar sesión'" :orientation="'right'" :type="'button'" />

              <div class="show_title_welcome" style="margin-bottom: 5%;">
                <TitleHead :text="'Hola Michelle'" :orientation="'center'" :isUpper="true" />
              </div>

              <div v-if="route.path == '/admin/user'">
                <div class="show_list_horizontal_responsive_user">
                  <div v-for="i in 20" class="data_item">
                    Recursos...
                  </div>
                </div>
              </div>

              <div class="content_right_logged">
                <div v-if="route.path !== '/admin/user'">

                  <AddOrEditUser :dataToEdit="dataToEdit" :textFormToEdit="textFormToEdit"
                    v-if="route.path === '/admin/user/user-entries' && (textFormToEdit === 'AGREGAR' || textFormToEdit === 'EDITAR')" />

                  <ModifyProfileUser v-if="route.path === '/admin/user/modify-profile-user'" />

                  <div v-if="route.path === '/admin/user/generate-new-password'">
                    GENERAR NUEVA CONTRASEÑA
                  </div>
                </div>
              </div>
            </div>
          </SlotApp>
        </div>
      </div>
    </SlotApp>
  </div>
</template>
