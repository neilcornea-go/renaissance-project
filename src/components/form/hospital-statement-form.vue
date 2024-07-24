<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits(['next', 'back']);

// Form Input Components
import InputText from '../common/input-text.vue';
import InputDate from '../common/input-date.vue';
import FormHeader from '../common/form-header.vue';

const formType = 'hospital-statement';

const props = defineProps({
    data: Object
});

// Form Data
const FormData = ref({
    docType: formType,
    hs_soa_ref_no: null,
    hs_confinement_no: null,
    hs_date_admitted: null,
    hs_time_admitted: null,
    hs_date_discharge: null,
    hs_time_discharge: null,
    hs_balance_due: null,
});

const extractData = () => {
    if (!props.data || !props.data.documents) {
        return;
    }
    const matchingDoc = props.data.documents.find(doc => doc.docType === formType);

    if (matchingDoc && matchingDoc.fields) {
        const updatedData = {
            hs_soa_ref_no: matchingDoc.fields.hs_soa_ref_no?.content || null,
            hs_confinement_no: matchingDoc.fields.hs_confinement_no?.content || 'N/A',
            hs_date_admitted: formatDate(matchingDoc.fields.hs_date_admitted?.content) || null,
            hs_time_admitted: formatTime(matchingDoc.fields.hs_time_admitted?.content) || null,
            hs_date_discharge: formatDate(matchingDoc.fields.hs_date_discharge?.content) || null,
            hs_time_discharge: formatTime(matchingDoc.fields.hs_time_discharge?.content) || null,
            hs_balance_due: matchingDoc.fields.hs_balance_due?.content || null,
        };

        FormData.value = { ...FormData.value, ...updatedData };
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatTime = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    } else {
        hours = hours.padStart(2, '0');
    }

    return `${hours}:${minutes}`;
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

    <FormHeader title="Hospital statement of account" link="https://www.google.com/" />
    <!-- Main Fields -->
    <div>
        <InputText v-model="FormData.hs_soa_ref_no" label="SOA reference number"
            placeholder="Enter SOA reference number" />
        <InputText v-model="FormData.hs_confinement_no" label="Confinement number"
            placeholder="Enter confinement number" />
        <InputDate type="date" v-model="FormData.hs_date_admitted" label="Date admitted" />
        <InputDate type="time" v-model="FormData.hs_time_admitted" label="Time admitted" />
        <InputDate type="date" v-model="FormData.hs_date_discharge" label="Date discharged" />
        <InputDate type="time" v-model="FormData.hs_time_discharge" label="Time discharged" />
        <InputText currency="PHP" v-model="FormData.hs_balance_due" label="Balance due"
            placeholder="Enter balance due" />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill large @click="nextForm()">Next</f7-button>
        <f7-button class="border-red-600" outline large @click="$emit('back')">Back</f7-button>
    </div>
</template>