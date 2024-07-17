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
    },
    currency: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: '',
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emits('update:modelValue', value)
};
</script>

<template>
    <div v-if="!currency" class="space-y-2 mb-4">
        <span class="text-base text-gray-700 font-medium">{{ label }}</span>
        <input type="text" :disabled="disabled" :style="disabled ? 'background-color: #F3F4F6;' : error ? 'border: 1px solid #EF4444;' : ''"
            :class="error ? 'focus:border-red-500 focus:ring-1 ring-red-500 focus:bg-[#FAE8E8]' : 'focus:border-[#1f78ad] focus:ring-1 ring-[#1f78ad] focus:bg-[#F2F7FA]'"
            class="w-full text-base border p-4 rounded text-gray-600 outline-none duration-75 transition ease-in"
            :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)" />
        <p v-show="error" class="text-red-500">
            {{ error }}
        </p>    
    </div>

    <!-- Currency Input -->
    <div v-else class="space-y-2 mb-4">
        <!-- Currency Sign -->
        <span class="text-base text-gray-700 font-medium">{{ label }}</span>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-500 text-base">{{ currency }}</span>
            </div>
            <input type="text" style="padding-left: 3.5rem !important;"
                class="w-full text-base border border-gray-400 pl-14 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in"
                :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)" />
        </div>
    </div>
</template>