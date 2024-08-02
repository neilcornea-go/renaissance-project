<script setup>

import { onMounted, ref, computed } from 'vue';

import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from "../components/common/divider.vue";
import { f7 } from 'framework7-vue';

// Firebase
import { database } from '../js/firebase';
import { collection, where, getDocs, addDoc, query, serverTimestamp } from "firebase/firestore";

import {  openPreloader } from "../../src/js/helpers/common.js";


// Data Hook for Accident Section
//step1
const policy_number = ref('');
//step2
const inputValue = ref('');
const dateValue = ref('');
const selectedInjury = ref('Contusion Injury');
const selectedBodyInjured = ref('Head');
const selectedAccidentInvolve = ref('Yes');
//step3
const govID = ref('');
const idNum = ref('');
const firstName = ref(' ');
const middleName = ref('');
const lastname = ref('');
const dob = ref('');
const sex = ref('');
const nationality = ref('');
const pob = ref('');

const pr_dor = ref('')
const pr_facts_of_case = ref('')
const pr_poi = ref('')

const hs_balance_due = ref('')
const hs_confinement_no = ref('')
const hs_date_admitted = ref('')
const hs_date_discharge = ref('')
const hs_time_admitted = ref('')
const hs_time_discharge = ref('')
const hs_soa_ref_no = ref('')


//step4
const account_name = ref('')
const bank_name = ref('')
const bank_number = ref('')
const type_of_account = ref('')

const isPreload = ref(false);

const maskedBankNumber = computed(() => {
    if (bank_number.value.length > 4) {
        const lastFourDigits = bank_number.value.slice(-4);
        const maskedPart = bank_number.value.slice(0, -4).replace(/\d/g, '*');
        return maskedPart + lastFourDigits;
    }
    return bank_number.value;
});


const goTo = (route) => {
    f7.views.main.router.navigate(route, {
        animate: false
    });
}

const NextPage = () => {

    openPreloader(true);
    isPreload.value = true;
    setTimeout(() => {
        isPreload.value = false;
        openPreloader(false)
        if (!isPreload.value) {
            const toast = f7.toast.create({
                text: `Successfully submitted claims`,
                closeButton: true,
                closeButtonText: 'Okay',
                closeButtonColor: 'green',
                closeTimeout: 3000,
            });
            submitClaims();

            toast.open();

            localStorage.removeItem('claimant');
            localStorage.removeItem('claims-reference');
            localStorage.removeItem('documents_shortlist');
            localStorage.removeItem('form');

            goTo('/step-6');
        }
    }, 2000);
};

const submitClaims = async () => {
    const getForm = JSON.parse(localStorage.getItem('form'));
    const getClaimsNo = localStorage.getItem('claims-reference');
    const db = database;
    const collectionRef = collection(db, 'submission');
    const querySnapshot = await getDocs(query(collectionRef, where('claims_no', '==', getClaimsNo)));

    if (querySnapshot.empty) {
        await addDoc(collectionRef, {
            claims_no: getClaimsNo,
            data: getForm,
            created_at: serverTimestamp(),
        });
    }

    // save the claims_no in cookies with 5 minutes duration
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 5 * 60 * 1000).toUTCString();
    document.cookie = `claims_no=${getClaimsNo}; expires=${expirationTime}; path=/`;
}

onMounted(() => {
    const savedData = localStorage.getItem('form');
    if (savedData) {
        // console.log(savedData)
        const formData = JSON.parse(savedData);
        console.log(formData)

        //step Form
        const step1Form = formData.policy_number
        // console.log(step1Form)
        const step2Form = formData.claim_details
        const step3Form = formData.documents
        const phPassport = step3Form.find(doc => doc.docType === 'ph-passport');
        const step4Form = formData.bank_details

        policy_number.value = formData.policy_number
        dateValue.value = step2Form.accident_date;
        inputValue.value = step2Form.accident_location;
        selectedInjury.value = step2Form.injury_type;
        selectedBodyInjured.value = step2Form.injured_part;
        selectedAccidentInvolve.value = step2Form.confined_accident;

        const policeNarration = step3Form.find(doc => doc.docType === 'police-narration-report');
        const hospitalStatement = step3Form.find(doc => doc.docType === 'hospital-statement');


        // Check if the document was found
        if (policeNarration) {
            // console.log('Police Narration:', policeNarration);

            pr_dor.value = policeNarration.pr_dor
            pr_facts_of_case.value = policeNarration.pr_facts_of_case
            pr_poi.value = policeNarration.pr_poi


        } else {
            console.log('Police Narration not found');
        }

        // Check if the document was found
        if (hospitalStatement) {
            console.log('Hospital Statement:', hospitalStatement);

            hs_balance_due.value = hospitalStatement.hs_balance_due
            hs_confinement_no.value = hospitalStatement.hs_confinement_no
            hs_date_admitted.value = hospitalStatement.hs_date_admitted
            hs_date_discharge.value = hospitalStatement.hs_date_discharge
            hs_time_admitted.value = hospitalStatement.hs_time_admitted
            hs_time_discharge.value = hospitalStatement.hs_time_discharge
            hs_soa_ref_no.value = hospitalStatement.hs_soa_ref_no


        } else {
            console.log('Police Narration not found');
        }

        //step2



        //step3

        // Check if the document was found
        if (phPassport) {
            // console.log('PH Passport Details:', phPassport);

            idNum.value = phPassport.govt_id
            firstName.value = phPassport.fname
            middleName.value = phPassport.mname
            lastname.value = phPassport.lname
            dob.value = phPassport.dob
            sex.value = phPassport.sex
            nationality.value = phPassport.nationality
            pob.value = phPassport.pob

        } else {
            console.log('PH Passport not found');
        }

        //step4 
        account_name.value = step4Form.account_name
        bank_name.value = step4Form.bank_name
        bank_number.value = step4Form.bank_number
        type_of_account.value = step4Form.type_of_account
    }

})

//see more and see less

const expanded = ref(false);

// Compute whether the text needs truncation based on sentence count
const needsTruncation = computed(() => {
    const sentenceCount = pr_facts_of_case.value.match(/[\w|\)][.?!](\s|$)/g)?.length || 0;
    return sentenceCount > 4;
});

// Compute the text to display based on the expanded state
const displayedText = computed(() => {
    if (expanded.value || !needsTruncation.value) {
        return pr_facts_of_case.value;
    }
    const sentences = pr_facts_of_case.value.split(/(?<=[.!?])\s+/).slice(0, 4);
    return sentences.join(' ') + '...';
});

    // Function to toggle the expanded state
    const toggleReadMore = () => {
      expanded.value = !expanded.value;
    };


</script>

<template>
    <GlobalLayout fullWidth>
        <section class="flex flex-col gap-8 py-6 px-6 max-w-screen-lg mx-auto">
            <!-- Steps Indicator -->
            <div class="space-y-2">
                <StepIndicator step="5" />
                <f7-progressbar color="#d31145" :progress="100" />
                <Title title="Review Summary" />
                <Subtitle subtitle="Please review summary before proceeding" />
            </div>

        </section>

        <section class="bg-[#f1f1f1]">
            <div class="py-6 px-6 max-w-screen-lg mx-auto">
                <div class="space-y-2 flex justify-between items-center text-center">
                    <Title title="Claims Details" class="!text-xl" />

                    <a @click="goTo('/step-2')">
                        <svg class="w-6 h-6 text-[#b91c1c]" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                        </svg>
                    </a>

                </div>
                <div class="py-2">
                    <p>Policy Number</p>
                    <h3 class="font-bold">{{ policy_number }}</h3>
                </div>

                <div class="flex justify-start">

                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Accident Date</p>
                        <h3 class="font-bold">{{ dateValue }}</h3>
                    </div>

                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Accident Location</p>
                        <h3 class="font-bold">{{ inputValue }}</h3>
                    </div>
                </div>

                <div class="flex justify-start">

                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Injury Type</p>
                        <h3 class="font-bold">{{ selectedInjury }}</h3>
                    </div>

                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Part of body injured</p>
                        <h3 class="font-bold">{{ selectedBodyInjured }}</h3>
                    </div>
                </div>

                <div class="pb-2">
                    <p>Did the accident involved confinement, surgery, or dismemberment?</p>
                    <h3 class="font-bold">{{ selectedAccidentInvolve }}</h3>
                </div>

                <Divider class="border-gray-400" />

                <!-- police narration -->

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Date of Report</p>
                        <h3 class="font-bold">{{ pr_dor }}</h3>

                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">

                        <p>Place of Incident</p>
                        <h3 class="font-bold">{{ pr_poi }}</h3>

                    </div>
                </div>


                <div class="py-2">
                    <p>Fact of Case</p>
                    <h3 class="font-bold ">

                        <div class="overflow-hidden transition-all duration-300 ease-in-out" 
                        :style="{ maxHeight: expanded ? '1000px' : '60px', opacity: expanded ? '1' : '0.8' }">
                        {{ displayedText }}
                    </div>
                        <button 
                          v-if="needsTruncation" 
                          @click="toggleReadMore" 
                          class="text-[#b91c1c] hover:text-[#f87171] pt-4"
                        >
                          {{ expanded ? 'Read Less' : 'Read More' }}
                        </button></h3>
                </div>

                <Divider class="border-gray-400" />

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>SOA reference number</p>
                        <h3 class="font-bold">{{ hs_soa_ref_no }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">

                        <p>Confinement number</p>
                        <h3 class="font-bold">{{ hs_confinement_no }}</h3>

                    </div>
                </div>

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Date Admitted</p>
                        <h3 class="font-bold">{{ hs_date_admitted }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">

                        <p>Date Admitted</p>
                        <h3 class="font-bold">{{ hs_time_admitted }}</h3>

                    </div>
                </div>

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Date Discharge</p>
                        <h3 class="font-bold">{{ hs_date_discharge }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">

                        <p>Time Discharge</p>
                        <h3 class="font-bold">{{ hs_time_discharge }}</h3>

                    </div>
                </div>

                <div class="py-2">
                    <p>Balance Due</p>
                    <h3 class="font-bold">{{ hs_balance_due }}</h3>
                </div>


                <Divider class="border-gray-400" />


                <div class="pb-2">
                    <p>Type of Government ID</p>
                    <h3 class="font-bold">Passport</h3>
                </div>

                <div class="py-2">
                    <p>ID No.</p>
                    <h3 class="font-bold">{{ idNum }}</h3>
                </div>

                <div class="py-2">
                    <p>First Name</p>
                    <h3 class="font-bold">{{ firstName }}</h3>
                </div>

                <div class="py-2">
                    <p>Middle Name</p>
                    <h3 class="font-bold">{{ middleName }}</h3>
                </div>

                <div class="py-2">
                    <p>Last Name</p>
                    <h3 class="font-bold">{{ lastname }}</h3>
                </div>

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Date of birth</p>
                        <h3 class="font-bold">{{ dob }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Place of birth</p>
                        <h3 class="font-bold">{{ pob }}</h3>
                    </div>
                </div>

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Sex</p>
                        <h3 class="font-bold">{{ sex }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Nationality</p>
                        <h3 class="font-bold">{{ nationality }}</h3>
                    </div>
                </div>

                <Divider class="border-gray-400" />

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Account Name</p>
                        <h3 class="font-bold">{{ account_name }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">

                        <p>Type of Account</p>
                        <h3 class="font-bold">{{ type_of_account }}</h3>

                    </div>
                </div>

                <div class="flex justify-start">
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Bank Name</p>
                        <h3 class="font-bold">{{ bank_name }}</h3>
                    </div>
                    <div class="flex-grow py-2 justify-start items-center w-[500px]">
                        <p>Bank Account Number</p>
                        <h3 class="font-bold">{{ maskedBankNumber }}</h3>
                    </div>
                </div>


                <div class="py-4 space-y-3">
                    <f7-button fill large preloader :loading="isPreload" :disabled="isPreload"
                        @click="NextPage()">Submit
                        Claim</f7-button>
                    <f7-button outline large @click="goTo('/step-4')" class=" border-red-600">Back</f7-button>
                </div>
            </div>

        </section>




    </GlobalLayout>
</template>