<script setup>
import { ref } from 'vue';
const emit = defineEmits(['next', 'back']);

// Form Input Components
import InputText from '../common/input-text.vue';
import InputDate from '../common/input-date.vue';
import Divider from '../common/divider.vue';

import FormHeader from '../common/form-header.vue';

// Form Data
const FormData = ref({
    husbandFname: null,
    husbandMinitial: null,
    husbandLname: null,
    husbandCitizenship: null,
    husbandReligion: null,
    husbandDob: null,
    husbandResidence: null,
    wifeFname: null,
    wifeMinitial: null,
    wifeLname: null,
    wifeCitizenship: null,
    wifeReligion: null,
    wifeDob: null,
    wifeResidence: null,
});


</script>

<template>

    <FormHeader title="Marriage Certificate" link="https://www.google.com/" />

    <!-- Main Fields -->
    <InputText v-model="FormData.firstname" label="Place of Marriage" placeholder="Enter place of marriage" />
    <InputDate type="date" v-model="FormData.dateadmitted" label="Date of Marriage" />

    <div class="mb-7">
        <h3 class="mb-3 text-lg font-medium text-gray-700">(Husband Details)</h3>
        <InputText v-model="FormData.husbandFname" label="First Name" placeholder="e.g. John" />
        <InputText v-model="FormData.husbandMinitial" label="Middle Initial" placeholder="e.g. C." />
        <InputText v-model="FormData.husbandLname" label="Last Name" placeholder="e.g. Doe" />
        <InputText v-model="FormData.husbandCitizenship" label="Citizenship" placeholder="e.g. Filipino" />
        <InputText v-model="FormData.husbandReligion" label="Religion" placeholder="e.g. Catholic" />
        <InputDate type="date" v-model="FormData.husbandDob" label="Date of birth" />
        <InputText v-model="FormData.husbandResidence" label="Residence" placeholder="Residency" />
    </div>

    <Divider />

    <div class="mt-7">
        <h3 class="mb-3 text-lg font-medium text-gray-700">(Wife Details)</h3>
        <InputText v-model="FormData.wifeFname" label="First Name" placeholder="e.g. Grace" />
        <InputText v-model="FormData.wifeMinitial" label="Middle Initial" placeholder="e.g. C." />
        <InputText v-model="FormData.wifeLname" label="Last Name" placeholder="e.g. Poe" />
        <InputText v-model="FormData.wifeCitizenship" label="Citizenship" placeholder="e.g. Filipino" />
        <InputText v-model="FormData.wifeReligion" label="Religion" placeholder="e.g. Catholic" />
        <InputDate type="date" v-model="FormData.wifeDob" label="Date of birth" />
        <InputText v-model="FormData.wifeResidence" label="Residence" placeholder="Residency" />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill round large @click="$emit('next')">Next</f7-button>
        <f7-button outline round large @click="$emit('back')">Back</f7-button>
    </div>

</template>