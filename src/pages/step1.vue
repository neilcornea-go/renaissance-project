<script setup>
import { ref, onMounted, computed } from "vue";
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
import InputFile2 from "../components/common/input-file-2.vue";

import { f7 } from 'framework7-vue';

//Helpers
import { segregateDocs, scoreDocs, filterDocs, lackingDocs, checkDocs, contentCheckDocs, checkErrorDocs, removeDocuments } from "../../src/js/helpers/common.js";

import {
    getDocumentAnalysis,
} from "../../src/js/hooks/documentClassifierAnalysis.js";

import { storage, database } from '../js/firebase';
import { ref as fileRef, uploadString } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Composable
import { useStaticData } from '../composable/useStaticData';

import { useDocumentsStore } from "../../src/js/stores/documents.js"
const storeDocument = useDocumentsStore();

const policyNumber = ref("");
const selectedFiles = ref({
    claim_type: '',
    classified: false,
    documents: [],
    uploaded: [],
    filter_other_doc: [],
    final_documents: [],
    govt_id: [],
    not_included: [],
    other_doc: [],
    error_files: [],
    verified: false
});
const requiredDocs = ref({
    govtIDList: [],
    accident: []
})
const errorPolicyNumber = ref("");
const classified = ref(false);
const dataExtracted = ref(false)
const { bankDetails } = useStaticData();

// Validate Policy and Generate Claims ID
const validatePolicy = async () => {
    const found = bankDetails.value.find(test => test.policyNumber === policyNumber.value);
    if (!found) {
        errorPolicyNumber.value = "The policy number does not exist in our database.";
    } else {
        errorPolicyNumber.value = null;
        localStorage.setItem('claims-reference', generateClaimsID.value);

        var policyUser = bankDetails.value.filter(obj => obj.policyNumber === policyNumber.value)
        localStorage.removeItem("claimant");
        localStorage.setItem('claimant', JSON.stringify(policyUser[0]));
    }
};

const getDocuments = async () => {
    // Validate policy number
    console.log(selectedFiles.value.documents);

    const docs = selectedFiles.value.uploaded.length >= 1 ? selectedFiles.value.documents.concat(selectedFiles.value.uploaded) : selectedFiles.value.documents;

    console.log('combined', docs);
    //govt list of IDs
    const govtID = ["ph-passport", "drivers-license"];
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

    var classify_doc = [];
    for (let i = 0; i < docs.length; i++) {

        var x = docs[i];
        if (x.document_type === '') {
            const res = await getDocumentAnalysis(x.operation_location);
            console.log(res);
            console.log("confidence rate: " + Number(res.data.data.analyzeResult.documents[0].confidence) * 100 + "%", res.data.data.analyzeResult.documents[0].docType);

            x.document_type = res.data.data.analyzeResult.documents[0].docType;
            x.confidence_rate = (Number(res.data.data.analyzeResult.documents[0].confidence) * 100).toFixed(2) + "%";
            x.govtid = govtID.includes(res.data.data.analyzeResult.documents[0].docType);
            x.notIncluded = accident.includes(res.data.data.analyzeResult.documents[0].docType);
            x.extracted_data = res.data.data.analyzeResult.documents[0]
            classify_doc.push(x)
        }
        else {
            classify_doc.push(x)
        }
    }
    console.log(classify_doc, 'documents should include previous and new upload')
    selectedFiles.value.uploaded = []
    var classifyDoc = await segregateDocs(classify_doc) //result {govt_id_doc, other_doc}

    selectedFiles.value.govt_id = classifyDoc.govt_id_doc //assigned to govt id listing
    console.log(classifyDoc, 'segregated documents should have the old and new and in different object')
    if (classifyDoc) { //here if 2 govt ids, should not proceed
        var scoreDocsResult = await scoreDocs(classifyDoc) //result "claim" name

        if (scoreDocsResult) {
            selectedFiles.value.claim_type = scoreDocsResult
            console.log(scoreDocsResult)

            var filterDocsResult = await filterDocs(classifyDoc.other_doc, scoreDocsResult) //{final_other_docs, not_included}
            if (filterDocsResult) {

                selectedFiles.value.filter_other_doc = filterDocsResult.final_other_docs //assigned to final docs listing

                selectedFiles.value.not_included = filterDocsResult.not_included //assigned to final docs listing

                console.log(filterDocsResult)
                selectedFiles.value.classified = true;
                classified.value = true;
                console.log(selectedFiles.value)

                var lackingDocsResult = await lackingDocs(selectedFiles.value.govt_id, selectedFiles.value.filter_other_doc, scoreDocsResult) //{govtIDList, accident}
                console.log(lackingDocsResult)
                requiredDocs.value = lackingDocsResult
            }
        }
    }
    return;

};


const proceedDocuments = async () => {

    var checkDocsGovtResult = await checkDocs(selectedFiles.value.govt_id)

    if(checkDocsGovtResult){
        selectedFiles.value.govt_id = checkDocsGovtResult
        console.log(selectedFiles.value.govt_id)

        var checkDocsOtherResult = await checkDocs(selectedFiles.value.filter_other_doc)
        if(checkDocsOtherResult){
        selectedFiles.value.filter_other_doc = checkDocsOtherResult
        console.log(selectedFiles.value.filter_other_doc)
        
        f7.dialog.confirm('Extract data now?', () => {
            // f7.dialog.alert('Great!');
            contentCheck();
        });
        }
    }
};

const contentCheck = async () => {
    
    console.log(selectedFiles.value.govt_id)
    
    var checkDocsGovtResult = await contentCheckDocs(selectedFiles.value.govt_id)
    if(checkDocsGovtResult){
        console.log(checkDocsGovtResult)
        selectedFiles.value.govt_id = checkDocsGovtResult

        var checkDocsOthersResult = await contentCheckDocs(selectedFiles.value.filter_other_doc)
        if(checkDocsOthersResult){
            console.log(checkDocsOthersResult)
            selectedFiles.value.filter_other_doc = checkDocsOthersResult

            filterErrorDocs()

        }
    }
}

const filterErrorDocs = async () => {

    const res = await checkErrorDocs(selectedFiles.value.govt_id)
    if(res){
        console.log(res)
        if(res.error_docs.length === 0){selectedFiles.value.govt_id = res.safe_docs}
        else {
            selectedFiles.value.govt_id = res.safe_docs; 
            var combine = selectedFiles.value.error_files.concat(res.error_docs)
            selectedFiles.value.error_files = combine
        }           

    }
    const resOther = await checkErrorDocs(selectedFiles.value.filter_other_doc)
    if(resOther){
    console.log(resOther)
        if(resOther.error_docs.length === 0){selectedFiles.value.filter_other_doc = resOther.safe_docs}
        else {
            selectedFiles.value.filter_other_doc = resOther.safe_docs; 
            var combine = selectedFiles.value.error_files.concat(resOther.error_docs)
            selectedFiles.value.error_files = combine
        }
    }
    
    console.log(selectedFiles.value)
    selectedFiles.value.verified = true

    var rem = await removeDocsinDocuments()

    var lackingDocsResult = await lackingDocs(selectedFiles.value.govt_id, selectedFiles.value.filter_other_doc, selectedFiles.value.claim_type) //{govtIDList, accident}
    console.log(lackingDocsResult)
    requiredDocs.value = lackingDocsResult

    if(lackingDocsResult.accident.length === 0 && lackingDocsResult.govtIDList.length === 1){
        var combine_final_docs = selectedFiles.value.govt_id.concat(selectedFiles.value.filter_other_doc)
        selectedFiles.value.final_documents = combine_final_docs
        moveDocuments(selectedFiles.value);
    }

}

const removeDocsinDocuments = async() => {

    var remove_error = await removeDocuments(selectedFiles.value.error_files, selectedFiles.value.documents);
    if(remove_error){
        var remove_not_inc = await removeDocuments(selectedFiles.value.not_included, remove_error);
        if(remove_not_inc){
            console.log(remove_not_inc)
            selectedFiles.value.documents = remove_not_inc
        }
    }
}

const jumpNext = () => {
if (localStorage.getItem('documents_shortlist') !== undefined) {
    dataExtracted.value = true
}
}

const goTo = (route) => {
f7.views.main.router.navigate(route, {
    animate: false
});

}

const moveDocuments = (data) => {
    console.log(data)
    var documents_basic = []
    var df = data.final_documents
    for (let i = 0; i < df.length; i++) {
        // console.log(df[i].extracted_data.data.analyzeResult)
        var d = df[i].extracted_data.data.analyzeResult.documents[0]
        var x = {
            docType: d.docType,
            confidence: d.confidence,
            fields: d.fields
        }
        documents_basic.push(x)
        if (i === (df.length - 1)) {
            var data = { claim_type: data.claim_type, documents: documents_basic }
            localStorage.setItem('documents_shortlist', JSON.stringify(data))
            console.log('added documents_list in the localStorage')

            var form = {
                claim_type: data.claim_type,
                policy_number: policyNumber.value,
                claim_details: {},
                documents: [],
                bank_details: {}
            }
            localStorage.setItem('form', JSON.stringify(form))

            goTo('/step-2')


        }
    }


}

const documentFetch = (data) => {
    // selectedFiles.value.documents = selectedFiles.value.documents.concat(data)
    if (selectedFiles.value.classified) {
        data.forEach((e) => {
            selectedFiles.value.uploaded.push(e)
            console.log(selectedFiles.value)
        })
    }
    else {
        data.forEach((e) => {
            selectedFiles.value.documents.push(e)
        })
        // selectedFiles.value.documents.push(data)
        console.log(data)
        console.log(selectedFiles.value)

    }
}

// Upload files to cloud storage
const uploadStorage = async () => {
    const db = database;
    const claims_no = localStorage.getItem('claims-reference');

    console.log(selectedFiles.value);

    if (!Array.isArray(selectedFiles.value) || selectedFiles.value.length === 0) return;

    // Loop selected files
    for (const fileObj of selectedFiles.value) {
        const { base64, extension } = fileObj;
        const fileName = `docs_${Date.now()}.${extension}`;
        const storageRef = fileRef(storage, fileName);

        // Upload to cloud storage
        await uploadString(storageRef, base64, 'base64');

        // Add the file info in database
        await addDoc(collection(db, 'documents'), {
            claims_no: claims_no,
            document_name: fileName,
            created_at: serverTimestamp(),
        });
    }
};

// Claims ID Generator
const generateClaimsID = computed(() => {
    const prefix = "ACM";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
});

onMounted(() => {
    jumpNext();
});

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
                <InputText :error="errorPolicyNumber" @change="validatePolicy" v-model="policyNumber" label="Policy number" placeholder="e.g. 123456789B" />

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
                    <InputFile v-model="selectedFiles" multiple @fetchDocument="documentFetch" />

                    <p class="font-bold text-gray-600">Testing Upload File</p>
                    <InputFile2 v-model="selectedFiles" multiple />
                    <span class="text-gray-500">Supported files: doc, docx, pdf, jpg (max. 5MB)</span>
                </div>

                <div v-if="requiredDocs.govtIDList.length === 2 || requiredDocs.accident.length > 0">
                    <span class="text-gray-500 font-semibold text-xs uppercase">Required Documents</span>
                    <div :class="'bg-gray-100 hover:bg-gray-200'"
                        class="flex justify-between flex-wrap items-center p-4 my-2 rounded transition ease-in">
                        <div class="flex flex-row justify-center gap-2 align-items-center">
                            <div class="flex flex-direction-column">

                                <div v-if="requiredDocs.govtIDList.length === 2">
                                    <span class="text-gray-400 font-semibold text-xs uppercase">Atleast 1 government
                                        ID</span>
                                    <span class="text-gray-400 text-xs uppercase"
                                        v-for="gov in requiredDocs.govtIDList">- {{ gov.replace(/-/g, ' ') }}</span>
                                </div>

                                <span class="text-gray-400 font-semibold text-xs uppercase"
                                    v-if="requiredDocs.accident.length !== 0">Additional</span>
                                <span class="text-gray-400 text-xs uppercase" v-for="other in requiredDocs.accident">-
                                    {{ other.replace(/-/g, ' ') }}</span>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- Documents List -->
                <div v-if="selectedFiles.classified && selectedFiles.uploaded.length >= 1">
                    <span class="text-gray-500 font-semibold text-xs uppercase">Unprocessed File</span>
                    <DocumentInfo type="normal" :files="selectedFiles.uploaded" />
                </div>
                <!-- government id -->
                <div v-if="!selectedFiles.classified">
                    <DocumentInfo type="normal" :files="selectedFiles.documents" />
                </div>
                <div v-else>
                    <span class="text-gray-500 font-semibold text-xs uppercase"
                        v-if="selectedFiles.govt_id.length != 0">Government ID</span>

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

                </div>

                <!-- Error Prompt -->
                <div class="bg-gray-100 px-4 py-8 rounded" v-if="classified && selectedFiles.error_files.length !== 0">
                    <p class="text-red-500 text-base mb-4">
                        It appears that these documents contains information that is not related to the policy holder. The document(s) below will be
                        removed as they are not required.
                    </p>

                    <!-- Error Documents List -->
                    <DocumentInfo type="error" :delete_icon="false" :files="selectedFiles.error_files" />
                </div>

                <!-- Error Prompt -->
                <div class="bg-gray-100 px-4 py-8 rounded" v-if="classified && selectedFiles.not_included.length !== 0">
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

                    <f7-button v-if="selectedFiles.claim_type !== '' && selectedFiles.classified && (requiredDocs.govtIDList.length === 2 || requiredDocs.accident.length >= 1)" fill round
                        large @click="getDocuments()" :disabled="selectedFiles.uploaded.length === 0 || (requiredDocs.govtIDList.length === 1 && requiredDocs.accident.length === 0)">Classify</f7-button>

                    <f7-button v-else-if="selectedFiles.claim_type !== '' && selectedFiles.classified" fill round large
                        @click="proceedDocuments()">Verify</f7-button>

                    <f7-button v-else-if="selectedFiles.claim_type === '' && !selectedFiles.classified" fill round
                        large @click="getDocuments()">Classify</f7-button>

                    <f7-button v-else :disabled="!classified" fill round
                        large @click="getDocuments()">Classify</f7-button>
                </div>


                <div class="bg-white my-3" v-if="dataExtracted">
                    <f7-button fill large @click="goTo('/step-2')">Step 2</f7-button>
                </div>

                <f7-button fill large @click="uploadStorage()">Upload Storage</f7-button>

            </div>
        </section>
    </GlobalLayout>
</template>
