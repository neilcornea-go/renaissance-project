<script setup>
import { f7 } from 'framework7-vue';
import { onMounted, ref } from 'vue';

const currentPath = ref('');

const backButton = () => {
    f7.views.main.router.back({ animate: false });
};

onMounted(() => {
  currentPath.value = f7.views.main.router.currentRoute.path;

  f7.views.main.router.on('routeChange', (route) => {
    currentPath.value = route.path;
  });
});
</script>

<template>
    <header class="bg-[#d31145]">
        <nav class="max-w-screen-lg mx-auto py-6 px-6">
            <div class="flex items-center gap-4">
                <svg @click="backButton" v-show="currentPath !== '/step-1'" class="w-[36px] h-[36px] text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
                <p class="text-white text-2xl font-bold">Policy Details</p>
            </div>
        </nav>
    </header>
</template>