<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(['next', 'back']);

import InputDate from '../common/input-date.vue';
import InputTextarea from '../common/input-textarea.vue';
import FormHeader from '../common/form-header.vue';

const formType = 'police-narration-report';

const props = defineProps({
    data: Object
});

// Form Data
const FormData = ref({
    docType: formType,
    pr_dor: null,
    pr_poi: null,
    pr_facts_of_case: null,
});

const extractData = () => {
    if (!props.data || !props.data.documents) {
        return;
    }
    const matchingDoc = props.data.documents.find(doc => doc.docType === formType);
    FormData.value.pr_facts_of_case = matchingDoc.pr_facts_of_case;
    FormData.value.pr_dor = formatDate(matchingDoc.pr_dor);
    FormData.value.pr_poi = matchingDoc.pr_poi;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

onMounted(() => {
    extractData();
});

const nextForm = () => {
    emit('next')

    var getForm = JSON.parse(localStorage.getItem('form'))
    localStorage.removeItem('form');
    getForm.documents = getForm.documents.filter(function (obj) { return obj.docType !== formType; })
    getForm.documents.push(FormData.value)
    localStorage.setItem('form', JSON.stringify(getForm))
}

const backForm = () => {
    emit('back')

    var getForm = JSON.parse(localStorage.getItem('form'))
    localStorage.removeItem('form');
    getForm.documents = getForm.documents.filter(function (obj) { return obj.docType !== formType; })
    getForm.documents.push(FormData.value)
    localStorage.setItem('form', JSON.stringify(getForm))
}
</script>

<template>

    <FormHeader title="Police / narration report" link="https://www.google.com/" />
    <!-- Main Fields -->
    <div>
        <InputDate type="date" v-model="FormData.pr_dor" label="Date of report" />
        <InputTextarea v-model="FormData.pr_facts_of_case" label="Facts of case" placeholder="Type it here..." />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill large @click="nextForm()">Next</f7-button>
        <f7-button class="border-red-600" outline large @click="backForm()">Back</f7-button>
    </div>
</template>