<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Form Input Components
import InputText from '../form/input-text.vue';
import InputDate from '../form/input-date.vue';
import InputPhone from '../form/input-phone.vue';
import Dropdown from '../form/dropdown.vue';

// Composable
import { useNationalityData } from '../../composable/useNationalityData';

import { useStaticData } from '../../composable/useStaticData';
const { nationalityOptions } = useNationalityData();
const { genderOptions } = useStaticData();
const country = ref([]);
const stateNames = ref([]);

// Reactive variables
const FormData = ref({
    firstname: null,
    lastname: null,
    dob: null,
    birthplace: null,
    nationality: 'Filipino',
    sex: 'Male',
    phone: null,
    email: null,
    residentialNo: null,
    address1: null,
    address2: null,
    postcode: null,
    country: 'Philippines',
});

// Function to fetch the country codes
const fetchCountryCodes = async () => {
    try {
        const response = await axios.get('../../json/countrycodes.json');
        const data = response.data;

        const allCountries = new Set();

        data.forEach(country => {
            if (country.region) {
                allCountries.add(country.name);
            }
        });

        country.value = Array.from(allCountries);

    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
};

onMounted(() => {
    fetchCountryCodes();
});

</script>

<template>
    <!-- Main Fields -->
    <div>
        <InputText v-model="FormData.firstname" label="First Name" placeholder="e.g. John" />
        <InputText v-model="FormData.lastname" label="Last Name" placeholder="e.g. Doe" />
        <InputDate v-model="FormData.dob" label="Date of birth" />
        <InputText v-model="FormData.birthplace" label="Place of birth" placeholder="e.g. Manila" />
        <Dropdown v-model="FormData.nationality" label="Nationality" :data="nationalityOptions" />
        <Dropdown v-model="FormData.sex" label="Sex" :data="genderOptions" />
        <InputPhone v-model="FormData.phone" label="Moible number" placeholder="e.g 9285282000" />
        <InputText v-model="FormData.email" label="Email address" placeholder="e.g. name@email.com" />
    </div>

    <!-- Residential Address Fields -->
    <div>
        <h2 class="mb-3 mt-7 text-lg font-bold text-gray-800">Residential Address</h2>
        <InputText v-model="FormData.residentialNo" label="House number / Unit Number / Lot Number"
            placeholder="e.g. No. 23" />
        <InputText v-model="FormData.address1" label="Address 1" placeholder="Address 1" />
        <InputText v-model="FormData.address2" label="Address 2" placeholder="Address 2" />
        <InputText v-model="FormData.postcode" label="Postcode" placeholder="Postcode" />
        <!-- <Dropdown v-model="FormData.states" label="State" :data="stateNames" /> -->
         <Dropdown v-model="FormData.country" label="Country" :data="country" />
    </div>
</template>