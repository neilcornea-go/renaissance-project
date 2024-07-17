<script setup>
import { ref } from 'vue';

// Form Input Components
import InputText from '../common/input-text.vue';
import InputDate from '../common/input-date.vue';

import FormHeader from '../common/form-header.vue';

// Form Data
const FormData = ref({
    soa: null,
    confinementno: null,
    dateadmitted: null,
    timeadmitted: null,
    datedischarged: null,
    timedischarged: null,
    balancedue: null,
});

</script>

<template>

    <FormHeader title="Hospital statement of account" link="https://www.google.com/" />
    <!-- Main Fields -->
    <div>
        <InputText v-model="FormData.soa" label="SOA reference number" placeholder="Enter SOA reference number" />
        <InputText v-model="FormData.confinementno" label="Confinement number" placeholder="Enter confinement number" />
        <InputDate type="date" v-model="FormData.dateadmitted" label="Date admitted" />
        <InputDate type="time" v-model="FormData.timeadmitted" label="Time admitted" />
        <InputDate type="date" v-model="FormData.datedischarged" label="Date discharged" />
        <InputDate type="time" v-model="FormData.timedischarged" label="Time discharged" />
        <InputText currency="PHP" v-model="FormData.balancedue" label="Balance due" placeholder="Enter balance due" />
    </div>

</template>