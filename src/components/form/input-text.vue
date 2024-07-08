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
    placeholder: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emits('update:modelValue', value)
};
</script>

<template>
    <div class="space-y-2 mb-4">
        <span class="text-base text-gray-700 font-medium">{{ label }}</span>
        <input
            class="w-full text-base border border-gray-400 p-4 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in"
            :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)" />
    </div>
</template>