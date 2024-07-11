<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import FormHeader from '../components/common/form-header.vue';

// Documents Form Details
import GovernmentIDForm from '../components/main/governmentid-form.vue';

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

            <!-- Edit Document Details -->
            <f7-tabs animated>
                <f7-tab id="tab-1" class="page-content" tab-active>
                    <FormHeader title="Government ID" link="https://www.google.com/" />
                    <GovernmentIDForm />

                    <!-- Action Button -->
                    <div class="space-y-4">
                        <f7-button fill round large tab-link="#tab-2">Next</f7-button>
                        <f7-button outline round large>Back</f7-button>
                    </div>
                </f7-tab>
                <f7-tab id="tab-2" class="page-content" e>
                    <f7-block>
                        <p>Tab 2 content</p>
                    </f7-block>

                    <div class="space-y-4">
                        <f7-button fill round large tab-link="#tab-3">Next</f7-button>
                        <f7-button outline round large tab-link="#tab-1">Back</f7-button>
                    </div>
                </f7-tab>
                <f7-tab id="tab-3" class="page-content">
                    <f7-block>
                        <p>Tab 3 content</p>
                    </f7-block>

                    <div class="space-y-4">
                        <f7-button fill round large tab-link="#tab-4">Next</f7-button>
                        <f7-button outline round large tab-link="#tab-2">Back</f7-button>
                    </div>
                </f7-tab>
                <f7-tab id="tab-4" class="page-content">
                    <f7-block>
                        <p>Tab 4 content</p>
                    </f7-block>

                    <div class="space-y-4">
                        <f7-button fill round large tab-link="#tab-5">Next</f7-button>
                        <f7-button outline round large tab-link="#tab-3">Back</f7-button>
                    </div>
                </f7-tab>
                <f7-tab id="tab-5" class="page-content">
                    <f7-block>
                        <p>Tab 5 content</p>
                    </f7-block>

                    <div class="space-y-4">
                        <f7-button fill round large>Next</f7-button>
                        <f7-button outline round large tab-link="#tab-4">Back</f7-button>
                    </div>
                </f7-tab>
            </f7-tabs>
        </section>
    </GlobalLayout>
</template>

<style scoped>
.progressbar {
    height: 7px;
    border-radius: 10px;
}
</style>