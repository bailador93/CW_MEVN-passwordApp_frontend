
<script lang="ts">
import { defineComponent } from 'vue';
import AdminAccounts from "./menuComponents/AdminAccounts.vue"
import SelectTypeEncrypt from "./menuComponents/SelectTypeEncrypt.vue"
import AdminResources from "./menuComponents/AdminResources.vue"
import ModifyProfileAdmin from "./menuComponents/ModifyProfileAdmin.vue"
import ButtonApp from "../UI/ButtonApp.vue"

export default defineComponent({
    props: ["ADMIN_PATH", "route"],
    name: "ContentMenuSelected",
    components: {
        AdminAccounts,
        SelectTypeEncrypt,
        AdminResources,
        ModifyProfileAdmin,
        ButtonApp
    }
})

</script>

<template>

    <ButtonApp :text="'Cerrar sesión'" :orientation="'right'" :type="'button'"/>

    <div class="content_menu_selected">

        <div v-if="ADMIN_PATH[1] === route.path">
            <AdminAccounts />
        </div>

        <div v-if="ADMIN_PATH[2] === route.path">
            <SelectTypeEncrypt />
        </div>

        <div v-if="ADMIN_PATH[3] === route.path">
            <AdminResources />
        </div>

        <div v-if="ADMIN_PATH[4] === route.path">
            <ModifyProfileAdmin />
        </div>
    </div>
</template>

<style>
.content_menu_selected {
    background-color: #B8FADD;
    padding: 2%;
    height: 70vh;
    border-radius: 15px;
}
</style>