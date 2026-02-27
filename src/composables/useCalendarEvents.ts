import { ref } from 'vue';
import {
  createMeetingRequest,
  deleteMeetingRequest,
  fetchMeetingsRequest,
  updateMeetingRequest,
} from '../api/modules/meetings';
import type { Meeting, MeetingData } from '../types/meeting';

export function useCalendarEvents() {
  const meetings = ref<Meeting[]>([]);

  const fetchMeetings = async () => {
    try {
      meetings.value = await fetchMeetingsRequest();
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

  const createMeeting = async (meetingData: MeetingData) => {
    try {
      return createMeetingRequest(meetingData);
    } catch (error) {
      console.error('Error creating a meeting:', error);
      return null;
    }
  };

  const updateMeeting = async (id: string, meetingData: Partial<MeetingData>) => {
    try {
      return updateMeetingRequest(id, meetingData);
    } catch (error) {
      console.error('Error updating meeting:', error);
      return null;
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      await deleteMeetingRequest(id);
      return true;
    } catch (error) {
      console.error('Error delete meeting:', error);
      return false;
    }
  };

  return { meetings, fetchMeetings, createMeeting, updateMeeting, deleteMeeting };
}
