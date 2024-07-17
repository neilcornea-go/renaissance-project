<script setup>
import { ref } from 'vue';

// Form Input Components
import InputText from '../common/input-text.vue';
import InputDate from '../common/input-date.vue';

import FormHeader from '../common/form-header.vue';

// Form Data
const FormData = ref({
    husbandFname: null,
    husbandMinitial: null,
    husbandLname: null,
    husbandDob: null,
    wifeFname: null,
    wifeMinitial: null,
    wifeLname: null,
    wifeDob: null,

});


</script>

<template>

    <FormHeader title="Marriage Certificate" link="https://www.google.com/" />
    
    <!-- Main Fields -->
    <InputText v-model="FormData.firstname" label="Place of Marriage" placeholder="Enter place of marriage" />

    <div class="mb-7">
        <h3 class="mb-3 text-lg font-medium text-gray-700">(Husband Details)</h3>
        <InputText v-model="FormData.firstname" label="First Name" placeholder="e.g. John" />
        <InputText v-model="FormData.firstname" label="Middle Initial" placeholder="e.g. C." />
        <InputText v-model="FormData.firstname" label="Last Name" placeholder="e.g. Doe" />
        <InputText v-model="FormData.firstname" label="Citizenship" placeholder="e.g. Filipino" />
        <InputText v-model="FormData.firstname" label="Religion" placeholder="e.g. Catholic" />
        <InputDate type="date" v-model="FormData.dateadmitted" label="Date of birth" />
    </div>
    <hr>
    <div class="mt-7">
        <h3 class="mb-3 text-lg font-medium text-gray-700">(Wife Details)</h3>
        <InputText v-model="FormData.firstname" label="First Name" placeholder="e.g. John" />
        <InputText v-model="FormData.firstname" label="Middle Initial" placeholder="e.g. C." />
        <InputText v-model="FormData.firstname" label="Last Name" placeholder="e.g. Doe" />
        <InputText v-model="FormData.firstname" label="Citizenship" placeholder="e.g. Filipino" />
        <InputText v-model="FormData.firstname" label="Religion" placeholder="e.g. Catholic" />
        <InputDate type="date" v-model="FormData.dateadmitted" label="Date of birth" />
    </div>

</template>