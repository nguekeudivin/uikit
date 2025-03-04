import { CloudUpload, FileStack, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFile } from "./FileContext";
import { useState } from "react";
import FileIcon from "../../components/common/FileIcon";
import UploadFileForm from "./UploadFileForm";

export default function UploadFileDialog() {
  const { openUpload, setOpenUpload, handleUploadedFiles } = useFile();
  const [files, setFiles] = useState<File[]>([]);

  const submit = () => {
    setOpenUpload(false);
    handleUploadedFiles(files);
  };

  return (
    <Dialog
      open={openUpload}
      onOpenChange={(value) => {
        setOpenUpload(value);
      }}
    >
      <DialogTrigger className="bg-gray-100 border p-6 inline-flex flex-col w-full items-center text-muted-foreground rounded-xl">
        <CloudUpload className="w-8 h-8" />
        <span>Upload file</span>
      </DialogTrigger>

      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
        </DialogHeader>
        <UploadFileForm files={files} setFiles={setFiles} />
        <DialogFooter>
          <Button onClick={submit} variant="dark" className="gap-2">
            <CloudUpload className="w-4 h-4" />
            Save
          </Button>
          {files.length > 0 && (
            <Button
              onClick={() => {
                setFiles([]);
              }}
              variant="outline"
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Remove all
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
