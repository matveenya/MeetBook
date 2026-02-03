<template>
  <a
    href="#"
    class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] hover:bg-[#EEF2FF] hover:text-[#3E5CE9] rounded-xl font-semibold text-sm"
  >
    <i :class="icon"></i>
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<style scoped></style>
