<script lang="ts">
import { defineComponent } from 'vue';
import { MENU_ADMIN, MENU_USER } from "../../assets/data/dataStatic"
import { mapStores } from 'pinia';
import { userResourceStore } from "../../stores/userResource";
import ButtonApp from "../UI/ButtonApp.vue"

export default defineComponent({
    props: ["decodeTOKEN", "route", "isShowMenuClicked", "onshowmenu", "onshowformadduser"],
    components: { ButtonApp },
    data() {
        return { nav_admin: MENU_ADMIN, nav_user: MENU_USER };
    },
    computed: { ...mapStores(userResourceStore) },
    mounted() {
        if(this.isShowMenuClicked){
            this.userResourceStore.onActionUserResource("GET_USER_RESOURCES");
        }
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
        }
    },
})
</script>

<template>
    <div class="menu_logged_content">
        <div :style="{ minHeight: isShowMenuClicked ? 'auto' : '' }">
            <ButtonApp v-if="decodeTOKEN.role === 'USUARIO'"
                :text="isShowMenuClicked ? 'fa-solid fa-square-caret-down' : 'fa-solid fa-square-caret-left'"
                :orientation="'right'" :type="'button'" :isIcon="true" @onshowmenu="onShowMenu" />
        </div>

        <ul v-if="decodeTOKEN.role === 'ADMINISTRADOR'">
            <RouterLink v-for="na in nav_admin" :to="{ name: na.url }">
                <li>{{ na.name }}</li>
            </RouterLink>
        </ul>

        <ul v-if="isShowMenuClicked && decodeTOKEN.role === 'USUARIO'">
            <RouterLink v-for="nu in nav_user" :to="{ name: nu.url }">
                <li> {{ nu.name }}</li>
            </RouterLink>
        </ul>
        <div class="list_resource_content_user" v-if="!isShowMenuClicked && decodeTOKEN.role === 'USUARIO' && (
            route.name === 'dash-user-resources' || route.name === 'dash-user-form-resource-add' ||
            route.name === 'dash-user-form-resource-edit'
        )">
            <RouterLink v-for="i in userResourceStore.DATA_RESPONSE_API.response.data" :to="{ name: 'dash-user-form-resource-edit', params: { id: i._id } }"
            @click="userResourceStore.onActionUserResource('GET_USER_RESOURCE_ID_TO_EDIT', i._id)">
                <div class="item_resource">
                    <div>
                        {{i.resource?.Nombre}}
                    </div>
                </div>
            </RouterLink>
            <div class="btn_float_resource">
                <ButtonApp :text="'Nuevo recurso'" :orientation="'center'" :type="'button'"
                    @click="$emit('onshowformadduser')" />
            </div>
        </div>
    </div>
</template>
 