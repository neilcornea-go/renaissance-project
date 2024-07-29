<script setup>
import { ref, onMounted } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';
import OTPModal from '../components/main/otp-modal.vue';
import ClaimsInfo from '../components/main/claims-info.vue';
import { f7 } from 'framework7-vue';

// Form Input Components
import InputText from '../components/common/input-text.vue';
import InputDate from '../components/common/input-date.vue';
import Dropdown from '../components/common/dropdown.vue';
import Checkbox from '../components/common/checkbox.vue';

// Composable
import { useStaticData } from '../composable/useStaticData';
const { typeInjuryOptions, partBodyInjuredOptions, mainCheckboxOptions, natureDeathOptions, relationshipOptions } = useStaticData();

// Data Hook
const accidentPOI = ref('');
const accidentDate = ref('');
const isOpenOTP = ref(false);
const selectedInjury = ref('Contusion Injury');
const selectedBodyInjured = ref('Head');
const selectedAccidentInvolve = ref('Yes');
const selectedAccidentDisablement = ref('Yes');
const selectedNatureDeath = ref('Illness');
const selectedRelationship = ref('Spouse');
const data = ref({})
const form = ref({})

onMounted(() => {
    renderData();
});


const renderData = async () => {
    try {
        const getResponse = await localStorage.getItem('documents_shortlist');
        data.value = JSON.parse(getResponse);

        const getResponseForm = await localStorage.getItem('form');
        form.value = JSON.parse(getResponseForm);
        console.log(data.value)
        console.log(form.value)
        passValues();
    }
    catch (error) {
        console.error('Failed to render data:', error)
    }
}

const passValues = async() => {
    if(data.value.claim_type === 'accident'){
        console.log('accident')
        // accidentDate.value = documents[1].fields.pr_dor.content;

    const x = await data.value.documents.map(e => {
        if(e.docType === 'police-narration-report'){
            return {pr_dor: e.fields.pr_dor.content, pr_poi: e.fields.pr_poi.content};
        }
        else return ''
    })


    var y =  (x.filter(function (item){
        if(item !== ''){
            return x
        }
    }))[0]
    
    // var edit = y.substring(0, y.length-1)
    console.log(y.pr_dor)
    accidentDate.value = form.value.claim_details.accident_date || formatDate(y.pr_dor)
    accidentPOI.value = form.value.claim_details.accident_location || y.pr_poi
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const handleBack = () => {
        goTo('/step-1');
}

const goTo = (route) => {
        f7.views.main.router.navigate(route, {
            animate: false
        });

}

const doneOTP = (x) => {
    if(x){
        var claimsData = {
        claim_type: data.value.claim_type,
        accident_date: accidentDate.value,
        accident_location: accidentPOI.value,
        injury_type: selectedInjury.value,
        injured_part: selectedBodyInjured.value,
        confined_accident: selectedAccidentInvolve.value,
        lead_disablement: selectedAccidentDisablement.value
        }

        console.log(claimsData)

        console.log(JSON.parse(localStorage.getItem('form')))
        // get the form
        var getForm = JSON.parse(localStorage.getItem('form'))

            //get document shortlist
            var getDocumentShortlist = JSON.parse(localStorage.getItem('documents_shortlist'))
            
            //get the documents in document shortlist
            getForm.documents = getDocumentShortlist.documents

        // add a content in the claim details in form
        getForm.claim_details = {...claimsData}
        // remove first what is in localstorage
        localStorage.removeItem('form');        
        //then set again the new form
        localStorage.setItem('form', JSON.stringify(getForm))
        console.log(getForm)
    }
}

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-2">
                <StepIndicator step="2" />
                <f7-progressbar color="#d31145" :progress="40" />
                <Title title="Verify Claim Details" />
                <Subtitle
                    subtitle="Kindly check and verify that the details are accurate or you can click to edit the details." />
            </div>

            <!-- Claims Info -->
            <ClaimsInfo :type="data.claim_type" />

            <!-- Edit Result Form - Accident Claims -->
            <div class="flex flex-col">
                <!-- Inputs -->
                <InputDate type="date" v-model="accidentDate" label="Accident date" />
                <InputText v-model="accidentPOI" label="Accident Location" placeholder="Enter accident location" />

                <!-- Injury Type Dropdown -->
                <Dropdown v-model="selectedInjury" label="Injury type" :data="typeInjuryOptions" />

                <!-- Part of body injured -->
                <Dropdown v-model="selectedBodyInjured" label="Part of body injured" :data="partBodyInjuredOptions" />

                <!-- Accident Involve Checkbox -->
                <Checkbox title="Did the accident involve confinement, surgery, or dismemberment?"
                    :data="mainCheckboxOptions" v-model="selectedAccidentInvolve" />

                <!-- Accident Involve Checkbox -->
                <Checkbox title="Did the accident lead to disablement?" :data="mainCheckboxOptions"
                    v-model="selectedAccidentDisablement" />
            </div>

            <!-- Edit Result Form - Death Claims (Temporary Hidden)  -->
            <div class="flex flex-col hidden">

                <!-- Nature of Death -->
                <Checkbox title="What was the nature of death?" :data="natureDeathOptions"
                    v-model="selectedNatureDeath" />

                <Dropdown label="What is your relationship to the deceased?" :data="relationshipOptions"
                    v-model="selectedRelationship" />

                <Divider />

                <!-- Send OTP to -->
                <div class="bg-gray-100 space-y-2 p-4 rounded-lg">
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="beneficiary" class="form-radio h-4 w-4 text-gray-600" checked>
                        <div>
                            <span class="font-medium">JXXX Smith (Beneficiary 1)</span>
                            <p class="text-gray-500">XXXXXX7453</p>
                        </div>
                    </label>

                    <Divider />

                    <label class="flex items-center space-x-2">
                        <input type="radio" name="beneficiary" class="form-radio h-4 w-4 text-gray-600">
                        <div>
                            <span class="font-medium">HXXXX Smith (Beneficiary 2)</span>
                            <p class="text-gray-500">XXXXXX1322</p>
                        </div>
                    </label>
                </div>
            </div>

            <!-- OTP Popup -->
            <OTPModal :isOpen="isOpenOTP" @otpDone="doneOTP" @update:isOpen="isOpenOTP = $event" />

            <!-- Action Button -->
            <div class="bg-white my-3 space-y-4">
                <f7-button fill large @click="isOpenOTP = true">Next</f7-button>
                <f7-button class="border-red-600" outline large @click="handleBack()">Back</f7-button>
            </div>
        </section>
    </GlobalLayout>
</template>

<style scoped>

.otp-popup {
    height: 100%;
    width: 100%;
    left: 55%;
    top: 60%;
    max-width: 500px;
    max-height: 380px;
    border-radius: 12px;
}

@media (max-width: 630px) {
    .otp-popup {
        height: 100%;
        width: 90%;
        left: 5%;
        top: 20%;
        border-radius: 12px;
    }
}
</style>