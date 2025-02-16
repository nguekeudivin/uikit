import { formatUriParams, paginateArray } from "@/lib/utils";
import { httpClient } from "../request";
import { UriParams } from "../types";

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

// Api call declarations.
export const getEmails = (params: UriParams = {}) => {
  //  params = {
  //     category: in("inbox , darft, archive, spam, trash, sent")
  //     page: 1,
  //     perPage: 15,
  //  }
  return httpClient()
    .get(`emails?${formatUriParams(params)}`)
    .then((res) => {
      // If the data is paginate by the api disable this fallback pagination. And returned directly the pagined version from the server,
      return Promise.resolve({
        emails: res.data,
        // We create a pagination with only one page that show all emails.
        pagination: paginateArray(res.data, 1, res.data.length),
      });
    });
};

// Implement the api call to handles each action
// Now we just return what is sent as params.

export const trashEmails = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);
  // return httpClient().post("/emails/trash", { ids });
};

export const archiveEmails = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);
  //return httpClient().post("/emails/archive", { ids });
};

export const deleteEmails = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);
  // return httpClient().post("/emails/delete", { ids });
};

export const markEmailsAsRead = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);

  //return httpClient().post("/emails/mark-read", { ids });
};

export const markEmailsAsUnread = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);

  //return httpClient().post("/emails/mark-unread", { ids });
};

export const markEmailsAsSpam = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);

  //return httpClient().post("/emails/spam", { ids });
};

export const removeEmailsFromSpam = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);

  // return httpClient().post("/emails/remove-spam", { ids });
};

export const moveEmailsToInbox = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);

  //return httpClient().post("/emails/inbox", { ids });
};

export const viewEmailAttachment = (emailId: EmailIdType, index: number) => {
  return httpClient().get(`/emails/${emailId}/attachments/${index}`);
};

export const downloadEmailAttachment = (
  emailId: EmailIdType,
  index: number
) => {
  return httpClient().get(`/emails/${emailId}/attachments/${index}/download`, {
    responseType: "blob", // For file downloads
  });
};

export const replyToEmail = (emailId: EmailIdType, reply: ComposedEmail) => {
  return Promise.resolve(reply);
  //return httpClient().post(`/emails/${emailId}/reply`, reply);
};

export const forwardEmail = (emailId: EmailIdType, content: ComposedEmail) => {
  return Promise.resolve(content);
  //return httpClient().post(`/emails/${emailId}/forward`, content);
};

export const sendNewEmail = (email: ComposedEmail) => {
  return Promise.resolve(email);

  //return httpClient().post("/emails/send", email);
};

export const searchEmails = (params: UriParams) => {
  return Promise.resolve([]);
  //return httpClient().get(`/emails/search?${formatUriParams(params)}`);
};

export const starredEmails = (ids: EmailIdType[]) => {
  return Promise.resolve(ids);
};

export const getLabels = () => {
  return Promise.resolve([
    { name: "Team", color: "#CAD2FE" },
    {
      name: "Candidate",
      color: "#D0ED5A",
    },
  ]);
  // return httpClient().get("emails/labels");
};
