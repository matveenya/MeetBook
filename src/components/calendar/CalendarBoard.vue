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
          @change="updateCalendarResources"
          :filter="true"
          filterPlaceholder="Search members..."
          emptyFilterMessage="No members found"
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto p-4 h-screen">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import type { CalendarOptions } from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Button from '../ui/Button.vue';
import Select from '../ui/Select.vue';
import apiClient from '../../api/client';
import type { UserResource, SelectedUser } from '../../types/user';

const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
const currentPeriodText = ref('');

const allUsers = ref<SelectedUser[]>([]);
const selectedUsers = ref<SelectedUser[]>([]);

const updateTitle = () => {
  const api = fullCalendar.value?.getApi();
  if (api) {
    currentPeriodText.value = api.view.title;
  }
};

const calendarOptions: CalendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  height: '70vh',
  slotMinTime: '01:00:00',
  slotMaxTime: '24:00:00',
  slotDuration: '01:00:00',
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short',
    omitZeroMinute: false,
  },
  allDaySlot: false,
  expandRows: true,
  stickyHeaderDates: true,
  resources: [],
  events: [],
  resourceLabelContent: arg => {
    return {
      html: `
        <div class="flex items-center gap-2 p-2">
          <img src="https://ui-avatars.com/api/?name=${arg.resource.title}&background=random" 
               class="w-8 h-8 rounded-full" />
          <div class="text-left">
            <div class="font-bold text-sm">${arg.resource.title}</div>
          </div>
        </div>
      `,
    };
  },
});

const goNext = () => {
  fullCalendar.value?.getApi().next();
  updateTitle();
};
const goPrev = () => {
  fullCalendar.value?.getApi().prev();
  updateTitle();
};
const goToday = () => {
  fullCalendar.value?.getApi().today();
  updateTitle();
};

const updateCalendarResources = () => {
  calendarOptions.resources =
    selectedUsers.value.length === 0 ? allUsers.value : selectedUsers.value;
};

const fetchResources = async () => {
  try {
    const response = await apiClient.get('/api/users');
    const users: UserResource[] = response.data.data;

    const mappedUsers = users.map(user => ({
      id: user.id.toString(),
      title: user.name || user.email,
    }));

    allUsers.value = mappedUsers;
    selectedUsers.value = mappedUsers;
    calendarOptions.resources = mappedUsers;
  } catch (error) {
    console.error('Failed to fetch resources', error);
  }
};

onMounted(() => {
  updateTitle();
  fetchResources();
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
