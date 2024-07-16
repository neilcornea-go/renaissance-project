<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';

// Documents Form Details
import GovernmentIDForm from '../components/form/governmentid-form.vue';
import NarationReportForm from '../components/form/naration-report-form.vue';
import HospitalStatementForm from '../components/form/hospital-statement-form.vue';
import MedicalCertificateForm from '../components/form/medical-certificate-form.vue';

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-2">
                <StepIndicator step="3" />
                <f7-progressbar color="blue" :progress="10" />
                <Title title="Verify Claim Details" />
                <Subtitle
                    subtitle="Kindly check and verify that the details are accurate or you can click to edit the details." />
            </div>

            <!-- Forms Container -->
            <div>
                <GovernmentIDForm />
                <!-- <NarationReportForm /> -->
                <!-- <HospitalStatementForm /> -->
                <!-- <MedicalCertificateForm /> -->
            </div>
        </section>
    </GlobalLayout>
</template>

<style scoped>
.progressbar {
    height: 7px;
    border-radius: 10px;
}
</style>