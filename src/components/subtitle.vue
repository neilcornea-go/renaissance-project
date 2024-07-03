<script setup>
const props = defineProps({
  subtitle: String
});

</script>

<template>
    <p class="text-sm text-base text-gray-500">{{ props.subtitle }}</p>
</template>