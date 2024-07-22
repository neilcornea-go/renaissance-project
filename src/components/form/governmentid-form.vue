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
    gov_id_type: null,
    pp_passportno: null,
    pp_fname: null,
    pp_mname: null,
    pp_lname: null,
    pp_dob: null,
    pp_sex: null,
    pp_nationality: null,
    pp_pob: null,
});

const extractData = () => {
    if (!props.data || !props.data.documents) {
        return;
    }
    const matchingDoc = props.data.documents.find(doc => doc.docType === formType);

    if (matchingDoc && matchingDoc.fields) {
        const updatedData = {
            gov_id_type: identifyGovType(matchingDoc.docType) || null,
            pp_passportno: matchingDoc.fields.pp_passportno?.content || 'N/A',
            pp_fname: toSentenceCase(matchingDoc.fields.pp_fname?.content) || 'N/A',
            pp_mname: toSentenceCase(matchingDoc.fields.pp_mname?.content) || 'N/A',
            pp_lname: toSentenceCase(matchingDoc.fields.pp_lname?.content) || 'N/A',
            pp_dob: formatDate(matchingDoc.fields.pp_dob?.content) || 'N/A',
            pp_sex: matchingDoc.fields.pp_sex?.content === 'M' ? 'Male' :
                matchingDoc.fields.pp_sex?.content === 'F' ? 'Female' : 'N/A',
            pp_nationality: toSentenceCase(matchingDoc.fields.pp_nationality?.content) || 'N/A',
            pp_pob: toSentenceCase(matchingDoc.fields.pp_pob?.content) || 'N/A',
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

</script>

<template>
    <FormHeader title="Government ID" link="https://www.google.com/" />

    <!-- Main Fields -->
    <div>
        <InputText disabled v-model="FormData.gov_id_type" label="Type of Government ID" placeholder="e.g. Passport" />
        <InputText v-model="FormData.pp_passportno" label="ID No." placeholder="ID No." />
        <InputText v-model="FormData.pp_fname" label="First Name" placeholder="First Name" />
        <InputText v-model="FormData.pp_mname" label="Middle Name" placeholder="Middle Name" />
        <InputText v-model="FormData.pp_lname" label="Last Name" placeholder="Last Name" />
        <InputDate type="date" v-model="FormData.pp_dob" label="Date of birth" />
        <Dropdown v-model="FormData.pp_sex" label="Sex" :data="genderOptions" />
        <Dropdown v-model="FormData.pp_nationality" label="Nationality" :data="nationalityOptions" />
        <InputText v-model="FormData.pp_pob" label="Place of Birth" placeholder="Place of Birth" />
    </div>

    <!-- Action Button -->
    <div class="space-y-4">
        <f7-button fill round large @click="$emit('next')">Next</f7-button>
        <f7-button outline round large @click="$emit('back')">Back</f7-button>
    </div>
</template>