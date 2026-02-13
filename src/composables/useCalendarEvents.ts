import { ref } from 'vue';
import apiClient from '../api/client';
import type { Meeting } from '../types/meeting';
import type { DateSelectArg } from '@fullcalendar/core';

export function useCalendarEvents() {
  const meetings = ref<Meeting[]>([]);

  const fetchMeetings = async () => {
    try {
      const { data } = await apiClient.get<{ data: Meeting[] }>('/api/meetings');
      meetings.value = data.data;
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

  const createMeeting = async (selectInfo: DateSelectArg) => {
    const title = prompt('Name meeting:');
    if (!title) return null;

    try {
      const { data } = await apiClient.post<{ data: Meeting }>('/api/meetings', {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        userId: selectInfo.resource?.id,
      });
      return data.data;
    } catch (error) {
      console.error('Error creating a meeting:', error);
      return null;
    }
  };

  return {
    meetings,
    fetchMeetings,
    createMeeting,
  };
}
