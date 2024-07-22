<script setup>
import { ref } from "vue";
import GlobalLayout from "../components/structure/layout.vue";
import StepIndicator from "../components/common/step.vue";
import Title from "../components/common/title.vue";
import Subtitle from "../components/common/subtitle.vue";
import Divider from "../components/common/divider.vue";
import DocumentInfo from "../components/main/document-info.vue";
import ChecklistPopup from "../components/main/checklist-popup.vue";

// Form Input Components
import InputText from "../components/common/input-text.vue";
import InputFile from "../components/common/input-file.vue";

import { f7 } from 'framework7-vue';

import {
    getDocumentAnalysis,
    analyzeModelDocument,
    getExtractedDocument
} from "../../src/js/hooks/documentClassifierAnalysis.js";


import { useDocumentsStore } from "../../src/js/stores/documents.js"
const storeDocument = useDocumentsStore();

const inputValue = ref("");
const selectedFiles = ref({});
const classified = ref(false);

const getDocuments = async () => {
    console.log(selectedFiles.value.documents);
    const docs = selectedFiles.value.documents;
    //govt list of IDs
    const govtID = ["ph-passport", "drivers-license"];
    const otherDocs = [
        "police-narration-report",
        "hospital-statement",
        "medical-certificate",
        "death-certificate",
        "marriage-certificate",
    ];
    const accident = [
        "ph-passport",
        "drivers-license",
        "police-narration-report",
        "hospital-statement",
    ];
    const illness = [
        "ph-passport",
        "drivers-license",
        "medical-certificate",
        "hospital-statement",
    ];
    const death = [
        "ph-passport",
        "drivers-license",
        "death-certificate",
        "marriage-certificate",
    ];
    var scoring = [
        { name: "accident", score: 0 },
        { name: "illness", score: 0 },
        { name: "death", score: 0 },
    ];
    for (let i = 0; i < docs.length; i++) {
        var x = docs[i];
        const res = await getDocumentAnalysis(x.operation_location);
        console.log(res);
        console.log(
            "confidence rate: " +
            Number(res.data.data.analyzeResult.documents[0].confidence) * 100 +
            "%",
            res.data.data.analyzeResult.documents[0].docType
        );

        x.document_type = res.data.data.analyzeResult.documents[0].docType;
        x.confidence_rate =
            (
                Number(res.data.data.analyzeResult.documents[0].confidence) * 100
            ).toFixed(2) + "%";
        x.govtid = govtID.includes(
            res.data.data.analyzeResult.documents[0].docType
        );
        x.notIncluded = accident.includes(
            res.data.data.analyzeResult.documents[0].docType
        );

        if (accident.includes(res.data.data.analyzeResult.documents[0].docType)) {
            scoring[0].score = scoring[0].score + 1;
        }

        if (illness.includes(res.data.data.analyzeResult.documents[0].docType)) {
            scoring[1].score = scoring[1].score + 1;
        }

        if (death.includes(res.data.data.analyzeResult.documents[0].docType)) {
            scoring[2].score = scoring[2].score + 1;
        }

        if (govtID.includes(res.data.data.analyzeResult.documents[0].docType)) {
            selectedFiles.value.govt_id.push(docs[i]);
        }

        if (otherDocs.includes(res.data.data.analyzeResult.documents[0].docType)) {
            selectedFiles.value.other_doc.push(docs[i]);
        }

        if (i === docs.length - 1) {
            scoring.sort((a, b) => b.score - a.score);
            const max = scoring[0].score;
            console.log(scoring, max, scoring[0].name);
            selectedFiles.value.claim_type = scoring[0].name;

            const filter_otherDoc = selectedFiles.value.other_doc;
            console.log(filter_otherDoc);
            for (let y = 0; y < filter_otherDoc.length; y++) {
                if (selectedFiles.value.claim_type === "accident") {
                    console.log(accident.includes(filter_otherDoc[y].document_type));
                    if (accident.includes(filter_otherDoc[y].document_type)) {
                        selectedFiles.value.filter_other_doc.push(filter_otherDoc[y]);
                    } else {
                        selectedFiles.value.not_included.push(filter_otherDoc[y]);
                    }
                }
                if (selectedFiles.value.claim_type === "illness") {
                    if (illness.includes(filter_otherDoc[y].document_type)) {
                        selectedFiles.value.filter_other_doc.push(filter_otherDoc[y]);
                    } else {
                        selectedFiles.value.not_included.push(filter_otherDoc[y]);
                    }
                }
                if (selectedFiles.value.claim_type === "death") {
                    if (death.includes(filter_otherDoc[y].document_type)) {
                        selectedFiles.value.filter_other_doc.push(filter_otherDoc[y]);
                    } else {
                        selectedFiles.value.not_included.push(filter_otherDoc[y]);
                    }
                }
            }
        }
    }
    selectedFiles.value.classified = true;
    classified.value = true;

    console.log(selectedFiles.value);
};

const proceedDocuments = async () => {
    if (localStorage.getItem('use_document_store') === null) {
        //   const govtid = selectedFiles.value.govt_id;

        console.log(selectedFiles.value.govt_id);

        const combine_docs = selectedFiles.value.govt_id.concat(
            selectedFiles.value.filter_other_doc
        );
        console.log("combine docs", combine_docs);

        const combine_final_docs = [];
        for (let x = 0; x < combine_docs.length; x++) {
            const res = await analyzeModelDocument(
                {
                    _overload: "analyzeDocument",
                    "api-version": "2024-02-29-preview",
                },
                {
                    base64Source: combine_docs[x].base64URL,
                },
                {
                    modelID: combine_docs[x].document_type,
                }
            );

            if (res.ok) {
                delete combine_docs[x].base64URL;
                var verified_doc = {
                    ...combine_docs[x],
                    operation_location_verify: res.data.headers["operation-location"],
                };
                combine_final_docs.push(verified_doc);
            }

            if (x === combine_docs.length - 1) {
                selectedFiles.value.final_documents = combine_final_docs;
                console.log("verified documents", selectedFiles.value);

                // storeDocument.persistDocument(selectedFiles.value)
                console.log(storeDocument.document)

                f7.dialog.confirm('Extract data now?', () => {
                    // f7.dialog.alert('Great!');
                    extractDocuments();
                });


            }
        }

    }
};

const extractDocuments = async () => {

    var final_docs = selectedFiles.value.final_documents
    for (let i = 0; i < final_docs.length; i++) {
        var x = final_docs[i];
        const res = await getExtractedDocument(x.operation_location_verify);
        console.log(res);
        if (res.ok) {
            x.extracted_data = res.data
        }

        if(i === (final_docs.length - 1)){            
            // localStorage.setItem('documents_full', JSON.stringify(selectedFiles.value))
            console.log('with json', selectedFiles.value)

            moveDocuments(selectedFiles.value);

        }
    }
    
} 

const moveDocuments = (data) => {
    console.log(data)
    var documents_basic = []
    var df = data.final_documents
    for(let i=0; i < df.length; i++){
        // console.log(df[i].extracted_data.data.analyzeResult)
        var d = df[i].extracted_data.data.analyzeResult.documents[0]
        var x = {
            docType: d.docType, 
            confidence: d.confidence,
            fields: d.fields}
        documents_basic.push(x)
    if(i === (df.length - 1)){
        localStorage.setItem('documents_shortlist', JSON.stringify(documents_basic))
        console.log('added documents_list in the localStorage')
    }
    }


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
                    <InputFile v-model="selectedFiles" multiple />
                    <span class="text-gray-500">Supported files: doc, docx, pdf, jpg (max. 5MB)</span>
                </div>

                <!-- Documents List -->
                <!-- government id -->
                <div v-if="!selectedFiles.classified">
                    <DocumentInfo type="normal" :files="selectedFiles.documents" />
                    <!-- {{selectedFiles[0].name}} -->
                </div>
                <div v-else>
                    <span class="text-gray-500 font-semibold text-xs uppercase">Government ID</span>

                    <DocumentInfo v-if="selectedFiles.govt_id.length <= 1" type="normal"
                        :files="selectedFiles.govt_id" />

                    <div v-else class="bg-gray-100 px-4 py-8 rounded">
                        <p class="text-red-500 text-base mb-4">
                            You are uploading more than 1 government ID, please delete the
                            other IDs.
                        </p>

                        <!-- Error Documents List -->
                        <DocumentInfo type="error" :delete_icon="true" :files="selectedFiles.govt_id" />
                    </div>

                    <span class="text-gray-500 font-semibold text-xs uppercase">Other Files</span>
                    <DocumentInfo type="normal" :files="selectedFiles.filter_other_doc" />

                    <!-- <DocumentInfo type="normal" :files="selectedFiles" document_type="otherid"/> -->
                    <!-- {{selectedFiles[0].name}} -->
                </div>

                <!-- Error Prompt -->
                <div class="bg-gray-100 px-4 py-8 rounded" v-if="classified">
                    <p class="text-red-500 text-base mb-4">
                        It appears that you are filing a claim for an
                        {{ selectedFiles.claim_type }}. The document(s) below will be
                        removed as they are not required.
                    </p>

                    <!-- Error Documents List -->
                    <DocumentInfo type="error" :delete_icon="false" :files="selectedFiles.not_included" />
                </div>
                <!-- Action Button -->
                <div class="bg-white my-3">
                    <f7-button v-if="classified" fill round large @click="proceedDocuments()">Verify</f7-button>
                    <f7-button v-else :disabled="!classified && Object.keys(selectedFiles).length === 0" fill round
                        large @click="getDocuments()">Classify</f7-button>
                </div>

            </div>
        </section>
    </GlobalLayout>
</template>
