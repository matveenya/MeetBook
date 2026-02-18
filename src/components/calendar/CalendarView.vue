<template>
  <div class="flex-1 overflow-auto p-4 h-screen">
    <FullCalendar ref="calendarRef" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import type { CalendarOptions } from '@fullcalendar/core';

defineProps<{
  options: CalendarOptions;
}>();

const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);

defineExpose({
  getApi: () => calendarRef.value?.getApi(),
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
