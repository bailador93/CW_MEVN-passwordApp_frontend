
<script lang="ts">
import { RouterView } from 'vue-router'
import SlotApp from "../SlotApp.vue"
import { defineComponent } from 'vue';

export default defineComponent({
    props: [],
    components: {
        SlotApp
    }
});

</script>

<template>
    <div class="flex flex-row app_main_content">
        <SlotApp v-slot:LAYOUT_APP_CONTENT>
            <div class="basis-2/5 app_main_side_left_content">
                <SlotApp v-slot:LAYOUT_APP_SIDE_LEFT>
                </SlotApp>
            </div>

            <div class="basis-3/5 app_main_side_right_content">
                <SlotApp v-slot:LAYOUT_APP_SIDE_RIGHT>
                    <RouterView />
                </SlotApp>
            </div>
        </SlotApp>
    </div>
</template>