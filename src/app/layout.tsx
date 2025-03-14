import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";

import { Source_Sans_3 } from "next/font/google";

// import { Public_Sans } from "next/font/google";
import TopBar from "@/components/AppTopBar";

const sourceSans = Source_Sans_3({
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maximals",
  description: "Maximals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <div className="min-h-screen">
          <AppSidebar>{children} </AppSidebar>
        </div>
      </body>
    </html>
  );
}
