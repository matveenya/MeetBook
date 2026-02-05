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
        <Button label="Today" variant="primary" class="ml-4 py-2 px-6" @click="goToday" />
      </div>

      <div class="flex gap-3">
        <Button
          variant="outlined"
          label="All members"
          icon="pi pi-chevron-down"
          iconPos="right"
          class="py-2 px-4 rounded-lg text-gray-700 border-gray-300"
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

const fullCalendar = ref<InstanceType<typeof FullCalendar> | null>(null);
const currentPeriodText = ref('');

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
  slotMinTime: '09:00:00',
  slotMaxTime: '18:00:00',
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

onMounted(updateTitle);
</script>

<style>
.fc .fc-resource-timegrid-col {
  background: #fff;
}
.fc .fc-timegrid-slot {
  height: 5rem !important;
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
</style>
