<script setup>
import { analyzeDocument } from "../../../src/js/hooks/documentClassifierAnalysis.js"

const props = defineProps({
    modelValue: {
        type: [File, Array, FileList, Object],
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['update:modelValue']);


const updateValue = async (event) => {
    const file = event.target.files;

    // Check if a file is selected
    if (!file) return;

    console.log(file);

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
            const base64Files = await Promise.all(Array.from(x).map(async (file) => {
                const base64 = await getBase64(file);
                const extension = file.name.split('.').pop();
                return { base64, extension };
            }));
            emits('update:modelValue', base64Files);
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
            var newFile = { file: value[i], base64URL: docBase64, operation_location: res.data.headers['operation-location'], document_type: '', confidence_rate: '', govtid: false, notIncluded: false, extracted_data: {} }
            documents.push(newFile)
            console.log(newFile)

        } catch (error) { }

        if (i === (value.length - 1)) {
            const container = { claim_type: '', documents, classified: false, govt_id: [], filter_other_doc: [], other_doc: [], not_included: [], final_documents: [] }
            console.log(documents, 'new file array')
            return container;
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
};

</script>

<template>
    <div
        class="relative w-full border border-gray-400 rounded p-8 text-center bg-gray-100 hover:bg-gray-200 transition ease-in delay-75 cursor-pointer">
        <span class="text-base font-normal text-gray-700">Test to upload</span>
        <input @change="updateValue" type="file" class="absolute inset-0 opacity-0 cursor-pointer" multiple />
    </div>
</template>