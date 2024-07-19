<script setup>
import { ref } from 'vue';
const emit = defineEmits(['next', 'back']);

// Form Input Components
import InputText from '../common/input-text.vue';
import InputTextarea from '../common/input-textarea.vue';

import FormHeader from '../common/form-header.vue';

// Form Data
const FormData = ref({
    certificateDetails: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    nameIssuer: null,
    jobTitleIssuer: null,

});


</script>

<template>

    <FormHeader title="Medical certificate" link="https://www.google.com/" />
    <!-- Main Fields -->
    <div>
        <InputTextarea v-model="FormData.certificateDetails" label="Details" placeholder="Type it here..." />
        <InputText v-model="FormData.nameIssuer" label="Name of issuer" placeholder="Enter name of issuer" />
        <InputText v-model="FormData.jobTitleIssuer" label="Issuer's job title"
            placeholder="Enter issuer's job title" />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill round large @click="$emit('next')">Next</f7-button>
        <f7-button outline round large @click="$emit('back')">Back</f7-button>
    </div>

</template>