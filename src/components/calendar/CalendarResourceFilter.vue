<template>
  <div class="flex gap-3">
    <Select
      v-model="model"
      :options="options"
      optionLabel="title"
      placeholder="All members"
      :maxSelectedLabels="2"
      :filter="true"
      filterPlaceholder="Search members..."
      emptyFilterMessage="No members found"
      @change="$emit('change')"
    />
  </div>
</template>

<script setup lang="ts">
import Select from '@/components/ui/Select.vue';
import type { SelectedUser } from '@/types/user';

defineProps<{
  options: SelectedUser[];
}>();

const model = defineModel<SelectedUser[]>();

defineEmits(['change']);
</script>
