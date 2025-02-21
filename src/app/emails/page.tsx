"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";
import TopBar from "@/components/AppTopBar";

export default function InboxPage() {
  const { getActions, fetchData, onOpenEmail, currentEmail } = useEmail();

  useEffect(() => {
    fetchData({ category: "inbox" });
  }, []);

  return (
    <div>
      <EmailClient actions={getActions()} />;
    </div>
  );
}
