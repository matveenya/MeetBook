<template>
  <section class="flex gap-2 p-2 bg-white border-b border-gray-200 shrink-0">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-500 cursor-pointer bg-[#F0F1F3] hover:bg-[#172736] hover:text-white focus:bg-[#172736] focus:text-white transition"
    >
      {{ tab }}
    </button>
  </section>
</template>

<script setup lang="ts">
const tabs = ['Calendar View', 'Booking History', 'Booking Statistics', 'Cancel Request'];
</script>

<style scoped></style>
