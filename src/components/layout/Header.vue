<template>
  <header
    class="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 shrink-0"
  >
    <h2 class="text-lg font-bold">MeetBook Dashboard</h2>
    <div class="flex items-center gap-4">
      <Button variant="icon">
        <i class="pi pi-bell text-[#3E5CE9] cursor-pointer"></i>
      </Button>
      <div class="flex flex-row gap-5 text-right">
        <div class="text-sm font-bold pt-4 whitespace-nowrap">{{ userName }}</div>
        <Button @click="$emit('logout')" variant="danger" label="Logout" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from '../ui/Button.vue';
defineProps<{
  userName: string;
}>();
defineEmits(['logout']);
</script>

<style scoped></style>
