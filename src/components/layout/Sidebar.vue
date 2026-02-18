<template>
  <aside class="flex flex-col">
    <div class="p-4 text-2xl font-bold flex items-center">
      <h1 class="text-[#3E5CE9]">MeetBook</h1>
    </div>

    <nav class="flex-1 space-y-1 py-4">
      <div class="flex flex-col">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-6">Menu</p>

        <SidebarItem v-for="item in menu" :key="item.label" :icon="item.icon">
          {{ item.label }}
        </SidebarItem>
      </div>

      <div class="flex flex-col">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest my-4 px-6">
          Configurations
        </p>

        <SidebarItem icon="pi pi-cog"> Settings </SidebarItem>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import SidebarItem from '../ui/SidebarItem.vue';

const menu = [
  { label: 'Dashboard', icon: 'pi pi-th-large' },
  { label: 'Meetings', icon: 'pi pi-calendar' },
  { label: 'User Management', icon: 'pi pi-user-edit' },
  { label: 'Feedback', icon: 'pi pi-comment' },
];
</script>
