<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import ClaimsInfo from '../components/main/claims-info.vue';

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
            <ClaimsInfo type="accident" />

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