<template>
  <Button v-bind="$attrs" :label="label" :variant="variant" :fluid="fluid" :class="buttonClasses">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';

interface Props {
  label?: string;
  fluid?: boolean;
  variant?: 'primary' | 'outlined' | 'icon' | 'danger' | 'tab';
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  fluid: true,
  variant: 'primary',
});

const buttonClasses = computed(() => {
  const baseClasses = 'rounded-full! py-3! font-medium! transition! shadow-sm!';

  if (props.variant === 'primary') {
    return `${baseClasses} bg-[#3f4bb0]! text-white! hover:bg-[#343e94]! border-none!`;
  } else if (props.variant === 'outlined') {
    return `${baseClasses} border! border-[#7e8ae5]! text-[#3f4bb0]! hover:bg-gray-50!`;
  } else if (props.variant === 'icon') {
    return `bg-transparent! p-2! text-gray-400! hover:bg-gray-100! rounded-full! relative! border-none!`;
  } else if (props.variant === 'danger') {
    return `bg-transparent! text-red-500! text-sm! font-bold! cursor-pointer! hover:bg-gray-100! px-3! my-2! rounded-xl! border-none!`;
  } else if (props.variant === 'tab') {
    return `px-4! py-2! rounded-lg! text-sm! font-semibold! text-gray-500! cursor-pointer! bg-[#F0F1F3]! hover:bg-[#172736]! hover:text-white! focus:bg-[#172736]! focus:text-white! transition! border-none!`;
  }

  return baseClasses;
});
</script>
