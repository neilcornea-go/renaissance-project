<script setup>
import { ref, onMounted } from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/css/intlTelInput.css';


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

const inputPhone = async () => {
    const input = document.querySelector('#phone');
    if (input) {
        const iti = intlTelInput(input, {
            initialCountry: 'ph',
            separateDialCode: true,
            formatOnDisplay: true,
            nationalMode: false,
        });

        input.addEventListener('countrychange', () => {
            iti.getSelectedCountryData();
        });

        input.addEventListener('input', () => {
            formattedPhoneNumber.value = iti.isValidNumber() ? iti.formatNumber() : '';
        });
    }
};

const formattedPhoneNumber = ref('');

onMounted(() => {
  inputPhone();
});
</script>

<template>
    <div class="space-y-2 flex flex-col mb-4">
        <span class="text-base text-gray-700 font-medium">{{ label }}</span>
        <input type="text" id="phone"
            class="w-full text-base border border-gray-400 p-4 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in"
            :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)" />
    </div>

</template>

<style scoped>
.iti {
    --iti-path-flags-1x: url('path/to/flags.png');
    --iti-path-flags-2x: url('path/to/flags@2x.png');
    --iti-path-globe-1x: url('path/to/globe.png');
    --iti-path-globe-2x: url('path/to/globe@2x.png');
}
</style>