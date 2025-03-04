import { FC } from "react";
import { Email, EmailIdType } from "@/types/emails";
import { getFileIcon } from "@/lib/file-icon";
import { formatSize } from "@/lib/utils";
import { useEmail } from "@/context/EmailContext";
import { Attachment } from "@/types/emails";

interface EmailAttachmentsProps {
  email: Email;
}

const EmailAttachments: FC<EmailAttachmentsProps> = ({ email }) => {
  const { onViewAttachment, onDownloadAttachment } = useEmail();

  return (
    <div className="mt-8 border rounded">
      <div className="bg-gray-50 px-4 py-2 rounded">Attachements</div>
      <div className="flex flex-wrap items-center px-4 py-4">
        {email.attachments.map((item: Attachment, index: number) => (
          <div
            key={`attachement${index}`}
            className=" flex items-center mr-4 mt-2"
          >
            <div className="w-10 h-10 bg-gray-50 text-white flex items-center justify-center rounded border">
              {getFileIcon(item.fileName, "w-6 h-6")}
            </div>
            <div className="ml-2">
              <div className="flex items-center">
                <h4 className="font-bold">{item.fileName}</h4>
                <span className="text-gray-500 ml-2">
                  {formatSize(item.size)} kb
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onViewAttachment(item.id, index);
                  }}
                  className="text-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    onDownloadAttachment(item.id, index);
                  }}
                  className="text-blue-600"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailAttachments;
