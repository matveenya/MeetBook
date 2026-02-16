<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    @show="onModalShow"
    modal
    header="Create meeting"
    :style="{ width: '30rem' }"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="title" class="font-bold">Meeting name</label>
        <Input
          ref="titleInput"
          id="title"
          v-model="form.title"
          placeholder="Enter meeting name"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-bold">Invite members</label>
        <Select
          v-model="form.invitedUsers"
          :options="allUsers"
          optionLabel="title"
          placeholder="Select members"
          display="chip"
          :filter="true"
          class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        variant="outlined"
        @click="$emit('update:visible', false)"
        :fluid="false"
      />
      <Button label="Create" @click="$emit('confirm')" :disabled="!form.title" :fluid="false" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Dialog from 'primevue/dialog';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Select from '../ui/Select.vue';
import type { SelectedUser } from '../../types/user';

interface MeetingForm {
  title: string;
  invitedUsers: SelectedUser[];
}

defineProps<{
  visible: boolean;
  allUsers: SelectedUser[];
}>();

const form = defineModel<MeetingForm>('form', { required: true });

defineEmits(['update:visible', 'confirm']);

const titleInput = ref<InstanceType<typeof Input> | null>(null);

const onModalShow = async () => {
  await nextTick();

  const inputEl = titleInput.value?.$el?.querySelector('input') as HTMLInputElement | null;

  if (inputEl) {
    inputEl.focus();
  }
};
</script>
