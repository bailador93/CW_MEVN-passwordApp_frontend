<script lang="ts">
import ButtonApp from '@/components/UI/ButtonApp.vue';
import TitleHead from '@/components/UI/TitleHead.vue';
import LabelInput from '@/components/UI/LabelInput.vue';

import { jwtDecode } from "jwt-decode";
import { mapStores } from 'pinia';
import { userStore } from "../../../stores/user";
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: { TitleHead, LabelInput, ButtonApp },
    computed: { ...mapStores(userStore) },
    data() {
        return { USER: localStorage.getItem("TOKEN_AUTH") ? jwtDecode(localStorage.getItem("TOKEN_AUTH") || "") : "" }
    },
    mounted() { this.userStoreStore.form_data.email = this.USER.email; }
});

</script>

<template>
    <div style="padding:0" class="list_resource_content_user">
        <div class="content_table_data_list">
            <TitleHead :text="'Modificar perfil'" :orientation="'left'" :isUpper="true" />
            <form class="pt-3 pb-3 mb-4" @submit.prevent="userStoreStore.onActionUser('UPDATE_PROFILE_ADMIN')">
                <div class="mb-4">
                    <div style="width:100%; color:black" class="inline-block relative">
                        <LabelInput :text="'E-mail'" :for_name="'email'" style="color:white" />
                        <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="E-mail" v-model="userStoreStore.form_data.email" />
                    </div>
                </div>
                <div class="mb-4">
                    <div style="width:100%; color:black" class="inline-block relative">
                        <LabelInput :text="'Contraseña'" :for_name="'password'" style="color:white" />
                        <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************"
                            v-model="userStoreStore.form_data.password" />
                    </div>
                </div>
                <div class="mb-4">
                    <div style="width:100%; color:black" class="inline-block relative">
                        <LabelInput :text="'Confirmar Contraseña'" :for_name="'confirm_password'" style="color:white" />
                        <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                            id="confirm_password" type="password" placeholder="******************"
                            v-model="userStoreStore.form_data.confirm_password" />
                    </div>
                </div>
                <div>
                    <ButtonApp :text="'Guardar'" :orientation="'center'" :type="'submit'" />
                </div>
            </form>
        </div>
    </div>
</template>