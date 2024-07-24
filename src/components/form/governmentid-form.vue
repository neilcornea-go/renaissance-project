<script setup>
import { ref, onMounted, computed } from 'vue';
const emit = defineEmits(['next', 'back']);
import axios from 'axios';

// Form Input Components
import InputText from '../common/input-text.vue';
import InputDate from '../common/input-date.vue';
import InputPhone from '../common/input-phone.vue';
import Dropdown from '../common/dropdown.vue';
import FormHeader from '../common/form-header.vue';

// Composable
import { useNationalityData } from '../../composable/useNationalityData';
import { useStaticData } from '../../composable/useStaticData';

const { nationalityOptions } = useNationalityData();
const { genderOptions } = useStaticData();
// const formType = ['passport-ph', "drivers-license", 'national-id'];
const formType = 'ph-passport';

const props = defineProps({
    data: Object
});


// Form Data
const FormData = ref({
    docType: formType,
    govt_id: null,
    fname: null,
    mname: null,
    lname: null,
    dob: null,
    sex: null,
    nationality: null,
    pob: null,
});

const extractData = () => {
    if (!props.data || !props.data.documents) {
        return;
    }
    const matchingDoc = props.data.documents.find(doc => doc.docType === formType);

    if (matchingDoc && matchingDoc.fields) {
        const updatedData = {
            docType: matchingDoc.docType || null,
            docName: identifyGovType(matchingDoc.docType),
            govt_id: matchingDoc.fields.govt_id?.content || 'N/A',
            fname: toSentenceCase(matchingDoc.fields.fname?.content) || 'N/A',
            mname: toSentenceCase(matchingDoc.fields.mname?.content) || 'N/A',
            lname: toSentenceCase(matchingDoc.fields.lname?.content) || 'N/A',
            dob: formatDate(matchingDoc.fields.dob?.content) || 'N/A',
            sex: matchingDoc.fields.sex?.content === 'M' ? 'Male' :
                matchingDoc.fields.sex?.content === 'F' ? 'Female' : 'N/A',
            nationality: toSentenceCase(matchingDoc.fields.nationality?.content) || 'N/A',
            pob: toSentenceCase(matchingDoc.fields.pob?.content) || 'N/A',
        };

        FormData.value = { ...FormData.value, ...updatedData };

        console.log(FormData.value)
    }
};

const identifyGovType = (id) => {
    switch (id) {
        case 'drivers-license': return "Driver's License";
        case 'ph-passport': return "Passport";
        case 'national-id': return "National ID";
        default: return 0;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const toSentenceCase = (text) => {
    if (typeof text !== 'string' || text.trim() === '') {
        return '';
    }
    const words = text.split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    } else if (words.length >= 2) {
        const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        const secondWord = words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase();
        const remainingWords = words.slice(2).join(' ');

        return `${firstWord} ${secondWord} ${remainingWords}`;
    }

    return text;
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
    <FormHeader title="Government ID" link="https://www.google.com/" />

    <!-- Main Fields -->
    <div>
        <InputText disabled v-model="FormData.docName" label="Type of Government ID" placeholder="e.g. Passport" />
        <InputText v-model="FormData.govt_id" label="ID No." placeholder="ID No." />
        <InputText v-model="FormData.fname" label="First Name" placeholder="First Name" />
        <InputText v-model="FormData.mname" label="Middle Name" placeholder="Middle Name" />
        <InputText v-model="FormData.lname" label="Last Name" placeholder="Last Name" />
        <InputDate type="date" v-model="FormData.dob" label="Date of birth" />
        <Dropdown v-model="FormData.sex" label="Sex" :data="genderOptions" />
        <Dropdown v-model="FormData.nationality" label="Nationality" :data="nationalityOptions" />
        <InputText v-model="FormData.pob" label="Place of Birth" placeholder="Place of Birth" />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill large @click="nextForm()">Next</f7-button>
        <f7-button class="border-red-600" outline large @click="$emit('back')">Back</f7-button>
    </div>
</template>