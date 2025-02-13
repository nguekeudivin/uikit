"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";

export default function SentPage() {
  const { getActions, fetchData } = useEmail();

  useEffect(() => {
    fetchData({ category: "sent" });
  }, []);

  return <EmailClient actions={getActions()} />;
}
