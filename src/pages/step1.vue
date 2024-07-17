<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';
import DocumentInfo from '../components/main/document-info.vue';
import ChecklistPopup from '../components/main/checklist-popup.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputFile from '../components/form/input-file.vue';

import { getDocumentAnalysis } from "../../src/js/hooks/documentClassifierAnalysis.js"

const inputValue = ref('');
const selectedFiles = ref({});
const multiple = ref(true);

const validateDocuments = () => {
    console.log(selectedFiles)
    console.log('validate')

}

const getDocuments = async() => {
    console.log(selectedFiles.value.documents)
    selectedFiles.value.documents.forEach(async (x) => {
        console.log(x.operation_location)
        const res = await getDocumentAnalysis(x.operation_location);
        console.log(res);
        console.log(
        'confidence rate: ' + Number(res.data.data.analyzeResult.documents[0].confidence)*100 +'%',
        res.data.data.analyzeResult.documents[0].docType);
        
        x.document_type = res.data.data.analyzeResult.documents[0].docType
        x.confidence_rate = (Number(res.data.data.analyzeResult.documents[0].confidence)*100).toFixed(2) + '%'
    })
    
    console.log(selectedFiles.value)
}

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="1" />
                <Title title="Submit a Claim" />
                <Subtitle
                    subtitle="Let us know about your claim by entering your policy number and uploading all the required documents." />
            </div>

            <!-- Upload Documents -->
            <div class="flex flex-col gap-4">
                <!-- Policy Number Input -->
                <InputText v-model="inputValue" label="Policy number" placeholder="e.g. 123456789B" />

                <Divider />

                <!-- Title Header -->
                <div class="space-y-2">
                    <h2 class="text-gray-700 text-lg font-medium">Upload documents</h2>
                    <p class="flex items-center gap-1 text-blue-500">
                        <svg class="w-[20px] h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="cursor-pointer hover:underline popup-open" data-popup=".checklist-popup">View
                            document checklist</span>
                    </p>
                </div>

                <!-- Checklist Popup -->
                <ChecklistPopup />
                
                <!-- Click to Upload Action -->
                <div class="space-y-2">
                    <InputFile v-model="selectedFiles" multiple/>
                    <span class="text-gray-500">Supported files: doc, docx, pdf, jpg (max. 5MB)</span>
                </div>

                <!-- Documents List -->
                <div>
                    <DocumentInfo type="normal" :files="selectedFiles"/>
                    <!-- {{selectedFiles[0].name}} -->
                </div>

                <!-- Error Prompt -->
                <div class="bg-gray-100 px-4 py-8 rounded">
                    <p class="text-red-500 text-base mb-4">It appears that you are filing a claim for an accident.
                        The document(s) below will be removed as they are not required.
                    </p>

                    <!-- Error Documents List -->
                    <DocumentInfo type="error" />
                </div>
                 <!-- Action Button -->
                 <div class="bg-white my-3">
                    <f7-button fill round large @click="getDocuments()">Verify Documents</f7-button>
                </div>

                <!-- Action Button -->
                <div class="bg-white my-3">
                    <f7-button fill round large @click="validateDocuments()" :disabled="Object.keys(selectedFiles).length === 0">Validate</f7-button>
                </div>
            </div>
        </section>
    </GlobalLayout>
</template>