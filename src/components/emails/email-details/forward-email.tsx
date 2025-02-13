import { FC, useEffect, useState } from "react";
import ComposeForm from "../compose-email/compose-form";
import { ComposedEmail, Email, EmailIdType } from "@/api-call/types";
import { fullReadableDate } from "@/lib/utils";
import { X } from "lucide-react";
import { useEmail } from "@/context/EmailContext";

interface ForwardEmailProps {
  email: Email;
  onClose: () => void;
}

const ForwardEmail: FC<ForwardEmailProps> = ({ email, onClose }) => {
  useEffect(() => {
    if (document) {
      const composeContainer = document.getElementById("compose-container");
      const emailWrapper = document.getElementById("email-wrapper");
      if (composeContainer && emailWrapper) {
        // Remove the email wrapper heigh and emailTopbar
        // We add the space 80 for the foward topbar.
        composeContainer.style.height = `${emailWrapper.offsetHeight - 50}px`;
      }
    }
  }, []);

  const { onForward, notifySuccess } = useEmail();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (composedEmail: ComposedEmail) => {
    console.log("forward email");
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
      <div id="compose-container" className="mt-2 px-4 overflow-auto pb-8">
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
