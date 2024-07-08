<script setup>
const props = defineProps({
  title: String
});

</script>

<template>
    <h2 class="font-bold text-2xl text-gray-700 uppercase">{{ props.title }}</h2>
</template>