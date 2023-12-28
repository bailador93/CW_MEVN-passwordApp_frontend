<script lang="ts">
import { defineComponent } from 'vue';
import { MENU_ADMIN, MENU_USER } from "../../assets/data/dataStatic"

import ButtonApp from "../UI/ButtonApp.vue"

export default defineComponent({
    props: ["roleUSER", "route", "isShowMenuClicked", "onshowmenu"],
    components: { ButtonApp },
    data() {
        return {
            nav_admin: MENU_ADMIN,
            nav_user: MENU_USER,
            // isShowMenuClicked: true,
        };
    },
    methods: {
        onShowMenu(ui: any) {
            if (ui) {
                this.$router.push({ path: ui.url })
                // this.isShowMenuClicked = false;
                // this.resetDataToEdit();
            }
            this.$emit('onshowmenu');
            // this.isShowMenuClicked = !this.isShowMenuClicked;
        }
    }
})
</script>

<template>
    <div class="menu_logged_content" :style="{ minHeight: isShowMenuClicked ? 'auto' : '' }">
        <ButtonApp v-if="roleUSER === 'USUARIO'"
            :text="isShowMenuClicked ? 'fa-solid fa-square-caret-left' : 'fa-solid fa-square-caret-down'"
            :orientation="'right'" :type="'button'" :isIcon="true" @onshowmenu="onShowMenu" />
        <!-- @onshowmenu="onShowMenu" <-- este esta en el botón debemos hacer el pase se evento con otro nuevo...-->
        <ul>
            <RouterLink v-if="roleUSER === 'ADMINISTRADOR'" v-for="na in nav_admin" :to="na.url">
                <li
                    :style="{ background: route.path === na.url ? '#042d1c' : '#0a6b42', color: route.path === na.url ? '#B8FADD' : 'black' }">
                    <span class="hide_item_menu_icon"><i :class="na.icon"></i></span> <span class="hide_item_menu">{{
                        na.name }}</span>
                </li>
            </RouterLink>

            <div  class="hide_item_text_only_user">
                <RouterLink v-if="roleUSER === 'USUARIO' && !isShowMenuClicked" v-for="nu in  nav_user " :to="nu.url">
                    <li
                        :style="{ background: route.path === nu.url ? '#042d1c' : '#0a6b42', color: route.path === nu.url ? '#B8FADD' : 'black' }">
                        {{ nu.name }}
                    </li>
                </RouterLink>
            </div>



            <div class="show_icons_only_user">
                <RouterLink class="show_icons_only_user" v-if="roleUSER === 'USUARIO'" v-for="nu in  nav_user "
                    :to="nu.url">
                    <li
                        :style="{ background: route.path === nu.url ? '#042d1c' : '#0a6b42', color: route.path === nu.url ? '#B8FADD' : 'black' }">
                        <span class="hide_item_menu_icon"><i :class="nu.icon"></i></span> <span class="hide_item_menu">{{
                            nu.name }}</span>
                    </li>
                </RouterLink>
            </div>

        </ul>
    </div>
</template>
 