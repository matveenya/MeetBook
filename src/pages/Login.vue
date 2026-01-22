<template>
  <div class="min-h-screen bg-[#3f4bb0] flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10 flex flex-col items-center">
      <h1 class="text-[#333] text-3xl font-medium mb-12">Welcome</h1>

      <form class="w-full space-y-4" @submit.prevent>
        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-envelope" />
            <InputText
              type="email"
              placeholder="Email"
              fluid
              class="w-full! pl-12! pr-4! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
        </div>

        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-lock" />
            <Password
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid
              inputClass="w-full! pl-12! pr-4! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
        </div>

        <div class="text-right">
          <a href="#" class="text-[#7e8ae5] text-sm hover:underline">Forgot password?</a>
        </div>

        <Button
          label="Log in"
          fluid
          class="w-full! bg-[#3f4bb0]! text-white! py-3! rounded-full! font-medium! hover:bg-[#343e94]! transition! mt-6! shadow-md!"
        />
      </form>

      <div class="w-full flex items-center my-8">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="px-4 text-gray-400 text-sm">Or</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <div class="w-full mb-10">
        <Button
          @click="loginWithGoogle"
          label="Google"
          variant="outlined"
          fluid
          class="flex-1! flex! items-center! justify-center! py-2.5! border! border-[#7e8ae5]! rounded-full! hover:bg-gray-50! transition!"
        >
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google"
            class="w-5 h-5"
          />
          <span class="text-[#3f4bb0]! font-medium! text-sm!">Google</span>
        </Button>
      </div>

      <p class="text-gray-500 text-sm mb-4 text-center">Have no account yet?</p>
      <Button
        @click="goToRegistration"
        label="Registration"
        variant="outlined"
        fluid
        class="w-full! border! border-[#7e8ae5]! text-[#3f4bb0]! py-3! rounded-full! font-medium! hover:bg-gray-50! transition!"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuth } from 'vue-auth3';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const router = useRouter();
const auth = useAuth();

const goToRegistration = () => {
  router.push('/registration');
};

const loginWithGoogle = () => {
  auth.oauth2('google', {
    code: '',
    state: '',
    params: {
      redirect_uri: 'http://localhost:5173/login/google',
      client_id: import.meta.env.VITE_CLIENT_ID,
    },
    url: 'https://accounts.google.com/o/oauth2/auth',
    window: window,
  });
};
</script>

<style scoped></style>
