"use client";

import { FC, useState } from "react";
import EmailAddressInput from "../email-details/email-address-input";
import { ComposedEmail, SendableAttachment } from "@/types/emails";
import React from "react";
import { formatSize } from "@/lib/utils";
import { Loader2, Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorField from "@/components/common/form/EditorField";

interface ComposeFormProps {
  id: string;
  init: Partial<ComposedEmail>;
  onSend: (composed: ComposedEmail) => void;
  hasSubject?: boolean;
  editorHeight?: number;
  loading: boolean;
}

const ComposeForm: FC<ComposeFormProps> = ({
  id,
  init,
  onSend,
  hasSubject = true,
  editorHeight = 200,
  loading,
}) => {
  const [files, setFiles] = useState<any[]>(init.files as SendableAttachment[]);
  const [subject, setSubject] = useState<string>(
    init.subject != undefined ? (init.subject as string) : ""
  );
  const [error, setError] = useState<string>("");
  const [content, setContent] = useState<string>(init.body as string);

  const uploadAttachments = (e: any) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      setFiles((values) => [
        ...values,
        {
          name: files[i].name,
          file: files[i],
          attachment: undefined,
          size: Math.ceil(files[i].size / 1024), //convert in kb
        },
      ]);
    }
  };

  const [emailAddresses, setEmailAddresses] = useState<
    Record<string, string[]>
  >({
    to: [...(init!.to as string[])],
    cc: [],
    bcc: [],
  });

  const addEmailAddress = (group: string, email: string) => {
    if (!emailAddresses[group].includes(email)) {
      setEmailAddresses((values: Record<string, string[]>) => ({
        ...values,
        [group]: [...values[group], email],
      }));
    }
  };

  const removeEmailAddress = (group: string, email: string) => {
    setEmailAddresses((values: Record<string, string[]>) => ({
      ...values,
      [group]: values[group].filter((item) => item != email),
    }));
  };

  const [hasGroup, setHasGroup] = useState<Record<string, boolean>>({
    cc: false,
    bcc: false,
  });

  const toggleEmailAddressGroup = (group: string) => {
    if (hasGroup[group]) {
      setHasGroup((obj) => ({ ...obj, [group]: false }));
      // Remove the emailAddresses.
      setEmailAddresses((values: Record<string, string[]>) => ({
        ...values,
        [group]: [],
      }));
    } else {
      setHasGroup((obj) => ({ ...obj, [group]: true }));
    }
  };

  const submit = () => {
    setError("");
    if (emailAddresses.to.length == 0) {
      setError("Provide destinators email address");
      return 0;
    }
    onSend({
      body: content,
      to: emailAddresses.to,
      cc: emailAddresses.cc,
      bcc: emailAddresses.bcc,
      files: files,
      subject: subject,
    });
  };

  const handleSubjectInput = (e: any) => {
    setSubject(e.target.value);
  };

  return (
    <>
      {error != "" && (
        <div className="bg-red-50 text-red-500 p-2 rounded">{error}</div>
      )}

      <div className="flex justify-between bg-gray-50  rounded py-2">
        <div className="space-y-2">
          <EmailAddressInput
            group="to"
            emailAddresses={emailAddresses.to}
            addEmailAddress={addEmailAddress}
            removeEmailAddress={removeEmailAddress}
          />

          {hasGroup["cc"] && (
            <EmailAddressInput
              group="cc"
              emailAddresses={emailAddresses.cc}
              addEmailAddress={addEmailAddress}
              removeEmailAddress={removeEmailAddress}
            />
          )}

          {hasGroup["bcc"] && (
            <EmailAddressInput
              group="bcc"
              emailAddresses={emailAddresses.bcc}
              addEmailAddress={addEmailAddress}
              removeEmailAddress={removeEmailAddress}
            />
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                toggleEmailAddressGroup("cc");
              }}
            >
              Cc
            </button>
            <button
              onClick={() => {
                toggleEmailAddressGroup("bcc");
              }}
            >
              Bcc
            </button>
          </div>
        </div>
      </div>

      {hasSubject && (
        <div className="mt-2 flex items-center">
          <input
            value={subject}
            placeholder="Subject"
            onChange={handleSubjectInput}
            className="block w-full py-2 w-full  bg-gray-100 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="mt-4" id={id}>
        <EditorField
          content={content}
          onContentChange={(content: string) => {
            setContent(content);
          }}
          contentClassName={`min-h-[${editorHeight}]`}
          //  error={form.errors.content}
        />
      </div>

      {files.length != 0 && (
        <ul className="my-4 px-4">
          {files.map((item, index) => (
            <li
              key={`uploaded-file${index}`}
              className="flex items-center justify-between bg-primary/10 py-2 px-4 mt-2"
            >
              <div className="flex items-center">
                <h4 className="font-bold">{item.name}</h4>
                <span className="text-gray-500 ml-2">
                  {formatSize(item.size)} kb
                </span>
              </div>
              <button
                className=""
                onClick={() => {
                  setFiles((files: any[]) =>
                    files.filter((file: any) => file.name != item.name)
                  );
                }}
              >
                <X />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="p-4 flex items-center space-x-2">
        <Button onClick={submit} disabled={loading}>
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span className="mr-4">Send</span>
              <Send className="w-5 h-5" />{" "}
            </>
          )}
        </Button>
        <div>
          <input
            id="upload-attachments"
            className="hidden"
            type="file"
            onChange={uploadAttachments}
          />
          <label
            htmlFor="upload-attachments"
            onClick={() => {}}
            className="bg-primary/10 p-2 rounded-lg hover:bg-gray-100 inline-flex space-x-1 items-center"
          >
            <Paperclip />
            <span>Attach File</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ComposeForm;
