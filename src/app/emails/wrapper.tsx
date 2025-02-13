"use client";

import { EmailProvider } from "@/context/EmailContext";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

export default function EmailWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = document.getElementById("email-wrapper");
    const listing = document.getElementById("listing");
    const listingHeader = document.getElementById("listing-header");

    if (wrapper && listing && listingHeader) {
      wrapper.style.height = `${window.innerHeight - 150}px`;
      listing.style.height = `${
        window.innerHeight - listingHeader.offsetHeight - 150
      }px`;
    }
  }, [pathname]);

  return (
    <div id="email-wrapper" className="overflow-hidden">
      <EmailProvider>{children}</EmailProvider>;
    </div>
  );
}
