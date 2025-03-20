"use client";

import { FC } from "react";
import { Email, EmailIdType, EmailLabel } from "@/types/emails";
import { computeCharsByWidth } from "@/lib/utils";
import clsx from "clsx";
import { format } from "date-fns";
import UserAvatar from "@/components/common/UserAvatar";
import { useEmail } from "@/context/EmailContext";

interface EmailItemProps {
  email: Email;
  selectItem: (id: string | number, checked: boolean) => void;
  selected: boolean;
  onOpen: (id: EmailIdType) => void;
  isCurrent: boolean;
  listingRef: any;
}

const EmailItem: FC<EmailItemProps> = ({
  email,
  onOpen,
  isCurrent,
  listingRef,
}) => {
  const { labels } = useEmail();

  const charsCount = () => {
    if (listingRef.current) {
      return (
        computeCharsByWidth(listingRef.current?.offsetWidth as number, 15) - 5
      );
    } else {
      return 80;
    }
  };

  const getLabelColor = (name: string) => {
    return (labels.find((item) => item.name == name) as EmailLabel)?.color;
  };

  return (
    <div
      className={clsx("w-full flex px-4  border-b hover:bg-primary/10", {
        "bg-primary/10": isCurrent,
      })}
    >
      <div className="pt-4 mr-3">
        <UserAvatar
          name={email.sender.name}
          avatar={email.sender.avatar as string}
        />
        {/* {["inbox", "spam", "draft", "archive", "trash"].includes(
          email.category
        ) && } */}
        {/* <div className="mt-2 w-full flex justify-center">
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={selected}
            value=""
            onChange={handleInputChange}
            className="w-3 h-3  text-primary bg-gray-100 border-gray-200 rounded focus:ring-primary-300"
          />
        </div> */}
      </div>

      <div
        className="w-full py-3 relative cursor-pointer"
        onClick={() => {
          onOpen(email.id);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3
              className={clsx("", {
                "font-medium": !email.isRead,
                "text-muted-foreground": email.isRead,
              })}
            >
              {email.sender.name}
            </h3>
            <div
              className="px-2 py-0.5 ml-2 rounded text-xs"
              style={{ backgroundColor: getLabelColor(email.label) }}
            >
              {email.label}
            </div>
          </div>

          <span className="text-muted-foreground text-sm">
            {format(email.createdAt, "MMM, dd yyyy")}
          </span>
        </div>

        <h4
          className={clsx("mt-1 text-sm ", {
            "font-semibold": !email.isRead,
            "text-muted-foreground": email.isRead,
          })}
        >
          {email.subject}
        </h4>

        <p className="mt-1 text-sm  text-muted-foreground">
          {email.body.slice(0, charsCount())}
          {`${email.body.length > charsCount() ? "..." : ""}`}
        </p>
      </div>
    </div>
  );
};

export default EmailItem;
