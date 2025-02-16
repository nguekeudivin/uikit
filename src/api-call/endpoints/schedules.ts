export interface ScheduleLabel {
  label: string;
  color: string;
}

export const createLabel = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => {
  // implement the api call to register a new label.
  return Promise.resolve({ label, color });
};

export const schedules = [
  {
    title: "Finance Meeting",
    label: "Finance",
    description: "Please arrive 10 minutes early for setup.",
    startDate: "2025-01-04T10:25:03.413000Z",
    endDate: "2025-01-04T12:58:03.413000Z",
  },
  {
    title: "Finance Meeting 1",
    label: "Finance",
    description: "Please arrive 10 minutes early for setup.",
    startDate: "2025-01-04T11:25:03.413000Z",
    endDate: "2025-01-04T13:58:03.413000Z",
  },
  {
    title: "Finance Meeting 1",
    label: "Finance",
    description: "Please arrive 10 minutes early for setup.",
    startDate: "2025-01-04T14:25:03.413000Z",
    endDate: "2025-01-04T15:58:03.413000Z",
  },
  {
    title: "Customer Support Meeting",
    label: "Customer Support",
    description: "Please bring your laptops for the presentation.",
    startDate: "2025-01-11T05:14:10.317000Z",
    endDate: "2025-01-11T06:47:10.317000Z",
  },
  {
    title: "Administration Meeting",
    label: "Administration",
    description: "Lunch will be provided after the meeting.",
    startDate: "2025-01-24T21:41:53.341000Z",
    endDate: "2025-01-24T22:43:53.341000Z",
  },
  {
    title: "Legal Meeting",
    label: "Legal",
    description: "Dress code: Business casual.",
    startDate: "2025-01-27T03:58:18.536000Z",
    endDate: "2025-01-27T06:16:18.536000Z",
  },
  {
    title: "Marketing Meeting",
    label: "Marketing",
    description: "Dress code: Business casual.",
    startDate: "2025-01-27T06:14:57.883000Z",
    endDate: "2025-01-27T07:29:57.883000Z",
  },
  {
    title: "Marketing Meeting",

    label: "Marketing",
    description: "Pre-meeting materials have been shared via email.",
    startDate: "2025-02-03T19:52:09.835000Z",
    endDate: "2025-02-03T21:30:09.835000Z",
  },
  {
    title: "Sales Meeting",

    label: "Sales",
    description: "This is a mandatory meeting for all team members.",
    startDate: "2025-02-13T02:49:21.025000Z",
    endDate: "2025-02-13T03:13:21.025000Z",
  },
  {
    title: "Engineering Meeting",

    label: "Engineering",
    description: "Please bring your laptops for the presentation.",
    startDate: "2025-02-17T09:36:37.469000Z",
    endDate: "2025-02-17T11:35:37.469000Z",
  },
];
