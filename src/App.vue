<template>
  <div id="app">
    <div v-if="auth.check()">
      <nav class="p-4 bg-white border-b flex justify-between items-center">
        <span class="font-bold">MeetBook</span>
        <div class="flex items-center gap-4">
          <span>{{ auth.user() }}</span>
          <button @click="auth.logout()" class="text-red-500 text-sm font-bold">Logout</button>
        </div>
      </nav>
      <main class="p-8 text-center">
        <h1 class="text-2xl font-bold">Welcome to MeetBook!</h1>
        <p class="mt-4 text-gray-600">Your meeting booking system is ready.</p>
      </main>
    </div>

    <Registration v-else />
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from 'vue-auth3';
import Registration from './pages/Registration.vue';

const auth = useAuth();
</script>

<style scoped></style>
