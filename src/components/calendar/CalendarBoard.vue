<template>
  <div class="flex flex-col flex-1 bg-white">
    <div class="flex justify-between items-center p-6 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="bg-[#F0F1F3] p-3 rounded-xl">
          <i class="pi pi-calendar text-gray-600 text-xl"></i>
        </div>
        <div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold">15</span>
            <span class="text-gray-500 font-medium">Total Bookings</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <Button icon="pi pi-chevron-left" variant="icon" @click="goPrev" />
        <span class="font-bold text-gray-800 mx-4 w-48 text-center">{{ currentPeriodText }}</span>
        <Button icon="pi pi-chevron-right" variant="icon" @click="goNext" />
        <Button label="Today" variant="primary" class="ml-4" @click="goToday" />
      </div>

      <div class="flex gap-3">
        <Select
          v-model="selectedUsers"
          :options="allUsers"
          optionLabel="title"
          placeholder="All members"
          :maxSelectedLabels="2"
          @change="updateResources"
          :filter="true"
          filterPlaceholder="Search members..."
          emptyFilterMessage="No members found"
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto p-4 h-screen">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>

    <ModalMeeting
      v-model:visible="showModal"
      v-model:form="newMeetingForm"
      :allUsers="allUsers"
      :isEdit="isEditMode"
      @confirm="confirmCreate"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import Button from '../ui/Button.vue';
import Select from '../ui/Select.vue';
import ModalMeeting from './ModalMeeting.vue';
import { useCalendarNavigation } from '../../composables/useCalendarNavigation';
import { useCalendarResources } from '../../composables/useCalendarResources';
import { useCalendarEvents } from '../../composables/useCalendarEvents';
import type { SelectedUser } from '../../types/user';

const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
const showModal = ref(false);
const selectInfoStorage = ref<DateSelectArg | null>(null);
const isEditMode = ref(false);
const selectedEventId = ref<string | null>(null);

const newMeetingForm = reactive({
  title: '',
  invitedUsers: [] as SelectedUser[],
});

const { currentPeriodText, updateTitle, goNext, goPrev, goToday } =
  useCalendarNavigation(fullCalendar);
const { allUsers, selectedUsers, resources, fetchResources, updateResources } =
  useCalendarResources();
const { meetings, fetchMeetings, createMeeting, updateMeeting, deleteMeeting } =
  useCalendarEvents();

const handleDateSelect = (selectInfo: DateSelectArg) => {
  selectInfoStorage.value = selectInfo;
  newMeetingForm.title = '';
  newMeetingForm.invitedUsers = [];
  showModal.value = true;
};

const handleEventClick = (clickInfo: EventClickArg) => {
  isEditMode.value = true;
  selectedEventId.value = clickInfo.event.id;
  newMeetingForm.title = clickInfo.event.title;

  const startTime = clickInfo.event.start?.getTime();
  const endTime = clickInfo.event.end?.getTime();
  const title = clickInfo.event.title;

  const resource = clickInfo.event.getResources()[0];
  const currentResourceId = resource ? String(resource.id) : null;

  const participants = meetings.value
    .filter(m => {
      const mStart = new Date(m.start).getTime();
      const mEnd = new Date(m.end).getTime();

      return (
        m.title === title &&
        mStart === startTime &&
        mEnd === endTime &&
        (currentResourceId === null || String(m.resourceId) !== currentResourceId)
      );
    })
    .map(m => allUsers.value.find(u => String(u.id) === String(m.resourceId)))
    .filter((u): u is SelectedUser => !!u);

  newMeetingForm.invitedUsers = participants;
  showModal.value = true;
};

const confirmCreate = async () => {
  const payload = {
    title: newMeetingForm.title,
    invitedIds: newMeetingForm.invitedUsers.map(u => u.id),
  };

  if (isEditMode.value && selectedEventId.value) {
    const result = await updateMeeting(selectedEventId.value, payload);
    if (result) await fetchMeetings();
  } else if (selectInfoStorage.value) {
    const result = await createMeeting({
      ...payload,
      start: selectInfoStorage.value.startStr,
      end: selectInfoStorage.value.endStr,
      userId: selectInfoStorage.value.resource?.id || '',
    });
    if (result) await fetchMeetings();
  }
  showModal.value = false;
};

const handleDelete = async () => {
  if (selectedEventId.value) {
    const success = await deleteMeeting(selectedEventId.value);
    if (success) {
      await fetchMeetings();
      showModal.value = false;
    }
  }
};

const calendarOptions: CalendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  headerToolbar: false,
  height: '70vh',
  slotMinTime: '01:00:00',
  slotMaxTime: '24:00:00',
  slotDuration: '01:00:00',
  allDaySlot: false,
  selectable: true,
  eventClick: handleEventClick,
  select: info => {
    isEditMode.value = false;
    selectedEventId.value = null;
    handleDateSelect(info);
  },
  editable: true,
  resources: resources.value,
  events: meetings.value,
  resourceLabelContent: arg => ({
    html: `
      <div class="flex items-center gap-2 p-2">
        <img src="https://ui-avatars.com/api/?name=${arg.resource.title}&background=random" 
             class="w-8 h-8 rounded-full" />
        <div class="font-bold text-sm">${arg.resource.title}</div>
      </div>
    `,
  }),
});

watch(resources, newVal => {
  calendarOptions.resources = newVal;
});
watch(meetings, newVal => {
  calendarOptions.events = newVal;
});

onMounted(async () => {
  updateTitle();
  await Promise.all([fetchResources(), fetchMeetings()]);
});
</script>

<style>
.fc .fc-resource-timegrid-col {
  background: #fff;
}
.fc .fc-timegrid-slot {
  height: 4rem !important;
  border: 1px solid #ebebeb !important;
}
.fc .fc-timegrid-now-indicator-line {
  border-color: #3e5ce9;
  border-width: 2px;
}
.fc-theme-standard .fc-scrollgrid {
  border: none !important;
}
.fc .fc-timegrid-slot-label-cushion {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: lowercase;
}

.fc-day-today {
  background-color: #ffffff !important;
}
</style>
