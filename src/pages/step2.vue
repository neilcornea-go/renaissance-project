<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';
import DocumentInfo from '../components/main/document-info.vue';
import ChecklistPopup from '../components/main/checklist-popup.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputDate from '../components/form/input-date.vue';
import InputFile from '../components/form/input-file.vue';

const inputValue = ref('');
const dateValue = ref('');
const selectedFiles = ref([]);
</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="2" />
                <Title title="Verify Claim Details" />
                <Subtitle
                    subtitle="Kindly check and verify that the details are accurate or you can click to edit the details." />
            </div>

            <!-- Edit Result Form -->
            <div class="flex flex-col">
                <!-- Inputs -->
                <InputDate v-model="dateValue" label="Accident date" />
                <InputText v-model="inputValue" label="Accident Location" placeholder="Enter accident location" />

                <div class="relative mb-4">
                    <span class="absolute right-3 top-[50%]">
                        <svg class="w-[34px] h-[34px] text-gray-600" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="m8 10 4 4 4-4" />
                        </svg>
                    </span>
                    <div class="space-y-2">
                        <span class="text-base text-gray-700 font-medium">Injury type</span>
                        <select class="w-full text-base border border-gray-400 p-4 rounded text-gray-600 focus:ring-1 ring-[#1f78ad] outline-none focus:border-[#1f78ad] focus:bg-[#F2F7FA] duration-75 transition ease-in">
                            <option value="volvo">Contusion Injury</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>

                <!-- Action Button -->
                <div class="bg-white my-3 space-y-4">
                    <f7-button fill round large>Next</f7-button>
                    <f7-button outline round large>Back</f7-button>
                </div>
            </div>
        </section>
    </GlobalLayout>
</template>