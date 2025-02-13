"use client";

import {
  ComponentType,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import {
  ComposedEmail,
  Email,
  EmailIdType,
  EmailLabel,
  ListingPagination,
  UriParams,
} from "@/api-call/types";

import { useState, useCallback } from "react";
import {
  trashEmails,
  archiveEmails,
  deleteEmails,
  markEmailsAsRead,
  markEmailsAsUnread,
  markEmailsAsSpam,
  removeEmailsFromSpam,
  moveEmailsToInbox,
  viewEmailAttachment,
  downloadEmailAttachment,
  replyToEmail,
  forwardEmail,
  sendNewEmail,
  searchEmails,
  getEmails,
  starredEmails,
  getLabels,
} from "@/api-call/endpoints/emails";
import {
  Archive,
  MailCheck,
  MailOpen,
  MailWarning,
  OctagonAlert,
  OctagonX,
  Trash2,
  X,
} from "lucide-react";
import Errors from "@/components/custom/Errors";
import Success from "@/components/custom/Success";

export interface EmailAction {
  action: (ids: EmailIdType[]) => void;
  name: string;
  label: string;
  icon: ComponentType<any>;
}

interface EmailContextType {
  currentEmail: Email | undefined;
  emails: Email[];
  pagination: ListingPagination;
  labels: EmailLabel[];
  // actions.
  onTrash: (ids: EmailIdType[]) => Promise<any>;
  onArchive: (ids: EmailIdType[]) => Promise<any>;
  onDelete: (ids: EmailIdType[]) => Promise<any>;
  onMarkRead: (ids: EmailIdType[]) => Promise<any>;
  onMarkUnRead: (ids: EmailIdType[]) => Promise<any>;
  onSpam: (ids: EmailIdType[]) => Promise<any>;
  onNoSpam: (ids: EmailIdType[]) => Promise<any>;
  onInbox: (ids: EmailIdType[]) => Promise<any>;
  onStarred: (ids: EmailIdType[]) => Promise<any>;
  //
  onNextPage: () => void;
  onPreviousPage: () => void;
  onSearchInputChange: (value: string) => Promise<any>;
  onViewAttachment: (emailId: EmailIdType, index: number) => void;
  onDownloadAttachment: (emailId: EmailIdType, index: number) => void;
  onReply: (emailId: EmailIdType, reply: ComposedEmail) => Promise<any>;
  onForward: (emailId: EmailIdType, email: ComposedEmail) => Promise<any>;
  onNewEmail: (email: ComposedEmail) => Promise<any>;
  onCloseEmail: () => void;
  onOpenEmail: (id: EmailIdType) => void;
  //
  getActions: (names?: string[]) => EmailAction[];
  fetchData: (params?: UriParams) => Promise<any>;
  setEmails: Dispatch<SetStateAction<Email[]>>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  setSuccess: Dispatch<SetStateAction<Record<string, string>>>;
  notifySuccess: (key: string, value: string) => void;
  notifyError: (key: string, value: string) => void;
  setPagination: Dispatch<SetStateAction<ListingPagination>>;
  setCurrentEmail: Dispatch<SetStateAction<Email | undefined>>;
}

interface ResumeProviderProps {
  children: ReactNode;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [emails, setEmails] = useState<Email[]>([]);
  const [pagination, setPagination] = useState<ListingPagination>({
    data: [],
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0,
  });
  const [currentEmail, setCurrentEmail] = useState<Email | undefined>(
    undefined
  );
  const [labels, setLabels] = useState<EmailLabel[]>([]);

  const fetchData = (params: UriParams = {}) => {
    return getEmails(params)
      .then((data: { emails: Email[]; pagination: ListingPagination }) => {
        setEmails(data.emails), setPagination(data.pagination);
        return Promise.resolve(data);
      })
      .catch((error) => {
        setErrors((prev) => ({ ...prev, emails: "Failed to get emails" }));
        return Promise.reject(error);
      });
  };

  const handleError = (key: string, error: unknown) => {
    const message = error instanceof Error ? error.message : `Failed to ${key}`;
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  const resetError = (key: string) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const withErrorHandling =
    (key: string, fn: (...args: any[]) => Promise<any>) =>
    async (...args: any[]) => {
      resetError(key);
      setIsLoading((prev) => ({ ...prev, [key]: true }));
      try {
        const result = await fn(...args);
        return result;
      } catch (error) {
        handleError(key, error);
        throw error;
      } finally {
        setIsLoading((prev) => ({ ...prev, [key]: false }));
      }
    };

  // Define all methods using withErrorHandling
  const onTrash = useCallback(withErrorHandling("trash", trashEmails), []);
  const onArchive = useCallback(
    withErrorHandling("archive", archiveEmails),
    []
  );
  const onDelete = useCallback(withErrorHandling("delete", deleteEmails), []);
  const onMarkRead = useCallback(
    withErrorHandling("markRead", markEmailsAsRead),
    []
  );
  const onMarkUnRead = useCallback(
    withErrorHandling("markUnread", markEmailsAsUnread),
    []
  );
  const onSpam = useCallback(withErrorHandling("spam", markEmailsAsSpam), []);
  const onNoSpam = useCallback(
    withErrorHandling("noSpam", removeEmailsFromSpam),
    []
  );
  const onInbox = useCallback(
    withErrorHandling("inbox", moveEmailsToInbox),
    []
  );
  const onStarred = useCallback(withErrorHandling("inbox", starredEmails), []);
  const onViewAttachment = useCallback(
    withErrorHandling("viewAttachment", viewEmailAttachment),
    []
  );
  const onDownloadAttachment = useCallback(
    withErrorHandling("downloadAttachment", downloadEmailAttachment),
    []
  );
  const onReply = useCallback(withErrorHandling("reply", replyToEmail), []);
  const onForward = useCallback(withErrorHandling("forward", forwardEmail), []);
  const onNewEmail = useCallback(
    withErrorHandling("newEmail", sendNewEmail),
    []
  );

  const onSearchInputChange = useCallback(
    withErrorHandling("search", searchEmails),
    []
  );

  const onCloseEmail = () => {
    setCurrentEmail(undefined);
  };
  const onOpenEmail = (id: EmailIdType) => {
    setCurrentEmail(emails.find((item) => item.id == id));
  };

  const onNextPage = () => {
    if (pagination.currentPage !== pagination.lastPage) {
      getEmails({ page: pagination.currentPage + 1 });
    }
  };

  const onPreviousPage = () => {
    if (pagination.currentPage !== 1) {
      getEmails({ page: pagination.currentPage + 1 });
    }
  };

  const actions: EmailAction[] = [
    {
      action: onArchive,
      label: "Archive",
      icon: Archive,
      name: "archive",
    },
    {
      action: onSpam,
      label: "Spam",
      icon: OctagonAlert,
      name: "spam",
    },
    {
      action: onTrash,
      label: "Trash",
      icon: Trash2,
      name: "trask",
    },
    {
      action: onDelete,
      label: "Delete",
      icon: X,
      name: "delete",
    },
    {
      action: onMarkRead,
      label: "Mark Read",
      icon: MailCheck,
      name: "markAsRead",
    },
    {
      action: onMarkUnRead,
      label: "Mark as UnRead",
      icon: MailWarning,
      name: "markAsUnread",
    },
    {
      action: onNoSpam,
      label: "No Spam",
      icon: OctagonX,
      name: "noSpam",
    },
    {
      action: onInbox,
      label: "Send to Inbox",
      icon: MailOpen,
      name: "sendToInbox",
    },
  ];

  const getActions = (names: string[] = []) => {
    if (names.length == 0) {
      return actions;
    }
    return actions.filter((item) => names.includes(item.name));
  };

  useEffect(() => {
    getLabels().then((labels) => {
      setLabels(labels);
    });
  }, []);

  return (
    <EmailContext.Provider
      value={{
        // Handle the current email.
        currentEmail,
        emails,
        pagination,
        labels,
        onOpenEmail,
        onTrash,
        onDelete,
        onArchive,
        onMarkRead,
        onMarkUnRead,
        onSpam,
        onNoSpam,
        onInbox,
        onStarred,
        onNextPage,
        onPreviousPage,
        onViewAttachment,
        onDownloadAttachment,
        onReply,
        onForward,
        onNewEmail,
        onCloseEmail,
        onSearchInputChange,
        getActions,
        fetchData,
        setCurrentEmail,
        setPagination,
        setEmails,
        setErrors,
        setSuccess,
        notifyError: (key: string, value: string) =>
          setErrors((prev) => ({ ...prev, [key]: value })),
        notifySuccess: (key: string, value: string) =>
          setSuccess((prev) => ({ ...prev, [key]: value })),
      }}
    >
      <Errors errors={errors} setErrors={setErrors} />
      <Success success={success} setSuccess={setSuccess} />
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};
