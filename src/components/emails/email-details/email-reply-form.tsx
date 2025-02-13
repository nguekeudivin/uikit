"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { FC, useState } from "react";
import { Email } from "@/api-call/types";
import ComposeForm from "../compose-email/compose-form";
import { useEmail } from "@/context/EmailContext";

interface EmailReplayFormProps {
  email: Email;
  onClose: () => void;
}

const EmailReplyForm: FC<EmailReplayFormProps> = ({ email, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { onReply, notifySuccess } = useEmail();

  return (
    <div className="mt-4 border rounded p-4">
      <ComposeForm
        id="reply-form"
        init={{ to: [email.sender.email], files: [] }}
        onSend={(composedEmail) => {
          setLoading(true);
          onReply(email.id, composedEmail)
            .then(() => {
              notifySuccess("reply", "Email reply send with success");
              onClose();
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        loading={loading}
      />
    </div>
  );
};

export default EmailReplyForm;
