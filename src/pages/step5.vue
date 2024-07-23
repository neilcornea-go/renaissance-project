<script setup>

import { onMounted, ref, computed } from 'vue';

import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from "../components/common/divider.vue";
import { f7 } from 'framework7-vue';

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
//step4
const account_name = ref('')
const bank_name = ref('')
const bank_number = ref('')
const type_of_account = ref('')

const goTo = (route) => {
        f7.views.main.router.navigate(route, {
            animate: false
        });

}

const NextPage = () => {

goTo('/step-6');

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

        //step2

        policy_number.value = formData.policy_number
        dateValue.value = step2Form.accident_date;
        inputValue.value = step2Form.accident_location;
        selectedInjury.value = step2Form.injury_type;
        selectedBodyInjured.value = step2Form.injured_part;
        selectedAccidentInvolve.value = step2Form.confined_accident;

        //step3

        // Check if the document was found
        if (phPassport) {
            console.log('PH Passport Details:', phPassport);

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

</script>

<template>
    <GlobalLayout fullWidth>
        <section class="flex flex-col gap-8 py-6 px-6 max-w-screen-lg mx-auto">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="5" />
                <Title title="Review Summary" />
                <Subtitle subtitle="Please review summary before proceeding" />
            </div>

        </section>

        <section class="bg-[#f1f1f1]">
            <div class="py-6 px-6 max-w-screen-lg mx-auto">
                <div class="space-y-2 flex justify-between items-center text-center">
                    <Title title="Claims Details" class="!text-xl" />

                    <a href="/step-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
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

                <div class="py-2">
                    <p>Accident Date</p>
                    <h3 class="font-bold">{{ dateValue }}</h3>
                </div>

                <div class="py-2">
                    <p>Accident Location</p>
                    <h3 class="font-bold">{{ inputValue }}</h3>
                </div>

                <div class="py-2">
                    <p>Injury Type</p>
                    <h3 class="font-bold">{{ selectedInjury }}</h3>
                </div>

                <div class="py-2">
                    <p>Part of body injured</p>
                    <h3 class="font-bold">{{ selectedBodyInjured }}</h3>
                </div>

                <div class="pt-2">
                    <p>Did the accident involved confinement, surgery, or dismemberment?</p>
                    <h3 class="font-bold">{{ selectedAccidentInvolve }}</h3>
                </div>

                <Divider class="bg-black" />

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

                <div class="py-2">
                    <p>Date of birth</p>
                    <h3 class="font-bold">{{ dob }}</h3>
                </div>

                <div class="py-2">
                    <p>Sex</p>
                    <h3 class="font-bold">{{ sex }}</h3>
                </div>

                <div class="py-2">
                    <p>Nationality</p>
                    <h3 class="font-bold">{{ nationality }}</h3>
                </div>

                <div class="pt-2">
                    <p>Place of birth</p>
                    <h3 class="font-bold">{{ pob }}</h3>
                </div>

                <Divider class="bg-black" />

                <div class="pb-2">
                    <p>Account Name</p>
                    <h3 class="font-bold">{{ account_name }}</h3>
                </div>

                <div class="py-2">
                    <p>Bank Account Number</p>
                    <h3 class="font-bold">{{ bank_number}}</h3>
                </div>

                <div class="py-2">
                    <p>Bank Name</p>
                    <h3 class="font-bold">{{ bank_name }}</h3>
                </div>

                <div class="py-2">
                    <p>Type of Account</p>
                    <h3 class="font-bold">{{type_of_account}}</h3>
                </div>

                <div class="py-4 space-y-3">
                    <f7-button fill round large class="md:w-9/12 mx-auto uppercase" @click="NextPage()">Submit Claim</f7-button>
                    <f7-button outline round large href="/step-4" class="md:w-9/12 mx-auto uppercase">Back</f7-button>
                </div>
            </div>

        </section>




    </GlobalLayout>
</template>