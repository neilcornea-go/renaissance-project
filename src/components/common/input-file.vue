<script setup>
import { analyzeDocument } from "../../../src/js/hooks/documentClassifierAnalysis.js"
//Helpers
import { openPreloader } from "../../../src/js/helpers/common.js";

const props = defineProps({
    modelValue: {
        type: [File, Array, FileList, Object],
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    canUpload: {
        type: Boolean,
        default: true
    }
});

const emits = defineEmits(['update:modelValue', 'fetchDocument']);


const updateValue = async (event) => {   
    console.log('here') 
    openPreloader(true);
    const getClaimsID = localStorage.getItem('claims-reference');
    const file = event.target.files;

    console.log(event);

    // Check if claims id exist
    if (!getClaimsID) {
        alert('Enter your policy number!');
        return;
    }

    // Check if a file is selected
    if (!file){
        console.log('file is selected')
        return;
    } 

    for (let files = 0; files < file.length; files++) {

        // Check if file type is supported
        const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'image/jpeg'];
        if (!allowedTypes.includes(file[files].type)) {
            alert(file[files].name + ' format is not accepted. Supported file types are: .doc, .docx, .pdf, .jpg. Upload again.');
            return;
        }

        // Check file size (max. 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file[files].size > maxSize) {
            alert(file[files].name + ' is more than 5MB. Maximum file size allowed is 5MB. Upload again.');
            return;
        }



        if (files === (file.length - 1)) {

            var x = Array.from(file);
            const val = await classifyDoc(x);
            console.log(val)
            // emits('update:modelValue', val);
                           

            setTimeout(function() {
                emits('fetchDocument', val) 
                openPreloader(false)
            }, 8000)
            
            
        }

    }

};

const classifyDoc = async (value) => {

    var documents = []
    for (let i = 0; i < value.length; i++) {
        try {
            var docBase64 = await getBase64(value[i])
            const res = await analyzeDocument({
                _overload: 'classifyDocument',
                'api-version': '2024-02-29-preview'
            }, {
                'base64Source': docBase64
            });
            console.log(res, 'classifying doc', res.data.headers['operation-location']);
            var newFile = { file: value[i], base64URL: docBase64, operation_location: res.data.headers['operation-location'], document_type: '', confidence_rate: '', govtid: false, notIncluded: false, extracted_data: {}, error: false, errorMsg: '' }
            documents.push(newFile)
            console.log(newFile)

        } catch (error) { console.log(error)}

        if(i === (value.length - 1)){
            // const container = {claim_type: '', documents, classified: false, govt_id:[], filter_other_doc:[], other_doc:[], not_included:[], final_documents:[]}
            console.log(documents, 'new file array')
            // return container;
            return documents
        }
    }

}

const getBase64 = (value) => {
    var reader = new FileReader();
    reader.readAsDataURL(value);
    return new Promise((resolve, reject) => {
        reader.onload = function (event) {
            resolve(event.target.result.split(',')[1]);
        };
    })
}

</script>

<template>
    <div
        class="relative w-full border border-gray-400 rounded p-8 text-center bg-gray-100 hover:bg-gray-200 transition ease-in delay-75 cursor-pointer">
        <span class="text-base font-normal" :class="canUpload ? 'text-gray-300' : ' text-gray-700'">Choose documents</span>
        <input :disabled="canUpload" @change="updateValue" type="file" class="absolute inset-0 opacity-0 cursor-pointer" multiple />
    </div>
</template>