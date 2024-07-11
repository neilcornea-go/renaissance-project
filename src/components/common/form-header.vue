<script setup>
const props = defineProps({
  title: String,
  link: String
});
</script>

<template>
  <div class="flex justify-between mb-6">
    <h3 class="text-gray-700 text-lg font-medium">{{ props.title }}</h3>
    <f7-link class="text-blue-600 hover:text-blue-700 underline uppercase text-sm font-medium"
             :href="props.link" external>
      View File
    </f7-link>
  </div>
</template>