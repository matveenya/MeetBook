<template>
  <div id="app">
    <div v-if="auth.check()">
      <nav class="p-4 bg-white border-b flex justify-between items-center">
        <span class="font-bold">MeetBook</span>
        <div class="flex items-center gap-4">
          <span>{{ userName }}</span>
          <button @click="auth.logout()" class="text-red-500 text-sm font-bold">Logout</button>
        </div>
      </nav>
    </div>

    <RouterView></RouterView>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuth } from 'vue-auth3';
import type { AuthUserResponse } from './types/auth';

const auth = useAuth();

const userName = computed(() => {
  const user = auth.user() as AuthUserResponse | null;
  return user?.data?.name || user?.name || '';
});
</script>

<style scoped></style>
