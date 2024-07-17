<script setup>
import Header from './header.vue';

const props = defineProps({
    fullWidth: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
    <!-- Global Layout -->
    <f7-page name="renaissance" class="bg-white">
        <!-- Header -->
        <Header />
        <!-- Main -->
        <main :class="fullWidth ? 'w-full' : 'max-w-screen-lg mx-auto py-6 px-6'">
            <slot />
        </main>
    </f7-page>
</template>