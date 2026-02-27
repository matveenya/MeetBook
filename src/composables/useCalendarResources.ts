import { ref } from 'vue';
import { fetchUsersRequest } from '../api/modules/users';
import type { SelectedUser } from '../types/user';
import { mapUsersToSelectedUsers } from '../utils/userMapping';

export function useCalendarResources() {
  const allUsers = ref<SelectedUser[]>([]);
  const selectedUsers = ref<SelectedUser[]>([]);
  const resources = ref<SelectedUser[]>([]);

  const fetchResources = async () => {
    try {
      const users = await fetchUsersRequest();
      const mappedUsers = mapUsersToSelectedUsers(users);

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
