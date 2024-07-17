<script setup>
import { ref } from 'vue';

// Form Input Components
import InputDate from '../common/input-date.vue';
import InputTextarea from '../common/input-textarea.vue';

import FormHeader from '../common/form-header.vue';

// Form Data
const FormData = ref({
    datereport: null,
    factscase: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
});


</script>

<template>

    <FormHeader title="Police / narration report" link="https://www.google.com/" />
    <!-- Main Fields -->
    <div>
        <InputDate type="date" v-model="FormData.datereport" label="Date of report" />
        <InputTextarea v-model="FormData.factscase" label="Facts of case" placeholder="Type it here..." />
    </div>

</template>