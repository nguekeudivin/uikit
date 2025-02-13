"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";

export default function SpamsPage() {
  const { getActions, fetchData } = useEmail();

  useEffect(() => {
    fetchData({ category: "spam" });
  }, []);

  return <EmailClient actions={getActions()} />;
}
