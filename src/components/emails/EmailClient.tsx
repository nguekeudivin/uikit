import { EmailAction, useEmail } from "@/context/EmailContext";
import EmailListing from "./email-listing/email-listing";
import EmailDetails from "./email-details/email-details";
import clsx from "clsx";

interface EmailClientProps {
  actions: EmailAction[];
}

export default function EmailClient({ actions }: EmailClientProps) {
  const { currentEmail } = useEmail();

  return (
    <div className="flex">
      <div
        className={clsx("", {
          "w-full": currentEmail == undefined,
          "w-2/5": currentEmail != undefined,
        })}
      >
        <EmailListing actions={actions} />
      </div>

      <div
        className={clsx("w-3/5 bg-gray-100 rounded-lg", {
          hidden: currentEmail == undefined,
        })}
      >
        <div className="rounded-lg">
          <div id="right-section" className="overfow-auto">
            <EmailDetails actions={actions} />
          </div>
        </div>
      </div>
    </div>
  );
}
