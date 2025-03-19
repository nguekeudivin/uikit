import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFile } from "./FileContext";
import { useState } from "react";
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
