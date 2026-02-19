<template>
  <div class="flex flex-col flex-1 bg-white">
    <div class="flex justify-between items-center p-6 border-b border-gray-100">
      <CalendarStats :totalBookings="meetings.length" />

      <CalendarNavigation
        :title="currentPeriodText"
        @prev="goPrev"
        @next="goNext"
        @today="goToday"
      />

      <CalendarResourceFilter
        v-model="selectedUsers"
        :options="allUsers"
        @change="updateResources"
      />
    </div>

    <CalendarView ref="fullCalendarWrapper" :options="calendarOptions" />

    <ModalMeeting
      v-model:visible="showModal"
      v-model:form="form"
      :allUsers="allUsers"
      :isEdit="isEditMode"
      @confirm="handleConfirm"
      @delete="handleDelete"
      @startVideo="onStartVideo"
    />

    <VideoCall
      v-if="activeCallMeetingId"
      :meetingId="activeCallMeetingId"
      @close="activeCallMeetingId = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed, type Ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import type { CalendarOptions } from '@fullcalendar/core';
import CalendarStats from './CalendarStats.vue';
import CalendarNavigation from './CalendarNavigation.vue';
import CalendarResourceFilter from './CalendarResourceFilter.vue';
import CalendarView from './CalendarView.vue';
import ModalMeeting from './ModalMeeting.vue';
import VideoCall from '../video/VideoCall.vue';
import { useCalendarNavigation } from '../../composables/useCalendarNavigation';
import { useCalendarResources } from '../../composables/useCalendarResources';
import { useCalendarEvents } from '../../composables/useCalendarEvents';
import { useCalendarBoard } from '../../composables/useCalendarBoard';
import { BASE_CALENDAR_OPTIONS, renderResourceHeader } from '../../utils/calendarConfig';

const fullCalendarWrapper = ref<InstanceType<typeof CalendarView> | null>(null);

const activeCallMeetingId = ref<string | null>(null);

const onStartVideo = () => {
  const meeting = meetings.value.find(m => String(m.id) === String(selectedEventId.value));

  console.log('Поиск по ID:', selectedEventId.value);
  console.log('Найденная встреча:', meeting);

  if (meeting && meeting.groupId) {
    activeCallMeetingId.value = meeting.groupId;
    showModal.value = false;
  } else {
    console.error('Ошибка: встреча не найдена или отсутствует Group ID', {
      selectedId: selectedEventId.value,
      meeting: meeting,
    });
  }
};

const calendarProxy = computed(() => ({
  getApi: () => fullCalendarWrapper.value?.getApi(),
})) as unknown as Ref<InstanceType<typeof FullCalendar> | null>;

const { currentPeriodText, updateTitle, goNext, goPrev, goToday } =
  useCalendarNavigation(calendarProxy);

const { allUsers, selectedUsers, resources, fetchResources, updateResources } =
  useCalendarResources();

const { meetings, fetchMeetings, createMeeting, updateMeeting, deleteMeeting } =
  useCalendarEvents();

const {
  showModal,
  isEditMode,
  form,
  selectedEventId,
  openCreateModal,
  openEditModal,
  handleConfirm,
  handleDelete,
} = useCalendarBoard(meetings, allUsers, {
  create: createMeeting,
  update: updateMeeting,
  remove: deleteMeeting,
  refresh: fetchMeetings,
});

const calendarOptions: CalendarOptions = reactive({
  ...BASE_CALENDAR_OPTIONS,
  events: meetings,
  resources: resources,
  eventClick: openEditModal,
  select: openCreateModal,
  resourceLabelContent: renderResourceHeader,
});

watch(resources, newVal => {
  calendarOptions.resources = newVal;
});
watch(meetings, newVal => {
  calendarOptions.events = newVal;
});

onMounted(async () => {
  setTimeout(() => updateTitle(), 0);
  await Promise.all([fetchResources(), fetchMeetings()]);
});
</script>
