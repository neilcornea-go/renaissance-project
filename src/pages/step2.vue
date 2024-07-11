<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';
import OTPModal from '../components/main/otp-modal.vue';
import ClaimsInfo from '../components/main/claims-info.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputDate from '../components/form/input-date.vue';
import Dropdown from '../components/form/dropdown.vue';
import Checkbox from '../components/form/checkbox.vue';

// Composable
import { useStaticData } from '../composable/useStaticData';
const { typeInjuryOptions, partBodyInjuredOptions, mainCheckboxOptions, natureDeathOptions, relationshipOptions } = useStaticData();

// Data Hook
const inputValue = ref('');
const dateValue = ref('');
const isOpenOTP = ref(false);
const selectedInjury = ref('Contusion Injury');
const selectedBodyInjured = ref('Head');
const selectedAccidentInvolve = ref('Yes');
const selectedAccidentDisablement = ref('Yes');
const selectedNatureDeath = ref('Illness');
const selectedRelationship = ref('Spouse');
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
            <ClaimsInfo type="accident" />

            <!-- Edit Result Form - Accident Claims -->
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
            </div>

            <!-- Edit Result Form - Death Claims (Temporary Hidden)  -->
            <div class="flex flex-col hidden">

                <!-- Nature of Death -->
                <Checkbox title="What was the nature of death?" :data="natureDeathOptions"
                    v-model="selectedNatureDeath" />

                <Dropdown label="What is your relationship to the deceased?" :data="relationshipOptions"
                    v-model="selectedRelationship" />

                <Divider />

                <!-- Send OTP to -->
                <div class="bg-gray-100 space-y-2 p-4 rounded-lg">
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="beneficiary" class="form-radio h-4 w-4 text-gray-600" checked>
                        <div>
                            <span class="font-medium">JXXX Smith (Beneficiary 1)</span>
                            <p class="text-gray-500">XXXXXX7453</p>
                        </div>
                    </label>

                    <Divider />

                    <label class="flex items-center space-x-2">
                        <input type="radio" name="beneficiary" class="form-radio h-4 w-4 text-gray-600">
                        <div>
                            <span class="font-medium">HXXXX Smith (Beneficiary 2)</span>
                            <p class="text-gray-500">XXXXXX1322</p>
                        </div>
                    </label>
                </div>
            </div>

            <!-- OTP Popup -->
            <OTPModal :isOpen="isOpenOTP" @update:isOpen="isOpenOTP = $event" />

            <!-- Action Button -->
            <div class="bg-white my-3 space-y-4">
                <f7-button fill round large @click="isOpenOTP = true">Next</f7-button>
                <f7-button outline round large>Back</f7-button>
            </div>
        </section>
    </GlobalLayout>
</template>

<style scoped>

.otp-popup {
    height: 100%;
    width: 100%;
    left: 55%;
    top: 60%;
    max-width: 500px;
    max-height: 380px;
    border-radius: 12px;
}

@media (max-width: 630px) {
    .otp-popup {
        height: 100%;
        width: 90%;
        left: 5%;
        top: 20%;
        border-radius: 12px;
    }
}
</style>