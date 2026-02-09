<template>
  <div class="flex h-screen bg-[#F8F9FB] font-sans text-gray-900">
    <aside class="flex flex-col">
      <div class="p-4 text-2xl font-bold flex items-center">
        <h1 class="text-[#3E5CE9]">MeetBook</h1>
      </div>

      <nav class="flex-1 space-y-1 py-4">
        <div class="flex flex-col">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-6">
            Menu
          </p>
          <SidebarItem icon="pi pi-th-large"> Dashboard </SidebarItem>
          <SidebarItem icon="pi pi-calendar"> Meetings </SidebarItem>
          <SidebarItem icon="pi pi-user-edit"> User Management </SidebarItem>
          <SidebarItem icon="pi pi-comment"> Feedback </SidebarItem>
        </div>
        <div class="flex flex-col">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest my-4 px-6">
            Configurations
          </p>
          <SidebarItem icon="pi pi-cog"> Settings </SidebarItem>
        </div>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden px-6">
      <Header v-if="auth.check()" :userName="userName" @logout="auth.logout()" />
      <DashboardTabs />

      <main class="flex-1 overflow-hidden flex flex-col">
        <div class="flex-1 rounded-[32px] border border-gray-100 shadow-sm bg-white">
          <CalendarBoard />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from 'vue-auth3';
import type { AuthUserResponse } from '../types/auth';
import SidebarItem from '../components/ui/SidebarItem.vue';
import Header from '../components/layout/Header.vue';
import DashboardTabs from '../components/layout/DashboardTabs.vue';
import CalendarBoard from '../components/calendar/CalendarBoard.vue';

const auth = useAuth();

const userName = computed(() => {
  const user = auth.user() as AuthUserResponse | null;
  return user?.data?.name || user?.name || '';
});
</script>

<style scoped></style>
