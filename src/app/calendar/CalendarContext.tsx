import { CalendarItem, CalendarItemLabel } from "@/types/calendar";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";

interface CalendarContextType {
  items: CalendarItem[];
  labels: CalendarItemLabel[];
  openForm: boolean;
  formMode: string;
  setLabels: Dispatch<SetStateAction<CalendarItemLabel[]>>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setFormMode: Dispatch<SetStateAction<string>>;
  startCreateItem: (startDate: Date, endDate: Date) => void;
  createItem: (item: CalendarItem) => Promise<CalendarItem>;
  startEditItem: (item: CalendarItem) => void;
  editItem: (item: CalendarItem) => Promise<CalendarItem>;
  createItemLabel: (label: CalendarItemLabel) => Promise<CalendarItemLabel>;
  renderItemComponent: (item: CalendarItem, index: number) => ReactNode;
}

export interface CalendarProvideProps {
  children: ReactNode;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const useCalendar = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};
