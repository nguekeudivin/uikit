"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";

export default function InboxPage() {
  const { getActions, fetchData } = useEmail();

  useEffect(() => {
    fetchData({ category: "inbox" });
  }, []);

  return (
    <div>
      {" "}
      <EmailClient actions={getActions()} />
    </div>
  );
}
