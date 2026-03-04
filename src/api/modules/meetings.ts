import apiClient from '@/api/client';
import { API_ENDPOINTS, getMeetingEndpoint } from '@/api/endpoints';
import type { Meeting, MeetingData } from '@/types/meeting';

export const fetchMeetingsRequest = async () => {
  const { data } = await apiClient.get<{ data: Meeting[] }>(API_ENDPOINTS.meetings);
  return data.data;
};

export const createMeetingRequest = async (meetingData: MeetingData) => {
  const { data } = await apiClient.post<{ data: Meeting }>(API_ENDPOINTS.meetings, meetingData);
  return data.data;
};

export const updateMeetingRequest = async (
  meetingId: string,
  meetingData: Partial<MeetingData>
) => {
  const { data } = await apiClient.patch<{ data: Meeting }>(
    getMeetingEndpoint(meetingId),
    meetingData
  );
  return data.data;
};

export const deleteMeetingRequest = async (meetingId: string) => {
  await apiClient.delete(getMeetingEndpoint(meetingId));
};
