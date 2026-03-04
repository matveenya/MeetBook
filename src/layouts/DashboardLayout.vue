<template>
  <div class="flex h-screen bg-[#F8F9FB] font-sans text-gray-900">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden px-6">
      <Header v-if="showHeader" :userName="userName" @logout="$emit('logout')" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

withDefaults(
  defineProps<{
    userName: string;
    showHeader?: boolean;
  }>(),
  {
    showHeader: true,
  }
);

defineEmits(['logout']);
</script>
