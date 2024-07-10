<script setup>
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
});
</script>

<template>
    <div class="flex items-center gap-6 border border-gray-400 p-4 rounded-lg">
        <div class="bg-gray-200 p-4 rounded-full">
            <!-- Need to add dynamic icons based on the claims type -->
            <svg class="w-[24px] h-[24px] text-[#be003b]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                    d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
            </svg>
        </div>

        <div class="space-y-1">
            <p class="font-normal text-base text-gray-500">You're claiming for</p>
            <h3 class="font-bold text-gray-700 text-2xl uppercase">{{ type }}</h3>
        </div>
    </div>
</template>