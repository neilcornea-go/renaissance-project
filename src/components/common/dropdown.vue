<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    data: {
        type: Array,
        required: true
    }
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emits('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="relative mb-4">
        <span class="absolute right-3 top-[50%]">
            <svg class="w-[34px] h-[34px] text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="m8 10 4 4 4-4" />
            </svg>
        </span>
        <div class="space-y-2">
            <span class="text-base text-gray-700 font-medium">{{ label }}</span>
            <select
                class="w-full text-base border border-gray-400 p-4 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in"
                :value="modelValue" @change="updateValue">
                <option v-for="item in data" :key="item.id" :value="item.option">{{ item.option ? item.option : item }}</option>
            </select>
        </div>
    </div>
</template>
