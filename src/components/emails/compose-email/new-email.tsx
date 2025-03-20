"use client";

import { FC, useEffect, useRef, useState } from "react";
import ComposeForm from "./compose-form";
import { ComposedEmail } from "@/types/emails";
import { X } from "lucide-react";
import { useEmail } from "@/context/EmailContext";

interface NewEmailProps {
  onClose: () => void;
  onNewEmail: (email: ComposedEmail) => void;
}

const NewEmail: FC<NewEmailProps> = ({ onClose, onNewEmail }) => {
  const { emailWrapperRef } = useEmail();

  const composeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (composeContainerRef.current && emailWrapperRef.current) {
      // Remove the email wrapper heigh and emailTopbar
      // We add the space 80 for the foward topbar.
      composeContainerRef.current.style.height = `${
        emailWrapperRef.current.offsetHeight - 65
      }px`;
    }
  }, []);

  const [loading] = useState<boolean>(false);

  return (
    <section>
      <header className="border-t border-b h-[65px] px-4 flex items-center justify-between">
        <h3 className="font-bold">New Message</h3>
        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 rounded"
        >
          <X className="w-6 h-6" />
        </button>
      </header>
      <div
        ref={composeContainerRef}
        id="compose-container"
        className="mt-2 px-4 overflow-auto"
      >
        <ComposeForm
          loading={loading}
          id="forward-email"
          init={{
            to: [],
            files: [],
          }}
          onSend={(composedEmail) => {
            onNewEmail(composedEmail);
          }}
          editorHeight={400}
        />
      </div>
    </section>
  );
};

export default NewEmail;
