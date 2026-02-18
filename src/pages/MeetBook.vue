<template>
  <div class="flex h-screen bg-[#F8F9FB] font-sans text-gray-900">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden px-6">
      <template v-if="isReady && auth.check()">
        <Header :userName="userName" @logout="auth.logout()" />
        <DashboardTabs />

        <main class="flex-1 overflow-hidden flex flex-col">
          <div class="flex-1 rounded-[32px] border border-gray-100 shadow-sm bg-white">
            <CalendarBoard />
          </div>
        </main>
      </template>

      <div v-else-if="!isReady" class="flex-1 flex items-center justify-center">
        <i class="pi pi-spin pi-spinner text-4xl text-[#3E5CE9]"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuth } from 'vue-auth3';
import type { AuthUserResponse } from '../types/auth';
import Sidebar from '@/components/layout/Sidebar.vue';
import Header from '../components/layout/Header.vue';
import DashboardTabs from '../components/layout/DashboardTabs.vue';
import CalendarBoard from '../components/calendar/CalendarBoard.vue';
import { useGoogleAuth } from '../composables/useGoogleAuth';

const auth = useAuth();

const { isReady, initAuth } = useGoogleAuth();
onMounted(initAuth);

const userName = computed(() => {
  const user = auth.user() as AuthUserResponse | null;
  return user?.data?.name || user?.name || '';
});
</script>

<style scoped></style>
