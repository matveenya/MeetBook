<template>
    <div class="min-h-screen bg-[#3f4bb0] flex items-center justify-center p-4 font-sans">
      
      <div class="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10 flex flex-col items-center">
        
        <h1 class="text-[#333] text-3xl font-medium mb-12">Welcome</h1>
  
        <form class="w-full space-y-4" @submit.prevent>
            <input 
              type="email" 
              placeholder="Email" 
              class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f4bb0] focus:border-transparent transition"
            >
  
            <input 
              type="password" 
              placeholder="Password" 
              class="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f4bb0] focus:border-transparent transition"
            >
  
          <div class="text-right">
            <a href="#" class="text-[#7e8ae5] text-sm hover:underline">Forgot password?</a>
          </div>
  
          <button class="w-full bg-[#3f4bb0] text-white py-3 rounded-full font-medium hover:bg-[#343e94] transition mt-6 shadow-md">
            Log in
          </button>
        </form>
  
        <div class="w-full flex items-center my-8">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="px-4 text-gray-400 text-sm">Or</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>
  
        <div class="w-full flex space-x-4 mb-10">
          <button @click="loginWithGoogle" class="flex-1 flex items-center justify-center py-2.5 border border-[#7e8ae5] rounded-full hover:bg-gray-50 transition">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" class="w-5 h-5 mr-2">
            <span class="text-[#3f4bb0] font-medium text-sm">Google</span>
          </button>
        </div>
  
        <p class="text-gray-500 text-sm mb-4">Have no account yet?</p>
        <button class="w-full border border-[#7e8ae5] text-[#3f4bb0] py-3 rounded-full font-medium hover:bg-gray-50 transition">
          Registration
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useAuth } from "vue-auth3"
  
  const auth = useAuth()
  
  const loginWithGoogle = () => {
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