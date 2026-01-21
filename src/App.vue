<template>
  <div>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from "vue-auth3"

const auth = useAuth()

const login = () => {
auth.oauth2('google', {
  code: '',
  state: '',
  params: {
    redirect_uri: 'http://localhost:5173/login/google',
    client_id: import.meta.env.VITE_CLIENT_ID,
  },
  url: 'https://accounts.google.com/o/oauth2/auth',
  window: window
})
}
</script>

<style scoped>
</style>
