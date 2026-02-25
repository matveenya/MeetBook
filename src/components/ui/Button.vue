<template>
  <Button v-bind="$attrs" :label="label" :variant="variant" :fluid="fluid" :class="buttonClasses">
    <span v-if="callIcon" class="relative inline-flex items-center justify-center w-5 h-5">
      <i :class="callIconClass"></i>
      <span v-if="off" class="absolute w-0.5 h-6 bg-white rotate-45 rounded-full"></span>
    </span>
    <slot v-else />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';

interface Props {
  label?: string;
  fluid?: boolean;
  variant?:
    | 'primary'
    | 'outlined'
    | 'icon'
    | 'danger'
    | 'tab'
    | 'callControl'
    | 'callControlOff'
    | 'callEnd';
  callIcon?: 'mic' | 'video';
  off?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  fluid: true,
  variant: 'primary',
  callIcon: undefined,
  off: false,
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
  } else if (props.variant === 'callControl') {
    return `p-4! rounded-full! text-white! bg-gray-600! hover:bg-gray-500! border-none! shadow-none! transition!`;
  } else if (props.variant === 'callControlOff') {
    return `p-4! rounded-full! text-white! bg-red-500! hover:bg-red-400! border-none! shadow-none! transition!`;
  } else if (props.variant === 'callEnd') {
    return `p-4! px-8! rounded-full! text-white! font-bold! bg-red-600! hover:bg-red-700! border-none! shadow-none! transition!`;
  }

  return baseClasses;
});

const callIconClass = computed(() => {
  if (props.callIcon === 'mic') return 'pi pi-microphone';
  if (props.callIcon === 'video') return 'pi pi-video';
  return '';
});
</script>
