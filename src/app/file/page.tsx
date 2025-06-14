"use client";

import { DataActivity } from "./DataActivity";
import Folders from "./Folders";
import StorageCoverage from "./StorageCoverage";
import { useState } from "react";
import { FileContext } from "./FileContext";
import RecentFiles from "./RecentFiles";
import UsageMetrics from "./UsageMetrics";
import { Button } from "@/components/ui/button";
import UploadFileDialog from "./UploadFileDialog";

import { CloudUpload } from "lucide-react";

export default function FilePage() {
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [openFolderDialog, setOpenFolderDialog] = useState<boolean>(false);

  const handleUploadedFiles = () => {
    // handle uploaded files here.
  };

  const createFolder = () => {
    // handle folder creation.
  };

  const editFolder = () => {
    // handle edit folder.
  };

  const deleteFolder = () => {
    // handle delete here.
  };

  return (
    <FileContext.Provider
      value={{
        openUpload,
        handleUploadedFiles,
        setOpenUpload,
        createFolder,
        editFolder,
        deleteFolder,
        openFolderDialog,
        setOpenFolderDialog,
      }}
    >
      <div className="p-8 pt-0">
        <StorageCoverage />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <aside className="space-y-8 md:col-span-2">
            <DataActivity />

            <Folders />

            <RecentFiles />
          </aside>
          <aside className="space-y-8">
            <UploadFileDialog />

            <button
              onClick={() => {
                setOpenUpload(true);
              }}
              className="bg-gray-100 border p-6 inline-flex flex-col w-full items-center text-muted-foreground rounded-xl"
            >
              <CloudUpload className="w-8 h-8" />
              <span>Upload file</span>
            </button>

            <UsageMetrics />

            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-between text-white rounded-xl">
              <div>
                <p className="text-xl font-semibold">
                  Upgrade your plan <br /> and get more space
                </p>
                <Button className="mt-4"> Updrade Now</Button>
              </div>
              <div></div>
            </div>
          </aside>
        </div>
      </div>
      <div className="h-24"></div>
    </FileContext.Provider>
  );
}
