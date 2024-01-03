
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["text", "orientation", "type", "isIcon", "onshowmenu", "onbtnlogout"]
})
</script>
<template>
    <div :style="{ textAlign: orientation, marginBottom: '3%' }">
        <button class="btn_custom_action py-1 px-4 rounded " :type="type"
            @click="text === 'Cerrar sesión' ? $emit('onbtnlogout') : $emit('onshowmenu')">
            <i :class="text" v-if="isIcon"></i>
            <span v-else>
                {{ text }}
            </span>
        </button>
    </div>
</template>