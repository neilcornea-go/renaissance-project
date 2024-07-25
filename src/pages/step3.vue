<script setup>
import { ref, computed, onMounted } from 'vue';
import { f7 } from 'framework7-vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';

// Composable
import { useStaticData } from '../composable/useStaticData';

// Documents Form Details
import GovernmentIDForm from '../components/form/governmentid-form.vue';
import NarationReportForm from '../components/form/naration-report-form.vue';
import HospitalStatementForm from '../components/form/hospital-statement-form.vue';
import MedicalCertificateForm from '../components/form/medical-certificate-form.vue';
import MarriageCertificateForm from '../components/form/marriage-certificate-form.vue';
import DeathCertificateForm from '../components/form/death-certificate-form.vue';

// Firebase
import { storage, database } from '../js/firebase';
import { ref as fileRef, listAll, getDownloadURL } from "firebase/storage";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const { claimsChecklist } = useStaticData();
const data = ref([]);
const identifiedClaims = ref('');
const currentFormIndex = ref(0);
const totalSteps = 3;
const currentStep = computed(() => currentFormIndex.value + 1);
const formComponents = {
    accident: [GovernmentIDForm, NarationReportForm, HospitalStatementForm],
    death: [GovernmentIDForm, DeathCertificateForm, MarriageCertificateForm],
    illness: [GovernmentIDForm, MedicalCertificateForm, HospitalStatementForm]
};

const renderData = () => {
    try {
        const getResponse = localStorage.getItem('documents_shortlist');
        const parseResponse = JSON.parse(getResponse);
        data.value = parseResponse;
        identifiedClaims.value = data.value.claim_type;
    } catch (error) {
        console.error('Failed to render data:', error);
    }
};

const currentFormComponent = computed(() => {
    const claim = claimsChecklist.value.find(claim => claim.key === identifiedClaims.value);
    if (claim && formComponents[claim.key]) {
        return formComponents[claim.key][currentFormIndex.value];
    }
    return null;
});

const progressValue = computed(() => {
    switch (currentStep.value) {
        case 1: return 20;
        case 2: return 60;
        case 3: return 100;
        default: return 0;
    }
});

const handleBack = () => {
    if (currentFormIndex.value === 0) {
        goToPage('/step-2');
    } else {
        currentFormIndex.value--;
    }
}

const handleNext = () => {
    if (currentFormIndex.value < totalSteps - 1) {
        currentFormIndex.value++;
    } else if (currentFormIndex.value === totalSteps - 1) {
        goProceedAPI();
    }
}

const goToPage = (route) => {
    const animate = window.innerWidth <= 1023;
    f7.views.main.router.navigate(route, {
        animate: animate,
    });
};

const goProceedAPI = () => {
    // alert('Go Proceed API');

    goToPage('/step-4')
}

// Get the File Docs in the Cloud
const getFileList = ref([]);
const renderCloudFiles = async () => {
    const db = database;
    const claims_no = localStorage.getItem('claims-reference');

    const queryCollection = query(
        collection(db, "documents"),
        where("claims_no", "==", claims_no)
    );

    onSnapshot(queryCollection, (querySnapshot) => {
        const newFileList = [];
        querySnapshot.forEach((doc) => {
            newFileList.push(doc.data().document_name);
        });

        if (JSON.stringify(newFileList) !== JSON.stringify(getFileList.value)) {
            getFileList.value = newFileList;
            console.log(getFileList.value);
        }
    });
};

// Retrieve the cloud files
const getCloudFiles = async (filename) => {
    const listRef = fileRef(storage, '/');

    const res = await listAll(listRef);
    const filteredItems = res.items.filter((itemRef) => {
        return filename.includes(itemRef.name);
    });

    for (const itemRef of filteredItems) {
        const getFileURL = await getDownloadURL(itemRef);
        console.log('Get File URL:', getFileURL);
    }
};

onMounted(() => {
    renderData();
});
</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-2">
                <StepIndicator step="3" />
                <!-- <f7-progressbar color="#d31145" :progress="progressValue" /> -->
                <f7-progressbar color="#d31145" :progress="60" />
                <Title title="Verify Claim Details" />
                <Subtitle
                    subtitle="Kindly check and verify that the details are accurate or you can click to edit the details." />
            </div>

            <div>
                <!-- Dynamic Forms -->
                <component :data="data" :is="currentFormComponent" @next="handleNext" @back="handleBack" />
            </div>
        </section>
    </GlobalLayout>
</template>