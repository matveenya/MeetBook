import type { Meeting } from '../types/meeting';

export interface DayRange {
  start: Date;
  end: Date;
}

export const getDayRange = (date: Date): DayRange => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

export const isMeetingInRange = (meeting: Meeting, range: DayRange): boolean => {
  const meetingStart = new Date(meeting.start);
  const meetingEnd = new Date(meeting.end);

  return meetingStart < range.end && meetingEnd > range.start;
};

export const getAccountDailyMeetings = (
  meetings: Meeting[],
  accountUserId: string,
  dayDate: Date | null
): Meeting[] => {
  if (!dayDate || !accountUserId) return [];

  const range = getDayRange(dayDate);
  return meetings.filter(
    meeting => String(meeting.resourceId) === accountUserId && isMeetingInRange(meeting, range)
  );
};

export const getTotalMeetings = (meetings: Meeting[]): number => meetings.length;
