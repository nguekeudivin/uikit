"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";

export default function StarredPage() {
  const { getActions, fetchData } = useEmail();

  useEffect(() => {
    fetchData({ category: "starred" });
  }, []);

  return <EmailClient actions={getActions()} />;
}
