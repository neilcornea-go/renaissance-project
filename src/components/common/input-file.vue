<script setup>

import { toRefs, onMounted} from "vue";
import { analyzeDocument, getDocumentAnalysis } from "../../../src/js/hooks/documentClassifierAnalysis.js"

const props = defineProps({
    modelValue: {
        type: [File, Array, FileList, Object],
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        default: []
    }
});

const propsToRefs = toRefs(props);
const { images } = propsToRefs;

const emits = defineEmits(['update:modelValue']);


const updateValue = async (event) => {
    const file = event.target.files;

    console.log(event);
        
    // Check if a file is selected
    if (!file) return;

    for(let files = 0; files < file.length; files++){

        // Check if file type is supported
        const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'image/jpeg'];
        if (!allowedTypes.includes(file[files].type)) {
            alert(file[files].name+' format is not accepted. Supported file types are: .doc, .docx, .pdf, .jpg. Upload again.');
            return;
        }

        // Check file size (max. 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file[files].size > maxSize) {
            alert(file[files].name+' is more than 5MB. Maximum file size allowed is 5MB. Upload again.');
            return;
        }



        if(files === (file.length - 1)){

            var x = Array.from(file);
            const val = await classifyDoc(x);
            console.log(val)
            emits('update:modelValue', val);
        }

    }

};

const classifyDoc = async (value) => {

    var documents = []
    for(let i=0; i < value.length; i++){
        try {
            const res = await analyzeDocument({
                _overload: 'classifyDocument',
                'api-version' : '2024-02-29-preview'
            }, {
                'base64Source': await getBase64(value[i])
            });
            console.log(res, 'classifying doc', res.data.headers['operation-location']);
            var newFile = {file: value[i], operation_location: res.data.headers['operation-location'], document_type: '', confidence_rate: ''}
            documents.push(newFile)
            console.log(newFile)

        } catch (error) {}

        if(i === (value.length - 1)){
            const container = {claim_type: '', documents}
            console.log(documents, 'new file array')
            return container;
        }
    }

}

const getBase64 = (value) => {
    var reader = new FileReader();
    reader.readAsDataURL(value);
    return new Promise((resolve, reject) => {
        reader.onload = function(event) {
        resolve(event.target.result.split(',')[1]);
      };
    })
}

</script>

<template>
    <div
        class="relative w-full border border-gray-400 rounded p-8 text-center bg-gray-100 hover:bg-gray-200 transition ease-in delay-75 cursor-pointer">
        <span class="text-base font-normal text-gray-700">Click to upload</span>
        <input @change="updateValue" type="file" class="absolute inset-0 opacity-0 cursor-pointer" multiple/>
    </div>
</template>