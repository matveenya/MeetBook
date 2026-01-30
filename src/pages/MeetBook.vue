<template>
  <div class="flex h-screen bg-[#F8F9FB] font-sans text-gray-900">
    <aside class="flex flex-col">
      <div class="p-6 text-2xl font-bold flex items-center">
        <h1 class="text-[#3E5CE9]">MeetBook</h1>
      </div>

      <nav class="flex-1 space-y-1">
        <div class="flex flex-col">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-6">
            Menu
          </p>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-th-large"></i> Dashboard
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-calendar"></i> Booking Management
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-users"></i> Client Management
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-comment"></i> Feedback
          </a>
        </div>
        <div class="flex flex-col">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest my-4 px-6">
            Configurations
          </p>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-user-edit"></i> User Management
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-6 py-2.5 focus:bg-[#EEF2FF] focus:text-[#3E5CE9] rounded-xl font-semibold text-sm"
          >
            <i class="pi pi-cog"></i> Settings
          </a>
        </div>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        v-if="auth.check()"
        class="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 shrink-0"
      >
        <h2 class="text-lg font-bold">MeetBook Dashboard</h2>
        <div class="flex items-center gap-4">
          <button class="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
            <i class="pi pi-bell"></i>
          </button>
          <div class="flex flex-row gap-5 text-right">
            <div class="text-sm font-bold py-2.5">{{ userName }}</div>
            <button
              @click="auth.logout()"
              class="text-red-500 text-sm font-bold cursor-pointer hover:bg-gray-100 px-3 py-2.5 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section></section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from 'vue-auth3';
import type { AuthUserResponse } from '../types/auth';

const auth = useAuth();

const userName = computed(() => {
  const user = auth.user() as AuthUserResponse | null;
  return user?.data?.name || user?.name || '';
});
</script>

<style scoped></style>
