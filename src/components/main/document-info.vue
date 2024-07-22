<script setup>
import { toRefs } from "vue";
const props = defineProps({
    type: {
        type: String,
        default: ''
    },
    document_type: {
        type: String,
        default: ''
    },
    files: {
        type: [File, Array, FileList, Object],
        default: {}
    },
    delete_icon: {
        type: Boolean,
        default: true
    }
});
const emits = defineEmits(['update:files']);
const propsToRefs = toRefs(props);
const { files } = propsToRefs;
const removeDocument = (i) =>{
    var f = files.value
    console.log(i)
    f.splice(i, 1)
    emits('update:files', f);
}

</script>

<template>
    <div class="mb-3">
        <div v-for="file, index in files">
            <div :class="type === 'error' ? 'bg-white border-b-2 border-[#1f78ad]' : 'bg-gray-100 hover:bg-gray-200'" class="flex justify-between flex-wrap items-center p-4 my-2 rounded transition ease-in">
                <div class="flex flex-row justify-center gap-2 align-items-center">
                    <span class="text-gray-500">
                        <svg class="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"
                                d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                        </svg>
                    </span>
                    <div class="flex flex-direction-column">
                        <span class="text-gray-500 font-bold">{{file.file.name.length >= 15 ? file.file.name.slice(0, 15)+`...`+file.file.name.slice(file.file.name.length - 5, file.file.name.length) : file.file.name}}</span>
                        <span class="text-gray-400 font-semibold text-xs uppercase">{{file.document_type}}</span>
                        <span class="text-gray-400 font-semibold text-xs uppercase"> {{file.confidence_rate ? 'Confidence: '+ file.confidence_rate : ''}}</span>
                    </div>
                    
                </div>

                <div class="flex flex-row gap-2 md:gap-8">
                    <span class="text-gray-500">{{((file.file.size/1024)/1024).toFixed(2)}}MB</span>
                    <!-- View Action -->
                    <span
                        class="text-blue-500 hover:text-blue-600 uppercase font-medium hover:underline cursor-pointer">View
                    </span>
                    <!-- Remove Action -->
                    <span v-show="delete_icon" class="text-gray-500 hover:text-red-500 transition ease-in cursor-pointer" @click="removeDocument(index)">
                        <svg class="w-[20px] h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </span>
                </div>
            </div>
         </div>
    </div>
</template>