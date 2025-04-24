import { CalendarItem, CalendarItemLabel } from "@/types/calendar";
import { IdType } from "@/types/shared";

export const storeItemLabel = (item: CalendarItemLabel) => {
  // Implement the api call to store a calendar item label.
  return Promise.resolve(item);
};

export const storeItem = (item: CalendarItem) => {
  // Implement the api call to store a calendar item.
  return Promise.resolve(item);
};

export const updateItem = (id: IdType, item: CalendarItem) => {
  // Implement the api call to update a calendar item
  return Promise.resolve(item);
};

export const fetchLabels = () => {
  return Promise.resolve([
    { name: "Engineering", color: "#9A3412" },
    { name: "Marketing", color: "#4D7C0F" },
    { name: "Sales", color: "#0891B2" },
    { name: "Customer Support", color: "#1D4ED8" },
    { name: "Finance", color: "#1D4ED8" },
    { name: "Human Resources", color: "#DB2777" },
    { name: "Legal", color: "#E11D48" },
    { name: "Administration", color: "#15803D" },
  ]);
};

export const fetchItems = () => {
  return Promise.resolve(
    [
      {
        id: "1",
        title: "Finance Meeting",
        label: "Finance",
        description: "Please arrive 10 minutes early for setup.",
        startDate: "2025-04-04T10:25:03.413000Z",
        endDate: "2025-04-04T12:58:03.413000Z",
      },
      {
        id: "2",
        title: "Finance Meeting 1",
        label: "Finance",
        description: "Please arrive 10 minutes early for setup.",
        startDate: "2025-04-04T11:25:03.413000Z",
        endDate: "2025-04-04T13:58:03.413000Z",
      },
      {
        id: "3",
        title: "Finance Meeting 1",
        label: "Finance",
        description: "Please arrive 10 minutes early for setup.",
        startDate: "2025-04-04T14:25:03.413000Z",
        endDate: "2025-04-04T15:58:03.413000Z",
      },
      {
        id: "4",
        title: "Customer Support Meeting",
        label: "Customer Support",
        description: "Please bring your laptops for the presentation.",
        startDate: "2025-04-11T05:14:10.317000Z",
        endDate: "2025-04-11T06:47:10.317000Z",
      },
      {
        id: "5",
        title: "Administration Meeting",
        label: "Administration",
        description: "Lunch will be provided after the meeting.",
        startDate: "2025-04-24T21:41:53.341000Z",
        endDate: "2025-04-24T22:43:53.341000Z",
      },
      {
        id: "6",
        title: "Legal Meeting",
        label: "Legal",
        description: "Dress code: Business casual.",
        startDate: "2025-04-27T03:58:18.536000Z",
        endDate: "2025-04-27T06:16:18.536000Z",
      },
      {
        id: "7",
        title: "Marketing Meeting",
        label: "Marketing",
        description: "Dress code: Business casual.",
        startDate: "2025-04-27T06:14:57.883000Z",
        endDate: "2025-04-27T07:29:57.883000Z",
      },
      {
        id: "8",
        title: "Marketing Meeting",
        label: "Marketing",
        description: "Pre-meeting materials have been shared via email.",
        startDate: "2025-05-03T19:52:09.835000Z",
        endDate: "2025-05-03T21:30:09.835000Z",
      },
      {
        id: "9",
        title: "Sales Meeting",
        label: "Sales",
        description: "This is a mandatory meeting for all team members.",
        startDate: "2025-05-13T02:49:21.025000Z",
        endDate: "2025-05-13T03:13:21.025000Z",
      },
      {
        id: "10",
        title: "Engineering Meeting",
        label: "Engineering",
        description: "Please bring your laptops for the presentation.",
        startDate: "2025-05-17T09:36:37.469000Z",
        endDate: "2025-05-17T19:35:37.469000Z",
      },
    ].map((item) => ({
      ...item,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
    }))
  );
};
