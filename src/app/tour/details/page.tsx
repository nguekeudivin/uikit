"use client";

import PageContent from "@/components/common/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronLeft,
  CloudUpload,
  ExternalLink,
  FileText,
  Pencil,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import TourContent from "./TourContent";
import TourBookers from "./TourBookers";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    name: "content",
    label: "Tour Content",
    count: undefined,
  },
  {
    name: "bookers",
    label: "Bookers",
    count: 15,
  },
];

export default function TourDetailsPage() {
  const [status, setStatus] = useState<string>("publish");
  return (
    <PageContent className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mt-4">
        <Link href="/tout/list">
          <Button variant="transparent" className="-ml-4">
            <ChevronLeft />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-6">
          <button className=" text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
            <ExternalLink className="w-5 h-5" />
          </button>
          <Link href="/tour/edit">
            <button className="text-muted-foreground p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-full">
              <Pencil className="w-5 h-5" />
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-900 text-white rounded-lg flex items-center px-4 py-2 gap-2">
              <span className="capitalize">{status}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatus("publish")}>
                <CloudUpload />
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("draft")}>
                <FileText />
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Tabs defaultValue="content" className="mt-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white w-auto grid p-0 m-0  grid-cols-5 gap-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={`tab${tab.name}`}
                value={tab.name}
                className="rounded-none py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-0"
              >
                <div className=" flex items-center gap-2">
                  <span>{tab.label}</span>
                  {tab.count != undefined && (
                    <span className="px-1 py-0 text-sm rounded-md text-white bg-gray-900">
                      {tab.count}
                    </span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-12 mb-24">
          <TabsContent value="content">
            <TourContent />
          </TabsContent>
          <TabsContent value="bookers">
            <TourBookers />
          </TabsContent>
        </div>
      </Tabs>
    </PageContent>
  );
}
