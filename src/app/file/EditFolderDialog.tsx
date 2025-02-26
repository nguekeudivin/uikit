import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import UploadFileForm from "./UploadFileForm";
import { Input } from "@/components/ui/input";
import { useFile } from "./FileContext";

interface EditFormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  form: any;
}

export default function EditFormDialog({
  open,
  setOpen,
  form,
}: EditFormDialogProps) {
  const { editFolder } = useFile();
  const [files, setFiles] = useState<File[]>([]);

  const submit = () => {
    editFolder(form.values.id, { name: form.values.name, files });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit folder</DialogTitle>
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
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
