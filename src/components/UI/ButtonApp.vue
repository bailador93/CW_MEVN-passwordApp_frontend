
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["text", "orientation", "type", "isIcon", "onshowmenu", "onbtnlogout", "onopenmodalactionresource"]
})
</script>
<template>
    <div :style="{ textAlign: orientation, marginBottom: '3%' }">
        <button class="btn_custom_action py-1 px-4 rounded " :type="type" @click="$emit(text === 'Cerrar sesión' && 'onbtnlogout' ||
            text.includes('fa-solid fa-square-caret') && 'onshowmenu' ||
            text.includes('fa-solid fa-plus') && 'onopenmodalactionresource' || 'un pequeño parche para tapar el error que tira el emisor de evento')">
            <i :class="text" v-if="isIcon"></i>
            <span v-else>
                {{ text }}
            </span>
        </button>
    </div>
</template>