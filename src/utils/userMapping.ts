import type { SelectedUser, UserResource } from '@/types/user';

export const getUserDisplayName = (user: Pick<UserResource, 'name' | 'email'>) =>
  user.name || user.email;

export const mapUserToSelectedUser = (user: UserResource): SelectedUser => ({
  id: String(user.id),
  title: getUserDisplayName(user),
});

export const mapUsersToSelectedUsers = (users: UserResource[]) => users.map(mapUserToSelectedUser);

export const mapUsersToLabelMap = (users: UserResource[]) => {
  const labelsById: Record<string, string> = {};

  users.forEach(user => {
    labelsById[String(user.id)] = getUserDisplayName(user);
  });

  return labelsById;
};
