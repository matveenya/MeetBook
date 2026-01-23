<template>
  <div class="min-h-screen bg-[#3f4bb0] flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10 flex flex-col items-center">
      <h1 class="text-[#333] text-3xl font-medium mb-8">Registration</h1>

      <form class="w-full space-y-4" @submit.prevent="onSubmit">
        <Input
          v-model="fullName"
          v-bind="fullNameProps"
          type="text"
          placeholder="Full Name"
          icon="pi pi-user"
          :error="errors.fullName"
        />

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

        <Input
          v-model="confirmPassword"
          v-bind="confrimPasswordProps"
          type="password"
          placeholder="Confirm password"
          icon="pi pi-lock"
          :error="errors.confirmPassword"
        />

        <Button
          type="submit"
          label="Create Account"
          fluid
          :loading="isSubmitting"
          class="w-full! bg-[#3f4bb0]! text-white! py-3! rounded-full! font-medium! hover:bg-[#343e94]! transition! mt-6! shadow-md!"
        />
      </form>

      <div class="w-full flex items-center my-8">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="px-4 text-gray-400 text-sm">Or</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <p class="text-gray-500 text-sm mb-4 text-center">Already have an account?</p>
      <Button
        @click="goToLogIn"
        label="Log in"
        variant="outlined"
        fluid
        class="w-full! border! border-[#7e8ae5]! text-[#3f4bb0]! py-3! rounded-full! font-medium! hover:bg-gray-50! transition!"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { authSchema, type AuthSchema } from '../utils/schemas/authValidationSchema';
import { toTypedSchema } from '@vee-validate/zod';
import Input from '../components/ui/Input.vue';
import Button from 'primevue/button';

const router = useRouter();

const { errors, defineField, handleSubmit, isSubmitting } = useForm<AuthSchema>({
  validationSchema: toTypedSchema(authSchema),
});

const [email, emailProps] = defineField('email', {
  validateOnModelUpdate: true,
});

const [password, passwordProps] = defineField('password', {
  validateOnModelUpdate: true,
});

const [fullName, fullNameProps] = defineField('fullName', {
  validateOnModelUpdate: true,
});

const [confirmPassword, confrimPasswordProps] = defineField('confirmPassword', {
  validateOnModelUpdate: true,
});

const onSubmit = handleSubmit(() => {});

const goToLogIn = () => {
  router.push('/login');
};
</script>

<style scoped></style>
