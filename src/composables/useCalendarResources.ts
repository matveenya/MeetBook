import { ref } from 'vue';
import apiClient from '../api/client';
import type { UserResource, SelectedUser } from '../types/user';

export function useCalendarResources() {
  const allUsers = ref<SelectedUser[]>([]);
  const selectedUsers = ref<SelectedUser[]>([]);
  const resources = ref<SelectedUser[]>([]);

  const fetchResources = async () => {
    try {
      const { data } = await apiClient.get<{ data: UserResource[] }>('/api/users');
      const users = data.data;

      const mappedUsers = users.map(user => ({
        id: user.id.toString(),
        title: user.name || user.email,
      }));

      allUsers.value = mappedUsers;
      selectedUsers.value = mappedUsers;
      resources.value = mappedUsers;
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const updateResources = () => {
    resources.value = selectedUsers.value.length === 0 ? allUsers.value : selectedUsers.value;
  };

  return {
    allUsers,
    selectedUsers,
    resources,
    fetchResources,
    updateResources,
  };
}
