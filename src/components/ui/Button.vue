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
  variant?: 'primary' | 'outlined';
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
  } else {
    return `${baseClasses} border! border-[#7e8ae5]! text-[#3f4bb0]! hover:bg-gray-50!`;
  }
});
</script>
