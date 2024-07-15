<script setup>
const props = defineProps({
    modelValue: {
        type: [File, Array],
        default: () => []
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    const file = event.target.files[0];
    
    // Check if a file is selected
    if (!file) return;

    // Check if file type is supported
    const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
        alert('Supported file types are: .doc, .docx, .pdf, .jpg');
        return;
    }

    // Check file size (max. 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('Maximum file size allowed is 5MB');
        return;
    }

    // Emit the selected file(s)
    emits('update:modelValue', file);
};
</script>

<template>
    <div
        class="relative w-full border border-gray-400 rounded p-8 text-center bg-gray-100 hover:bg-gray-200 transition ease-in delay-75 cursor-pointer">
        <span class="text-base font-normal text-gray-700">Click to upload</span>
        <input @change="updateValue" type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
    </div>
</template>