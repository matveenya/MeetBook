<template>
  <div class="min-h-screen bg-[#3f4bb0] flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10 flex flex-col items-center">
      <h1 class="text-[#333] text-3xl font-medium mb-12">Welcome</h1>

      <form class="w-full space-y-5" @submit.prevent="onSubmit">
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">{{ errorMessage }}</p>

        <Input
          v-model="email"
          v-bind="emailProps"
          type="email"
          placeholder="Email"
          icon="pi pi-envelope"
          :error="errors.email"
        />

        <Input
          v-model="password"
          v-bind="passwordProps"
          type="password"
          placeholder="Password"
          icon="pi pi-lock"
          :error="errors.password"
        />

        <div class="text-right">
          <a href="#" class="text-[#7e8ae5] text-sm hover:underline">Forgot password?</a>
        </div>

        <Button type="submit" label="Log in" :loading="isSubmitting" />
      </form>

      <OrBlockAuth class="w-full flex items-center my-8" />

      <div class="w-full mb-10">
        <Button @click="loginWithGoogle" variant="outlined">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            class="w-5 h-5 mr-2"
          />
          <span>Google</span>
        </Button>
      </div>

      <p class="text-gray-500 text-sm mb-4 text-center">Have no account yet?</p>
      <Button
        @click="goToRegistration"
        type="submit"
        label="Registration"
        variant="outlined"
        :loading="isSubmitting"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuth } from 'vue-auth3';
import { useForm } from 'vee-validate';
import { loginSchema, type LoginSchema } from '../utils/schemas/authValidationSchema';
import { toTypedSchema } from '@vee-validate/zod';
import Input from '../components/ui/Input.vue';
import Button from '../components/ui/Button.vue';
import OrBlockAuth from '../components/OrBlockAuth.vue';
import { useAuthErrorHandler } from '../composables/useAuthErrorHandler';

const { errorMessage, handleAuthError } = useAuthErrorHandler();

const router = useRouter();
const auth = useAuth();

const { errors, defineField, handleSubmit, isSubmitting } = useForm<LoginSchema>({
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailProps] = defineField('email', { validateOnModelUpdate: true });
const [password, passwordProps] = defineField('password', { validateOnModelUpdate: true });

const onSubmit = handleSubmit(async (values: LoginSchema) => {
  try {
    await auth.login({
      data: {
        email: values.email,
        password: values.password,
      },
    });
  } catch (err: unknown) {
    handleAuthError(err);
  }
});

const goToRegistration = () => router.push('/registration');

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
