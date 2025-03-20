"use client";

import { FC, useEffect, useRef, useState } from "react";
import ComposeForm from "../compose-email/compose-form";
import { ComposedEmail, Email } from "@/types/emails";
import { fullReadableDate } from "@/lib/utils";
import { X } from "lucide-react";
import { useEmail } from "@/context/EmailContext";

interface ForwardEmailProps {
  email: Email;
  onClose: () => void;
}

const ForwardEmail: FC<ForwardEmailProps> = ({ email, onClose }) => {
  const composeContainerRef = useRef<HTMLDivElement>(null);
  const { onForward, notifySuccess, emailWrapperRef } = useEmail();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (composedEmail: ComposedEmail) => {
    setLoading(true);
    onForward(email.id, composedEmail)
      .then(() => {
        notifySuccess("forward", "The Email has been forwarded with success");
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (composeContainerRef.current && emailWrapperRef.current) {
      // Remove the email wrapper heigh and emailTopbar
      // We add the space 80 for the foward topbar.
      composeContainerRef.current.style.height = `${
        emailWrapperRef.current.offsetHeight - 50
      }px`;
    }
  }, []);

  return (
    <section className="">
      <header className="py-4 px-4 flex items-center justify-between">
        <h3 className="font-bold">Forward Email</h3>

        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 rounded"
        >
          <X className="w-6 h-6" />
        </button>
      </header>
      <div
        id="compose-container"
        ref={composeContainerRef}
        className="mt-2 px-4 overflow-auto pb-8"
      >
        <div className="bg-white rounded-lg p-8">
          <ComposeForm
            id="forward-email"
            init={{
              subject: email.subject,
              to: [],
              files: email.attachments.map((item) => ({
                attachment: item,
                name: item.fileName,
                size: item.size,
              })),
              body: `---------- Forwarded message ---------<br/> From : ${
                email.sender.name
              } (${email.sender.email}) <br/>Date: ${fullReadableDate(
                new Date(email.createdAt)
              )}<br/>Subject: ${email.subject}<br/>To: ${
                email.recipient.email
              }<br/><br/>${email.body}
                    `,
            }}
            onSend={submit}
            editorHeight={400}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default ForwardEmail;
