import type { Meeting } from '../types/meeting';
import type { SelectedUser } from '../types/user';

export const getMeetingParticipants = (
  allMeetings: Meeting[],
  allUsers: SelectedUser[],
  clickedEvent: {
    title: string;
    start: number | undefined;
    end: number | undefined;
    resourceId: string | null;
  }
): SelectedUser[] => {
  const { title, start, end, resourceId } = clickedEvent;

  return allMeetings
    .filter(m => {
      const mStart = new Date(m.start).getTime();
      const mEnd = new Date(m.end).getTime();

      return (
        m.title === title &&
        mStart === start &&
        mEnd === end &&
        (resourceId === null || String(m.resourceId) !== resourceId)
      );
    })
    .map(m => allUsers.find(u => String(u.id) === String(m.resourceId)))
    .filter((u): u is SelectedUser => !!u);
};
