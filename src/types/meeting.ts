export interface Meeting {
  id: string;
  title: string;
  start: string;
  end: string;
  resourceId: string;
}

export interface MeetingData {
  title: string;
  start: string;
  end: string;
  userId: string;
  invitedIds: string[];
}
