import { ScheduleLabel } from "./endpoints/schedules";
export type {
  Email,
  Attachment,
  SendableAttachment,
  EmailIdType,
  ComposedEmail,
  EmailLabel,
} from "./endpoints/emails";

export type { ScheduleLabel } from "./endpoints/schedules";

export interface ListingPagination {
  data: any[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export type UriParams = Record<string, number | string>;
