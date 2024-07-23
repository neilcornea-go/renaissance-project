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
    FormData.value.pr_facts_of_case = matchingDoc.fields.pr_facts_of_case.content;
    FormData.value.pr_dor = formatDate(matchingDoc.fields.pr_dor.content);
    FormData.value.pr_poi = matchingDoc.fields.pr_poi.content;
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

    console.log(JSON.parse(localStorage.getItem('form')))
        // get the form
        var getForm = JSON.parse(localStorage.getItem('form'))
        // remove first what is in localstorage
        localStorage.removeItem('form'); 
        // filter the documents to remove prior saved
        getForm.documents = getForm.documents.filter(function( obj ) {return obj.docType !== formType;})
        // add a content in the claim details in form
        getForm.documents.push(FormData.value)       
        //then set again the new form
        localStorage.setItem('form', JSON.stringify(getForm))
        console.log(getForm)
    
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
        <f7-button fill round large @click="nextForm()">Next</f7-button>
        <f7-button outline round large @click="$emit('back')">Back</f7-button>
    </div>
</template>