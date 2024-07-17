<script setup>
const props = defineProps({
    title: String,
    category: String,
    content: String,
    url: String,
});

</script>

<template>
    <!-- <f7-card class="bg-cover bg-top mx-0 rounded-b-none"
    :style="`background-image: url(${url})`" >

    <f7-card-content class="pt-52">
        <p>{{props.category}}
        </p>
        <h2 class="font-bold text-2xl text-gray-700 uppercase">{{ props.title }}</h2>
        <p class="pt-4">
            {{ props.content }}
        </p>
    </f7-card-content>
</f7-card> -->

    <f7-card class="relative bg-cover bg-top mx-0 rounded-b-none z-0 group h-98" :style="`background-image: url(${url})`">
        <div class="absolute inset-0 bg-black opacity-30 rounded-t-2xl"></div>
        <f7-card-content class="relative pt-36">
            <p>{{ props.category }}</p>

            <a href="#" class="flex justify-between">
                <h2 class="font-bold text-2xl text-black uppercase">{{ props.title }}</h2>
                <svg class="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 text-black dark:text-white opacity-0 absolute right-5 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                  </svg>
                  
            </a>
            
            <p class="pt-4">{{ props.content }}</p>
        </f7-card-content>
    </f7-card>
</template>