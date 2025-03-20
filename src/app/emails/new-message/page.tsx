"use client";

import { useEffect, useRef, useState } from "react";
import ComposeForm from "@/components/emails/compose-email/compose-form";
import { ComposedEmail } from "@/types/emails";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmail } from "@/context/EmailContext";

export default function NewMessagePage() {
  const composeContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { onNewEmail, notifySuccess, emailWrapperRef } = useEmail();

  const submit = (composedEmail: ComposedEmail) => {
    setLoading(true);
    onNewEmail(composedEmail).then(() => {
      setLoading(false);
      notifySuccess("onNewEmail", "Email send with success");
    });
  };

  useEffect(() => {
    if (composeContainerRef.current && emailWrapperRef.current) {
      // Remove the email wrapper heigh and emailTopbar
      // We add the space 80 for the foward topbar.
      composeContainerRef.current.style.height = `${
        emailWrapperRef.current.offsetHeight - 65
      }px`;
    }
  }, []);

  return (
    <section>
      <header className=" px-4 flex items-center justify-between">
        <h3 className="font-bold">New Message</h3>
        <button
          onClick={() => router.back()}
          className="bg-secondary/50  hover:bg-primary rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </header>
      <div id="compose-container" className="mt-4 px-4 overflow-auto">
        <ComposeForm
          id="new-message"
          init={{
            to: [],
            files: [],
          }}
          onSend={submit}
          editorHeight={400}
          loading={loading}
        />
      </div>
    </section>
  );
}
