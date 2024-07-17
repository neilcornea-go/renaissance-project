<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  data: Array,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const handleSelect = (value) => {
  selectedValue.value = value;
};

const selectedClass = (value) => selectedValue.value === value ? 'bg-gray-200' : 'bg-white hover:bg-gray-50';
</script>

<template>
  <div class="space-y-2 mb-4">
    <p class="text-base text-gray-700 font-medium">{{ title }}</p>
    <div class="flex w-full md:w-1/3">
      <label 
        v-for="label in data" 
        :key="label.id" 
        :class="[
          'flex items-center justify-center px-4 py-4 border border-gray-400 cursor-pointer w-1/2', 
          selectedClass(label.option)
        ]"
        @click="handleSelect(label.option)"
      >
        <input type="checkbox" class="hidden" :checked="selectedValue === label.option">
        {{ label.option }}
      </label>
    </div>
  </div>
</template>
