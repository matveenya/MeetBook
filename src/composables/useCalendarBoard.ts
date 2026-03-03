import { ref, reactive, type Ref } from 'vue';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import type { SelectedUser } from '@/types/user';
import type { Meeting, MeetingData } from '@/types/meeting';
import { getMeetingParticipants } from '@/utils/calendarUtils';

export function useCalendarBoard(
  meetings: Ref<Meeting[]>,
  allUsers: Ref<SelectedUser[]>,
  actions: {
    create: (data: MeetingData) => Promise<Meeting | null>;
    update: (id: string, data: Partial<MeetingData>) => Promise<Meeting | null>;
    remove: (id: string) => Promise<boolean>;
    refresh: () => Promise<void>;
  }
) {
  const showModal = ref(false);
  const isEditMode = ref(false);
  const selectedEventId = ref<string | null>(null);
  const selectInfoStorage = ref<DateSelectArg | null>(null);

  const form = reactive({
    title: '',
    invitedUsers: [] as SelectedUser[],
  });

  const openCreateModal = (selectInfo: DateSelectArg) => {
    isEditMode.value = false;
    selectedEventId.value = null;
    selectInfoStorage.value = selectInfo;
    form.title = '';
    form.invitedUsers = [];
    showModal.value = true;
  };

  const openEditModal = (clickInfo: EventClickArg) => {
    isEditMode.value = true;
    selectedEventId.value = clickInfo.event.id;
    form.title = clickInfo.event.title;

    const resource = clickInfo.event.getResources()[0];
    form.invitedUsers = getMeetingParticipants(meetings.value, allUsers.value, {
      title: clickInfo.event.title,
      start: clickInfo.event.start?.getTime(),
      end: clickInfo.event.end?.getTime(),
      resourceId: resource ? String(resource.id) : null,
    });

    showModal.value = true;
  };

  const handleConfirm = async () => {
    const payload = {
      title: form.title,
      invitedIds: form.invitedUsers.map(u => u.id),
    };

    let result;
    if (isEditMode.value && selectedEventId.value) {
      result = await actions.update(selectedEventId.value, payload);
    } else if (selectInfoStorage.value) {
      result = await actions.create({
        ...payload,
        start: selectInfoStorage.value.startStr,
        end: selectInfoStorage.value.endStr,
        userId: selectInfoStorage.value.resource?.id || '',
      });
    }

    if (result) {
      await actions.refresh();
      showModal.value = false;
    }
  };

  const handleDelete = async () => {
    if (selectedEventId.value) {
      const success = await actions.remove(selectedEventId.value);
      if (success) {
        await actions.refresh();
        showModal.value = false;
      }
    }
  };

  return {
    showModal,
    isEditMode,
    form,
    selectedEventId,
    openCreateModal,
    openEditModal,
    handleConfirm,
    handleDelete,
  };
}
