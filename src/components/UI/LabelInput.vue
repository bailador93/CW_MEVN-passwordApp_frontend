<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: ["text", "for_name"],
})
</script>

<template>
    <label class="block input_larabel_custom mb-2" :for="for_name">
        {{ text }}
    </label>
</template>