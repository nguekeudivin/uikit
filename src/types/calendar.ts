export interface CalendarItem {
  label: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface CalendarItemLabel {
  name: string;
  color: string;
}

export type AddItemFunction = (startDate: Date, endDate: Date) => void;
