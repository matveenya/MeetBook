<template>
  <DashboardLayout
    :userName="userName"
    :showHeader="isReady && auth.check()"
    @logout="auth.logout()"
  >
    <template v-if="isReady && auth.check()">
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
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuth } from 'vue-auth3';
import type { AuthUserResponse } from '@/types/auth';
import DashboardTabs from '@/components/layout/DashboardTabs.vue';
import CalendarBoard from '@/components/calendar/CalendarBoard.vue';
import { useGoogleAuth } from '@/composables/useGoogleAuth';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const auth = useAuth();

const { isReady, initAuth } = useGoogleAuth();

const userName = computed(() => {
  const user = auth.user() as AuthUserResponse | null;
  return user?.data?.name || user?.name || '';
});

onMounted(initAuth);
</script>

<style scoped></style>
