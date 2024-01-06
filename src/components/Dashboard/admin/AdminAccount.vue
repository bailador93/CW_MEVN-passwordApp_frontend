<script lang="ts">
import { userStore } from "../../../stores/user";
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: {
    },
    computed: {
        ...mapStores(userStore)
    },
    data(){
        return{isRefresh: false}
    },
    mounted() {
        this.userStoreStore.onActionUser("GET_USERS");
    },
    updated() {
        if(!this.userStoreStore.useIsRefresh){
            setTimeout(()=>{
                this.userStoreStore.onActionUser("GET_USERS");
            },500);
        }
    }
});

</script>

<template>
    <span  style="color:transparent">{{userStoreStore.useIsRefresh}}</span>
    <div v-if="userStoreStore.DATA_RESPONSE_API.isLoading">
        CARGANDO...
    </div>
    <div v-else style="padding:0" class="list_resource_content_user">
        <div class="content_table_data_list">
            <table>
                <tr>
                    <th class="center">Nombre y Apellido</th>
                    <th class="center">Estado</th>
                    <th class="center">Acción</th>
                </tr>
                <tr v-for="r in userStoreStore.DATA_RESPONSE_API.response.data">
                    <td>
                        {{ r.name + " " + r.lastname }}
                    </td>
                    <td class="center">
                        {{ r.userIsActiveByAdmin ? "Activo" : "Inactivo" }}
                    </td>
                    <td class="center">
                        <button type="button" @click="userStoreStore.onActionUser('UPDATE_USER', r._id, !r.userIsActiveByAdmin)"
                            :class="['btn_action_custom', r.userIsActiveByAdmin ? 'btn_unlock_user' : 'btn_lock_user']">
                            <i :class="r.userIsActiveByAdmin ? 'fa-solid fa-lock-open' : 'fa-solid fa-lock'"
                                :style="{ color: r.userIsActiveByAdmin ? 'rgb(217, 247, 165)' : 'rgb(247, 165, 165)', marginRight: '5%' }"></i>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>