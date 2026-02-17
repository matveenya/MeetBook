import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions } from '@fullcalendar/core';
import type { ViewApi } from '@fullcalendar/core';
import type { ResourceApi } from '@fullcalendar/resource';

export interface ResourceLabelContentArg {
  resource: ResourceApi;
  fieldValue: string;
  view: ViewApi;
}

export const BASE_CALENDAR_OPTIONS: Partial<CalendarOptions> = {
  plugins: [resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  headerToolbar: false,
  height: '70vh',
  slotMinTime: '01:00:00',
  slotMaxTime: '24:00:00',
  slotDuration: '01:00:00',
  allDaySlot: false,
  selectable: true,
  editable: true,
};

export const renderResourceHeader = (arg: ResourceLabelContentArg) => ({
  html: `
    <div class="flex items-center gap-2 p-2">
      <img src="https://ui-avatars.com/api/?name=${arg.resource.title}&background=random" 
           class="w-8 h-8 rounded-full" />
      <div class="font-bold text-sm">${arg.resource.title}</div>
    </div>
  `,
});
