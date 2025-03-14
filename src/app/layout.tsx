import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";

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
        <div className=" min-h-screen">
          <div className="fixed left-0 top-0 w-[115px] lg:w-[280px] h-screen border-r">
            <div className="bg-white rounded-md h-screen p-4 overflow-auto">
              <AppSidebar />
            </div>
          </div>
          <main className="md:pl-[115px] lg:pl-[280px]">
            <TopBar />
            <div className="">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
