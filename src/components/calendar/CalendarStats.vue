<template>
  <div class="flex items-center gap-4">
    <div class="bg-[#F0F1F3] p-3 rounded-xl">
      <i class="pi pi-calendar text-gray-600 text-xl"></i>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-2xl font-bold">{{ totalBookings }}</span>
      <span class="text-gray-500 font-medium">Total Bookings</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalBookings: number;
}>();
</script>
