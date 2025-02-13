"use client";

import { useEmail } from "@/context/EmailContext";
import { useEffect } from "react";
import EmailClient from "@/components/emails/EmailClient";

export default function TrashPage() {
  const { getActions, fetchData } = useEmail();

  useEffect(() => {
    fetchData({ category: "trash" });
  }, []);

  return <EmailClient actions={getActions()} />;
}
