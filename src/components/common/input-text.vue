<script setup>
import { ref, computed } from 'vue';

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
    masked: {
        type: Boolean,
        default: false,
    }
});
const isHide = ref(false);

const maskedValue = computed(() => {
    if (isHide.value) return props.modelValue;
    const masked = props.modelValue.slice(0, -4).replace(/./g, '*');
    return masked + props.modelValue.slice(-4);
});

const isHideToggle = () => {
    isHide.value = !isHide.value;
};

const emits = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emits('update:modelValue', value)
};

const updateBankValue = (value) => {
    emits('update:modelValue', value)
};
</script>

<template>
    <div v-if="!currency" class="mb-4">
        <div v-if="!masked" class="space-y-2">
            <span class="text-base text-gray-700 font-medium">{{ label }}</span>
            <input type="text" :disabled="disabled"
                :style="disabled ? 'background-color: #F3F4F6;' : error ? 'border: 1px solid #EF4444;' : ''"
                :class="error ? 'focus:border-red-500 focus:ring-1 ring-red-500 focus:bg-[#FAE8E8]' : 'focus:border-[#1f78ad] focus:ring-1 ring-[#1f78ad] focus:bg-[#F2F7FA]'"
                class="w-full text-base border p-4 rounded text-gray-600 outline-none duration-75 transition ease-in"
                :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)" />
            <p v-show="error" class="text-red-500">
                {{ error }}
            </p>
        </div>

        <div v-else class="space-y-2 relative">
            <span class="text-base text-gray-700 font-medium">{{ props.label }}</span>
            <input type="text" :disabled="props.disabled"
                :style="props.disabled ? 'background-color: #F3F4F6;' : props.error ? 'border: 1px solid #EF4444;' : ''"
                :class="props.error ? 'focus:border-red-500 focus:ring-1 ring-red-500 focus:bg-[#FAE8E8]' : 'focus:border-[#1f78ad] focus:ring-1 ring-[#1f78ad] focus:bg-[#F2F7FA]'"
                class="w-full text-base border p-4 rounded text-gray-600 outline-none duration-75 transition ease-in"
                :placeholder="props.placeholder" :value="maskedValue" @input="updateBankValue($event.target.value)" />
            <p v-show="props.error" class="text-red-500">
                {{ props.error }}
            </p>

            <div class="absolute top-11 right-4">
                <!-- On -->
                <svg v-if="!isHide" @click="isHideToggle" class="w-[24px] h-[24px] text-gray-700 cursor-pointer"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="1.5"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                    <path stroke="currentColor" stroke-width="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <!-- Off -->
                <svg v-else @click="isHideToggle" class="w-[24px] h-[24px] text-gray-700 cursor-pointer"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
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