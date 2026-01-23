<template>
  <div class="flex flex-col gap-1 w-full">
    <IconField>
      <InputIcon :class="icon" />

      <Password
        v-if="type === 'password'"
        v-model="modelValue"
        v-bind="$attrs"
        :placeholder="placeholder"
        :toggleMask="toggleMask"
        :feedback="feedback"
        :invalid="!!error"
        fluid
        :inputClass="inputClasses"
      />

      <InputText
        v-else
        v-model="modelValue"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        :invalid="!!error"
        fluid
        :class="inputClasses"
      />
    </IconField>
    <small v-if="error" class="text-red-500 ml-2">{{ error }}</small>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

interface Props {
  type?: string;
  placeholder?: string;
  icon?: string;
  error?: string;
  toggleMask?: boolean;
  feedback?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  icon: '',
  error: '',
  toggleMask: true,
  feedback: false,
});

const modelValue = defineModel<string | null>();

const inputClasses = computed(
  () =>
    'w-full! py-3! border! border-gray-300! rounded-xl! focus:outline-none! focus:ring-2! focus:ring-[#3f4bb0]! focus:border-transparent! transition!'
);
</script>
