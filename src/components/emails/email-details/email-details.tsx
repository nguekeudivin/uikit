"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Forward, Reply, Star } from "lucide-react";
import DOMPurify from "dompurify";
import EmailReplyForm from "./email-reply-form";
import EmailAttachments from "./email-attachments";
import { EmailAction, useEmail } from "@/context/EmailContext";
import UserAvatar from "@/components/common/UserAvatar";
import { format } from "date-fns";
import ForwardEmail from "./forward-email";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailIdType } from "@/types/emails";

interface EmailDetailsProps {
  actions: EmailAction[];
}

const EmailDetails: FC<EmailDetailsProps> = ({ actions }) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isForwarding, setIsForwarding] = useState<boolean>(false);

  const {
    currentEmail: email,
    pagination,
    onOpenEmail,
    notifySuccess,
    onStarred,
    emailWrapperRef,
  } = useEmail();

  const emailContentRef = useRef<HTMLDivElement>(null);
  const emailHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      emailContentRef.current &&
      emailHeaderRef.current &&
      emailWrapperRef.current
    ) {
      emailContentRef.current.style.height = `${
        emailWrapperRef.current.offsetHeight -
        emailHeaderRef.current.offsetHeight
      }px`;
    }
  }, [email]);

  const startReplying = () => {
    setIsReplying(true);
    if (emailContentRef.current) {
      emailContentRef.current.scrollTop = emailContentRef.current.scrollHeight;
    }
  };

  const startForwarding = () => {
    setIsForwarding(true);
  };

  const getEmailIndex = () => {
    for (let i = 0; pagination.data.length; i++) {
      if (pagination.data[i].id == email?.id) {
        return i;
      }
    }
    return 0;
  };

  const openPrevEmail = () => {
    const index = getEmailIndex();
    if (index > 0) onOpenEmail(pagination.data[index - 1].id);
  };

  const openNextEmail = () => {
    const index = getEmailIndex();
    if (index < pagination.data.length - 1)
      onOpenEmail(pagination.data[index + 1].id);
  };

  const starredEmail = () => {
    onStarred([email?.id as EmailIdType]).then(() => {
      notifySuccess("Starred", "Email starred with success");
    });
  };

  if (email && !isForwarding) {
    return (
      <>
        <header
          id="email-header"
          ref={emailHeaderRef}
          className=" text-muted-foreground"
        >
          <div className="flex items-center justify-between px-4 py-2">
            <div>
              <div className="pt-4 flex items-center space-x-4">
                {actions.map((item: any, index: number) => (
                  <div key={`action${index}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            item.action([email.id]).then(() => {
                              notifySuccess(
                                item.name,
                                "Action perform with success"
                              );
                            });
                          }}
                        >
                          <item.icon className="w-5 h-5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="text-gray-800">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center text-muted-foreground space-x-2">
              <button onClick={openPrevEmail}>
                <ChevronLeft />
              </button>
              <span>
                {getEmailIndex()} / {pagination.perPage}
              </span>
              <button onClick={openNextEmail}>
                <ChevronRight />
              </button>
            </div>
            <div>
              <ul className="flex items-center mt-1 space-x-4">
                <li>
                  <button
                    onClick={starredEmail}
                    className="flex items-center text-gray-600"
                  >
                    <Star />
                  </button>
                </li>

                <li>
                  <button
                    onClick={startReplying}
                    className="flex items-center text-gray-600"
                  >
                    <Reply />
                    <span className="text-sm ml-1">Reply</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={startForwarding}
                    className="flex items-center text-gray-600"
                  >
                    <Forward />
                    <span className="text-sm ml-1">Forward</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section
          className="overflow-auto  px-4 pb-8"
          ref={emailContentRef}
          id="email-content"
        >
          <div className="bg-white p-8 rounded">
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="">
                  <UserAvatar
                    name={email.sender.name}
                    avatar={email.sender.avatar as string}
                  />
                </div>
                <div className="ml-2">
                  <h3 className="">{email.sender.name}</h3>
                  <h4 className="text-sm">{email.sender.email}</h4>
                </div>
              </div>

              <div>
                <ul className="flex items-center mt-1 space-x-4">
                  <div className="text-gray-700 text-right">
                    <p> {format(new Date(email.createdAt), "MMMM, dd yyyy")}</p>
                    <p>{format(new Date(email.createdAt), "HH:mm")}</p>
                  </div>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="font-bold text-lg">{email.subject}</h2>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(email.body),
                }}
              ></div>
            </div>

            {email.attachments.length != 0 && (
              <EmailAttachments email={email} />
            )}

            {isReplying && (
              <EmailReplyForm
                onClose={() => setIsReplying(false)}
                email={email}
              />
            )}
          </div>
        </section>
      </>
    );
  } else if (email && isForwarding) {
    return (
      <ForwardEmail email={email} onClose={() => setIsForwarding(false)} />
    );
  } else return null;
};

export default EmailDetails;
