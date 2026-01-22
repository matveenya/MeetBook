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
    </div>

    <RouterView></RouterView>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from 'vue-auth3';
const auth = useAuth();
</script>

<style scoped></style>
