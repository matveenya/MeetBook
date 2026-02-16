import { ref } from 'vue';
import apiClient from '../api/client';
import type { Meeting } from '../types/meeting';

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

  const createMeeting = async (meetingData: {
    title: string;
    start: string;
    end: string;
    userId: string;
    invitedIds: string[];
  }) => {
    try {
      const { data } = await apiClient.post<{ data: Meeting }>('/api/meetings', meetingData);
      return data.data;
    } catch (error) {
      console.error('Error creating a meeting:', error);
      return null;
    }
  };

  return { meetings, fetchMeetings, createMeeting };
}
