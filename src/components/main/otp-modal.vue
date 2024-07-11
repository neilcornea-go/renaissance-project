<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['update:isOpen']);

const otpIsOpen = computed({
    get() {
        return props.isOpen;
    },
    set(value) {
        emit('update:isOpen', value);
    }
});

const timer = ref(300); // 300 seconds = 5 minutes
const intervalId = ref(null);

const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const startTimer = () => {
    intervalId.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            clearInterval(intervalId.value);
        }
    }, 1000);
};

const resetTimer = () => {
    clearInterval(intervalId.value);
    timer.value = 300;
    startTimer();
};

const resendCode = () => {
    // Logic to resend the code goes here
    console.log("Code resent");
    resetTimer();
};

onMounted(() => {
    startTimer();
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});
</script>

<template>
    <f7-popup v-model:opened="otpIsOpen" class="otp-popup">
        <f7-navbar>
            <f7-nav-left>
                <span class="px-3 text-gray-700 font-bold uppercase text-base">Mobile Number Verification</span>
            </f7-nav-left>
            <f7-nav-right>
                <f7-link @click="otpIsOpen = false">
                    <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block class="mt-1">
            <p class="text-gray-700 text-base">Please enter the 6-digit OTP code sent to phone <span
                    class="font-medium">XXXXXX6789</span>
            </p>

            <div class="flex flex-col mt-7 space-y-4">
                <label for="otp" class="text-lg font-medium text-gray-700">6-digit OTP Code</label>

                <div class="flex justify-between gap-4">
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                    <input type="text" maxlength="1" value="0"
                        class="w-full text-center h-10 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in" />
                </div>

                <!-- Verify OTP Button -->
                <f7-button fill round large>Verify</f7-button>

                <!-- Resend Code Prompt -->
                <div>
                    <p class="text-gray-600 text-base">You can request a new code after <span class="font-bold text-gray-700">{{ formattedTime }}</span></p>
                    <p @click="resendCode" class="text-blue-600 uppercase text-base font-medium underline hover:text-blue-700 cursor-pointer">Resend code</p>
                </div>
            </div>
        </f7-block>
    </f7-popup>
</template>