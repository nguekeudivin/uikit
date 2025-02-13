export type UriParams = Record<string, number | string>;

export interface EmailUser {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  avatar?: string;
}

export interface Email {
  id: string; // Unique identifier
  sender: EmailUser;
  recipient: EmailUser;
  subject: string; // Subject of the email
  body: string; // Main content (HTML or plain text)
  attachments: Attachment[]; // Optional list of attachments
  isRead: boolean; // Flag for read/unread status
  category: string; // inbox, spam, draft, archive
  createdAt: string; // Timestamp of email creation
  updatedAt?: string | null; // Optional timestamp for modifications
  label: string;
}

// Optional Attachment model
export interface Attachment {
  id: string;
  fileName: string;
  fileType: string; // MIME type, e.g., "application/pdf"
  size: number; // Size in bytes
  url: string; // Link to download or preview the file
}

export interface SendableAttachment {
  name: string;
  file?: any;
  attachment?: Attachment;
  size: number;
}

export interface ListingPagination {
  data: any[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export type EmailIdType = string | number;

export interface ComposedEmail {
  body: string;
  to: string[];
  cc: string[];
  bcc: string[];
  files: SendableAttachment[];
  subject: string;
}

export interface EmailLabel {
  name: string;
  color: string;
}

