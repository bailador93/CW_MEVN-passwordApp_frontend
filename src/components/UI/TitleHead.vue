<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ["text", "orientation", "isUpper"]
})

</script>

<template>
    <div
        :style="{ marginBottom: '2%', fontWeight: 'bold', fontSize: '1.5em', textAlign: orientation, textTransform: isUpper ? 'uppercase' : 'none' }">
        {{ text }}
    </div>
</template>

<style></style>