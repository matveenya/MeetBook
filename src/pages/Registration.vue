<template>
  <div class="min-h-screen bg-[#3f4bb0] flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-[40px] shadow-xl p-10 flex flex-col items-center">
      <h1 class="text-[#333] text-3xl font-medium mb-8">Registration</h1>

      <form class="w-full space-y-4" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-user" />
            <InputText
              v-model="fullName"
              v-bind="fullNameProps"
              type="text"
              placeholder="Full Name"
              fluid
              :invalid="!!errors.fullName"
              class="w-full! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
          <small class="text-red-500 ml-2">{{ errors.fullName }}</small>
        </div>

        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-envelope" />
            <InputText
              v-model="email"
              v-bind="emailProps"
              type="email"
              placeholder="Email"
              fluid
              :invalid="!!errors.email"
              class="w-full! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
          <small class="text-red-500 ml-2">{{ errors.email }}</small>
        </div>

        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-lock" />
            <Password
              v-model="password"
              v-bind="passwordProps"
              placeholder="Password"
              toggleMask
              fluid
              :feedback="false"
              :invalid="!!errors.password"
              inputClass="w-full! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
          <small class="text-red-500 ml-2">{{ errors.password }}</small>
        </div>

        <div class="flex flex-col gap-1">
          <IconField>
            <InputIcon class="pi pi-lock" />
            <Password
              v-model="confirmPassword"
              v-bind="confrimPasswordProps"
              placeholder="Confirm password"
              toggleMask
              fluid
              :feedback="false"
              :invalid="!!errors.confirmPassword"
              inputClass="w-full! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!"
            />
          </IconField>
          <small class="text-red-500 ml-2">{{ errors.confirmPassword }}</small>
        </div>

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
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

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
