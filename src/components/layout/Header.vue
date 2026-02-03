<template>
  <header
    class="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 shrink-0"
  >
    <h2 class="text-lg font-bold">MeetBook Dashboard</h2>
    <div class="flex items-center gap-4">
      <button class="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
        <i class="pi pi-bell text-[#3E5CE9] cursor-pointer"></i>
      </button>
      <div class="flex flex-row gap-5 text-right">
        <div class="text-sm font-bold py-2.5">{{ userName }}</div>
        <button
          @click="$emit('logout')"
          class="text-red-500 text-sm font-bold cursor-pointer hover:bg-gray-100 px-3 py-2.5 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  userName: string;
}>();
defineEmits(['logout']);
</script>

<style scoped></style>
