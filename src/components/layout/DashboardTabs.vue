<template>
  <section class="flex gap-2 p-2 bg-white border-b border-gray-200 shrink-0">
    <Button v-for="tab in tabs" :key="tab" variant="tab" :label="tab" :fluid="false" />
  </section>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
const tabs = ['Calendar View', 'Booking History', 'Booking Statistics', 'Cancel Request'];
</script>

<style scoped></style>
