<template>
  <MultiSelect
    v-model="modelValue"
    v-bind="$attrs"
    :options="options"
    :optionLabel="optionLabel"
    :placeholder="placeholder"
    :filter="filter"
    fluid
    :class="selectClasses"
  />
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import MultiSelect from 'primevue/multiselect';

interface Props {
  options: T[];
  optionLabel?: string;
  placeholder?: string;
  filter?: boolean;
}

withDefaults(defineProps<Props>(), {
  optionLabel: 'label',
  placeholder: '',
  filter: true,
});

const modelValue = defineModel<T[]>();

const selectClasses = computed(() => {
  return 'w-full! py-1.5! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition! bg-white!';
});
</script>
