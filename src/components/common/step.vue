<script setup>
const props = defineProps({
  step: String
});

</script>

<template>
    <span class="font-semibold text-base text-gray-600 uppercase">
        Step {{ props.step }} of 5
    </span>
</template>