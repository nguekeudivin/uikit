import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import UploadFileForm from "./UploadFileForm";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useFile } from "./FileContext";
import { v4 as uuidv4 } from "uuid";

export default function CreateFormDialog() {
  const { createFolder } = useFile();
  const [open, setOpen] = useState<boolean>(true);

  const [files, setFiles] = useState<File[]>([]);
  const form = useSimpleForm({
    defaultValues: {
      name: "",
    },
    schema: z.object({
      title: z.string().min(1, "Name is required"),
    }),
  });

  const submit = () => {
    createFolder({ id: uuidv4(), name: form.values.name, files });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger className="p-1 rounded-full bg-primary text-white">
        <Plus className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>

        <div>
          <Input
            name="name"
            onChange={form.handleChange}
            value={form.values.name}
            placeholder="Folder Name"
          />
        </div>

        <UploadFileForm files={files} setFiles={setFiles} />
        <DialogFooter className="flex sm:justify-between">
          <div>
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
          </div>
          <div>
            <Button variant="dark" onClick={submit}>
              {" "}
              Create the folder{" "}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
