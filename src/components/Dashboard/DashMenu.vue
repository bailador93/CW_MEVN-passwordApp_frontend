
<script lang="ts" >
import { defineComponent } from 'vue';
import ButtonApp from '../UI/ButtonApp.vue';

export default defineComponent({
    props: ["role", "route", "ongetdatatoedit", "resetDataToEdit"],
    components: {
        ButtonApp
    },
    data() {
        return {
            isShowMenuClicked: true,
            ADMIN_ITEMS: [
                {
                    url: "/admin/admin-accounts",
                    name: "Administrar cuentas"
                },
                {
                    url: "/admin/select-encrypt",
                    name: "Seleccionar tipo de encriptación"
                },
                {
                    url: "/admin/admin-resources",
                    name: "Administrar los recursos"
                },
                {
                    url: "/admin/modify-profile-admin",
                    name: "Modificar perfil del administrador"
                },
            ],
            USER_ITEMS: [
                {
                    url: "/user/user-entries",
                    name: "Entrada de usuarios"
                },
                {
                    url: "/user/modify-profile-user",
                    name: "Modificar perfil del usuario"
                },
                {
                    url: "/user/generate-new-password",
                    name: "Generar nueva contraseña"
                }
            ],
            RESOURCE: ["Recurso A", "Recurso B", "Recurso C", "Recurso D", "Recurso E", "Recurso F", "Recurso G"]
        };
    },
    methods: {
        onShowMenu(ui: any) {
            if (ui) {
                this.$router.push({ path: ui.url })
                this.isShowMenuClicked = false;
                this.resetDataToEdit();
            }
            this.$emit('onshowmenu');
            this.isShowMenuClicked = !this.isShowMenuClicked;
        }
    }
})
</script>

<template>

    <div>
        <button>Acceder como Administrador</button>
        <button>Acceder como Usuario</button>
    </div>



    <!-- <div class="dash_menuItems_content">
        <p class="head_title_homeApp">
            {{ role[0] === "ADMINISTRADOR" ? "Administrador" : "HOLA Gastón" }}
        </p>

        <ButtonApp :text="isShowMenuClicked ? 'fa-solid fa-square-caret-left' : 'fa-solid fa-square-caret-down'"
            :orientation="'right'" :type="'button'" :isIcon="true" @onshowmenu="onShowMenu" />
        <ul>
            <li v-for="ui in USER_ITEMS" :key="ui.name" v-if="role[0] !== 'ADMINISTRADOR' && !isShowMenuClicked"
                @click="() => onShowMenu(ui)">
                <RouterLink :to="ui.url">
                    {{ ui.name }}
                </RouterLink>
            </li>
            <div v-else>
                <div v-if="route.path === '/user/user-entries'">

                    <li v-for="r in RESOURCE" :key="r" style="font-weight: normal; text-align: center;
            background-color: #108554;" @click="$emit('ongetdatatoedit', r)">
                        {{ r }}
                    </li>

                    <ButtonApp :text="'Agregar Entrada'" :orientation="'center'" :type="'button'" />
                </div>

                <div v-else-if="route.path === '/user/modify-profile-user'">
                    MODIFICAR PERFIL DE USUARIO
                </div>
                <div v-else-if="route.path === '/user/generate-new-password'">
                    GENERAR NUEVA CONTRASEÑA
                </div>
            </div>

            <li v-for="ai in ADMIN_ITEMS" :key="ai.name" v-if="role === 'ADMINISTRATOR'">
                <RouterLink :to="ai.url">
                    {{ ai.name }}
                </RouterLink>
            </li>
        </ul>
    </div> -->
</template>