<script setup>
const props = defineProps({
    modelValue: {
        type: [String],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emits('update:modelValue', value)
};
</script>

<template>
    <div class="space-y-2 mb-4">
        <span class="text-base text-gray-700 font-medium">{{ label }}</span>
        <input :type="type"
            class="w-full text-base border border-gray-400 p-4 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in"
            :value="modelValue" @input="updateValue($event.target.value)" />
    </div>
</template>