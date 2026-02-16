import { ref } from 'vue';
import apiClient from '../api/client';
import type { Meeting, MeetingData } from '../types/meeting';

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

  const createMeeting = async (meetingData: MeetingData) => {
    try {
      const { data } = await apiClient.post<{ data: Meeting }>('/api/meetings', meetingData);
      return data.data;
    } catch (error) {
      console.error('Error creating a meeting:', error);
      return null;
    }
  };

  const updateMeeting = async (id: string, meetingData: Partial<MeetingData>) => {
    try {
      const { data } = await apiClient.patch<{ data: Meeting }>(`/api/meetings/${id}`, meetingData);
      return data.data;
    } catch (error) {
      console.error('Error updating meeting:', error);
      return null;
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      await apiClient.delete(`/api/meetings/${id}`);
      return true;
    } catch (error) {
      console.error('Error delete meeting:', error);
      return false;
    }
  };

  return { meetings, fetchMeetings, createMeeting, updateMeeting, deleteMeeting };
}
