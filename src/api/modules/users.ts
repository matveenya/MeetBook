import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { UserResource } from '@/types/user';

export const fetchUsersRequest = async () => {
  const { data } = await apiClient.get<{ data: UserResource[] }>(API_ENDPOINTS.users);
  return data.data;
};
