import { ref, type Ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';

export function useCalendarNavigation(fullCalendar: Ref<InstanceType<typeof FullCalendar> | null>) {
  const currentPeriodText = ref('');

  const updateTitle = () => {
    const api = fullCalendar.value?.getApi();
    if (api) {
      currentPeriodText.value = api.view.title;
    }
  };

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

  return {
    currentPeriodText,
    updateTitle,
    goNext,
    goPrev,
    goToday,
  };
}
