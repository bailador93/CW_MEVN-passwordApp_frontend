<script lang="ts">
import TitleHead from '../../UI/TitleHead.vue';
import ButtonApp from '../../UI/ButtonApp.vue';
import LabelInput from '../../UI/LabelInput.vue';

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { userResourceStore } from "../../../stores/userResource";
import { adminResourceStore } from "../../../stores/adminResource";
import { DATA_TYPE_RESOURCE_DEFAULT } from "../../../assets/data/dataStatic";

export default defineComponent({
    props: [],
    components: { TitleHead, LabelInput, ButtonApp },
    data() {
        return { DATA_TYPE: DATA_TYPE_RESOURCE_DEFAULT, isPassVisible: [], object: {} }
    },
    computed: { ...mapStores(adminResourceStore), ...mapStores(userResourceStore) },
    mounted() {
        this.adminResourceStore.onActionAminResource("GET_ADMIN_RESOURCES");
    }, 
    updated(){
        if(this.$route.params.id ){
            this.adminResourceStore.onActionAminResource("GET_USER_RESOURCE_ID_TO_EDIT");
        }
    },
    methods: {
        onShowPasswordAndHidde(index: number) {
            this.isPassVisible[index] = !this.isPassVisible[index]
        },
        catchInputValues(_id: any, field_model: any, { target }: any) {
            if (target.name === field_model) {
                this.object.resource_admin_id = _id;
                this.object = {
                    ...this.object,
                    resource_selected: DATA_TYPE_RESOURCE_DEFAULT.RESOURCES_DEFAULT[_id],
                    [target.name]: target.value
                }
            }
            this.userResourceStore.form_data = this.object;
        }
    }
});

</script>

<template>
    <TitleHead :text="$route.params.id ? 'Editar recurso' : 'Crear recurso'" :orientation="'left'" :isUpper="false" />
    {{ userResourceStore.select_type }}
    <div class="content_form">
        <form class="px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <LabelInput :text="'Tipo'" :for_name="'type'" />
                <div style="width:100%; color:black" class="inline-block relative">
                    <select v-model="userResourceStore.select_type"
                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="t in DATA_TYPE.RESOURCES_DEFAULT" :key="t" :value="t">{{ t }}</option>
                        <option v-if="!adminResourceStore.DATA_RESPONSE_API.isLoading"
                            v-for="r in adminResourceStore.DATA_RESPONSE_API.response.data" :key="r._id" :value="r._id">{{
                                r.name_type }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div v-if="userResourceStore.select_type === DATA_TYPE.RESOURCES_DEFAULT[0]">
                <div class="mb-4" v-for="(t, index) in DATA_TYPE.TYPE_PASSWORD">

                    <LabelInput :text="t.name_input" :for_name="t.name_input" />
                    <div v-if="t.type_input === 'password'">
                        <InputGroup class="" style="width: 100%; background-color: red;">
                            <InputText :type="isPassVisible[index] ? 'password' : 'text'" :placeholder="t.name_input"
                                :id="t.name_input" v-on:keyup="(event) => catchInputValues(0, t.field_model, event)"
                                :name="t.field_model" />
                            <InputGroupAddon style="background:red" @click="onShowPasswordAndHidde(index)">
                                <i :class="[isPassVisible[index] ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash']"
                                    style="color:black; font-size:1.3em"></i>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <input v-else class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        :id="t.name_input" :type="t.type_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(0, t.field_model, event)" :name="t.field_model">
                </div>
            </div>

            <div v-if="userResourceStore.select_type === DATA_TYPE.RESOURCES_DEFAULT[1]">
                <div class="mb-4" v-for="t in DATA_TYPE.TYPE_CARD">
                    <LabelInput :text="t.name_input" :for_name="t.name_input" />
                    <input class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        :id="t.name_input" :type="t.type_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(1, t.field_model, event)" :name="t.field_model">
                </div>
            </div>

            <div v-if="userResourceStore.select_type === DATA_TYPE.RESOURCES_DEFAULT[2]">
                <div class="mb-4" v-for="t in DATA_TYPE.NOTE">
                    <LabelInput :text="t.name_input" :for_name="t.name_input" />
                    <textarea v-if="t.type_input === 'textarea'"
                        class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        style="height: 150px; resize: none;" :id="t.name_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(2, t.field_model, event)" :name="t.field_model"></textarea>
                    <input v-else class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        :id="t.name_input" :type="t.type_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(2, t.field_model, event)" :name="t.field_model">
                </div>
            </div>

            <div v-if="userResourceStore.select_type === DATA_TYPE.RESOURCES_DEFAULT[2]">
                <div class="mb-4" v-for="t in DATA_TYPE.NOTE">
                    <LabelInput :text="t.name_input" :for_name="t.name_input" />
                    <textarea v-if="t.type_input === 'textarea'"
                        class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        style="height: 150px; resize: none;" :id="t.name_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(2, t.field_model, event)" :name="t.field_model"></textarea>
                    <input v-else class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                        :id="t.name_input" :type="t.type_input" :placeholder="'Ingresa ' + t.name_input"
                        v-on:keyup="(event) => catchInputValues(2, t.field_model, event)" :name="t.field_model">
                </div>
            </div>

            <div v-for="d in adminResourceStore.DATA_RESPONSE_API.response.data">
                <div v-if="d._id === userResourceStore.select_type && d.fields.length > 0">
                    <div class="mb-4" v-for="t in d.fields">
                        <LabelInput :text="t.name_field" :for_name="t.name_input" />
                        <textarea v-if="t.type_field === 'textarea'"
                            class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                            style="height: 150px; resize: none;" :id="t.name_field" :placeholder="'Ingresa ' + t.name_field"
                            v-on:keyup="(event) => catchInputValues(d._id, t.field_model, event)"
                            :name="t.field_model"></textarea>
                        <input v-else class="auth_form_inputs  w-full leading-tight focus:outline-none focus:shadow-outline"
                            :id="t.name_field" :type="t.type_field" :placeholder="'Ingresa ' + t.name_field"
                            v-on:keyup="(event) => catchInputValues(d._id, t.name_field, event)" :name="t.name_field">
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <ButtonApp :text="$route.params.id ? 'Editar' : 'Guardar'" :orientation="'left'" :type="'button'" 
                @click.prevent="userResourceStore.onActionUserResource($route.params.id ? 'UPDATE_USER_RESOURCE' : 'CREATE_USER_RESOURCE')"/>
                <ButtonApp v-if="$route.params.id" :text="$route.params.id ? 'Borrar' : ''" :orientation="'left'"
                    :type="'button'" @click="userResourceStore.onActionUserResource($route.params.id ? 'DELETE_USER_RESOURCE' : '')"/>
            </div>
        </form>
    </div>
</template>