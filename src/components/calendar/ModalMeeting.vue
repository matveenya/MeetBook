<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    @show="onModalShow"
    modal
    :header="isEdit ? 'Edit meeting' : 'Create meeting'"
    :style="{ width: '30rem' }"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="title" class="font-bold">Meeting name</label>
        <Input ref="titleInput" id="title" v-model="form.title" class="w-full" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-bold">Invite members</label>
        <Select
          v-model="form.invitedUsers"
          :options="allUsers"
          optionLabel="title"
          placeholder="Select members"
          display="chip"
          class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between w-full">
        <Button
          v-if="isEdit"
          label="Delete"
          variant="danger"
          @click="$emit('delete')"
          :fluid="false"
        />
        <div class="flex gap-2" :class="{ 'ml-auto': !isEdit }">
          <Button
            label="Cancel"
            variant="outlined"
            @click="$emit('update:visible', false)"
            :fluid="false"
          />
          <Button
            :label="isEdit ? 'Save' : 'Create'"
            @click="$emit('confirm')"
            :disabled="!form.title"
            :fluid="false"
          />
        </div>
      </div>
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

defineProps<{
  visible: boolean;
  allUsers: SelectedUser[];
  isEdit: boolean;
}>();

const form = defineModel<{
  title: string;
  invitedUsers: SelectedUser[];
}>('form', { required: true });

defineEmits(['update:visible', 'confirm', 'delete']);

const titleInput = ref<InstanceType<typeof Input> | null>(null);

const onModalShow = async () => {
  await nextTick();
  const inputEl = titleInput.value?.$el?.querySelector('input') as HTMLInputElement | null;
  if (inputEl) inputEl.focus();
};
</script>
