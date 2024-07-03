<script setup>
import GlobalLayout from '../components/layout.vue';
import StepIndicator from '../components/step.vue';
import Title from '../components/title.vue';
import Subtitle from '../components/subtitle.vue';

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col justify-between" style="height: calc(100vh - 150px);">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="1" />
                <Title title="Submit a Claim" />
                <Subtitle
                    subtitle="Let us know about your claim by entering your policy number and uploading all the required documents." />
            </div>

            <!-- Form -->
            <div class="">
                <f7-list>
                    <f7-list-input outline label="Name" type="text" placeholder="Your name" clear-button></f7-list-input>
                </f7-list>
            </div>

            <!-- Action Button -->
            <div class="space-y-4">
                <f7-button fill round large>Next</f7-button>
                <f7-button outline round large>Back</f7-button>
            </div>
        </section>
    </GlobalLayout>
</template>