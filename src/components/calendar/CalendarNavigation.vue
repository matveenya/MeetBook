<template>
  <div class="flex items-center gap-1">
    <Button icon="pi pi-chevron-left" variant="icon" @click="$emit('prev')" />
    <span class="font-bold text-gray-800 mx-4 w-48 text-center">{{ title }}</span>
    <Button icon="pi pi-chevron-right" variant="icon" @click="$emit('next')" />
    <Button label="Today" variant="primary" class="ml-4" @click="$emit('today')" />
  </div>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';

defineProps<{
  title: string;
}>();

defineEmits(['prev', 'next', 'today']);
</script>
