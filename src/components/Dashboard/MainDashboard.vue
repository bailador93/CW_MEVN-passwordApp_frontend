
<script lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SlotApp from "../SlotApp.vue"
import { defineComponent } from 'vue';
import TitleHead from "../UI/TitleHead.vue";
import ButtonApp from "../UI/ButtonApp.vue";
import MenuLogged from "../UI/MenuLogged.vue";
import { connectAPI } from "../../Helpers/connectAPI";
import { jwtDecode } from "jwt-decode";

export default defineComponent({
    props: [],
    components: {
        SlotApp, TitleHead, ButtonApp, MenuLogged
    },
    data() {
        return {
            decodeTOKEN: jwtDecode(localStorage.getItem("TOKEN_AUTH")),
            isShowMenuClicked: false,
            route: useRoute(),
        }
    },
    created() {
        this.$watch(
            () => this.$route.name,
            (toParams, previousParams) => {
                this.isShowMenuClicked = false;
            }
        )
    },
    methods: {
        onShowMenu(ui: any) {
            if (ui) {
                this.$router.push({ path: ui.url })
                // this.isShowMenuClicked = true;
                // this.resetDataToEdit();
            }
            this.$emit('onshowmenu');
            this.isShowMenuClicked = !this.isShowMenuClicked;
        },
        onShowFormAddUser(ui: any) {
            // this.dataToEdit = {};
            // this.textFormToEdit = "AGREGAR";
            this.$emit('onshowformadduser');
            this.$router.push({ name: "dash-user-form-resource-add" })
        },
        onBtnLogout(a: any) {
            this.$emit('onbtnlogout');
            localStorage.removeItem("TOKEN_AUTH");
            this.$router.replace("/");
        }
    }
});

</script>

<template>
    <div class="flex flex-row app_main_content">
        <SlotApp v-slot:LAYOUT_APP_CONTENT>
            <div class="basis-2/5 app_main_side_left_content_admin">

                <TitleHead :text="decodeTOKEN.role === 'ADMINISTRADOR' ? 'Administrador' : 'Hola ' + decodeTOKEN.name"
                    :orientation="'center'" :isUpper="true" />

                <SlotApp v-slot:LAYOUT_APP_SIDE_LEFT>
                    <div class="content_menu">
                        <MenuLogged :decodeTOKEN="decodeTOKEN" :route="route" :isShowMenuClicked="isShowMenuClicked"
                            @onshowmenu="onShowMenu" @onshowformadduser="onShowFormAddUser" />
                    </div>
                </SlotApp>
            </div>

            <div class="basis-3/5 app_main_side_right_content">
                <ButtonApp :text="'Cerrar sesión'" :orientation="'right'" @onbtnlogout="onBtnLogout" />
                <SlotApp v-slot:LAYOUT_APP_SIDE_RIGHT>
                    <div class="content_section">
                        <div class="section">
                            <RouterView />
                        </div>
                    </div>
                </SlotApp>
            </div>
        </SlotApp>
    </div>
</template>