import { FC, useEffect } from "react";
import ComposeForm from "./compose-form";
import { ComposedEmail } from "@/api-call/types";
import { X } from "lucide-react";

interface NewEmailProps {
  onClose: () => void;
  onNewEmail: (email: ComposedEmail) => void;
}

const NewEmail: FC<NewEmailProps> = ({ onClose, onNewEmail }) => {
  useEffect(() => {
    const composeContainer = document.getElementById("compose-container");
    const emailWrapper = document.getElementById("email-wrapper");
    if (composeContainer && emailWrapper) {
      // Remove the email wrapper heigh and emailTopbar
      // We add the space 80 for the foward topbar.
      composeContainer.style.height = `${emailWrapper.offsetHeight - 65}px`;
    }
  }, []);

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
      <div id="compose-container" className="mt-2 px-4 overflow-auto">
        <ComposeForm
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
