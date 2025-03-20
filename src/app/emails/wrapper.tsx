"use client";

import { EmailProvider } from "@/context/EmailContext";
import { ReactNode, useRef } from "react";

export default function EmailWrapper({ children }: { children: ReactNode }) {
  const emailWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div id="email-wrapper" ref={emailWrapperRef} className="overflow-hidden">
      <EmailProvider emailWrapperRef={emailWrapperRef}>
        {children}
      </EmailProvider>
      ;
    </div>
  );
}
