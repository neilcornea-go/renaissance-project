<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputDate from '../components/form/input-date.vue';
import Dropdown from '../components/form/dropdown.vue';
import Checkbox from '../components/form/checkbox.vue';

// Composable
import { useStaticData } from '../composable/useStaticData';

const { typeInjuryOptions, partBodyInjuredOptions, mainCheckboxOptions } = useStaticData();

const inputValue = ref('');
const dateValue = ref('');
const selectedInjury = ref('Contusion Injury');
const selectedBodyInjured = ref('Head');
const selectedAccidentInvolve = ref('Yes');
const selectedAccidentDisablement = ref('Yes');
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

            <!-- Claims Info -->
            <div class="flex items-center gap-6 border border-gray-400 p-4 rounded-lg">
                <div class="bg-gray-200 p-4 rounded-full">
                    <svg class="w-[24px] h-[24px] text-[#be003b]" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                </div>

                <div class="space-y-1">
                    <p class="font-normal text-base text-gray-500">You're claiming for</p>
                    <h3 class="font-bold text-gray-700 text-2xl uppercase">Accident</h3>
                </div>

            </div>

            <!-- Edit Result Form -->
            <div class="flex flex-col">
                <!-- Inputs -->
                <InputDate v-model="dateValue" label="Accident date" />
                <InputText v-model="inputValue" label="Accident Location" placeholder="Enter accident location" />

                <!-- Injury Type Dropdown -->
                <Dropdown v-model="selectedInjury" label="Injury type" :data="typeInjuryOptions" />

                <!-- Part of body injured -->
                <Dropdown v-model="selectedBodyInjured" label="Part of body injured" :data="partBodyInjuredOptions" />

                <!-- Accident Involve Checkbox -->
                <Checkbox title="Did the accident involve confinement, surgery, or dismemberment?"
                    :data="mainCheckboxOptions" v-model="selectedAccidentInvolve" />

                <!-- Accident Involve Checkbox -->
                <Checkbox title="Did the accident lead to disablement?" :data="mainCheckboxOptions"
                    v-model="selectedAccidentDisablement" />

                <!-- Action Button -->
                <div class="bg-white my-3 space-y-4">
                    <f7-button fill round large>Next</f7-button>
                    <f7-button outline round large>Back</f7-button>
                </div>
            </div>
        </section>
    </GlobalLayout>
</template>