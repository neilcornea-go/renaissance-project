<script setup>
import { ref, computed, onMounted } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import ClaimsInfo from '../components/main/claims-info.vue';

// Form Input Components
import InputText from '../components/common/input-text.vue';
import InputDate from '../components/common/input-date.vue';
import Dropdown from '../components/common/dropdown.vue';
import Checkbox from '../components/common/checkbox.vue';

// Composable
import { useStaticData } from '../composable/useStaticData';

const { bankNameOptions, typeOfAccountOptions, bankDetails } = useStaticData();

const policy_number = '123456';
const inputAccountName = ref('');
const inputBankAccount = ref('');
const selectedBankName = ref(null);
const selectedTypeOfAccount = ref(null);

const renderData = () => {
    const matchingDetails = bankDetails.value.find(data => data.policyNumber === policy_number);
    inputAccountName.value = matchingDetails.account_name;
    inputBankAccount.value = matchingDetails.account_number;
    selectedBankName.value = matchingDetails.bank_name;
    selectedTypeOfAccount.value = matchingDetails.type_of_account;
};

onMounted(() => {
    renderData();
});

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="4" />
                <Title title="Your Bank Details" />
                <Subtitle
                    subtitle="Kindly check your bank account details are accurate or you can click to edit the details" />
            </div>


             <div class="space-y-2">
                <h2 class="text-gray-700 text-lg font-medium">Bank account details</h2>
            </div>
            <!-- Edit Result Form -->
            <div class="flex flex-col">
                <!-- Inputs -->
                <InputText v-model="inputAccountName" label="Account name" placeholder="e.g. John Smith" />

                <InputText masked v-model="inputBankAccount" label="Bank account number" placeholder="e.g. 865301828712" />

                <!-- Bank name Dropdown -->
                <Dropdown v-model="selectedBankName" label="Bank name" :data="bankNameOptions" />

                <!-- Type of account dropdown -->
                <Dropdown v-model="selectedTypeOfAccount" label="Type of account" :data="typeOfAccountOptions" />

                <!-- Action Button -->
                <div class="bg-white my-3 space-y-4">
                    <f7-button fill round large>Next</f7-button>
                    <f7-button outline round large>Back</f7-button>
                </div>
            </div>
        </section>
    </GlobalLayout>
</template>