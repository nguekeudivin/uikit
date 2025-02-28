import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../../components/ui/label";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import Errors from "../../components/common/Errors";
import { useCalendar } from "./CalendarContext";

export default function AddNewLabel() {
  const [open, setOpen] = useState<boolean>(false);

  const { createItemLabel } = useCalendar();

  const { values, handleChange, validate, errors, setErrors } = useSimpleForm({
    defaultValues: {
      color: "#059669",
      name: "",
    },
    schema: z.object({
      name: z.string().min(1, "Label name is required"),
    }),
  });

  const submit = () => {
    validate()
      .then(() => {
        createItemLabel(values).then(() => {
          setOpen(false);
        });
      })
      .catch((error) => {});
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="inline-flex items-center bg-primary px-4 py-2 rounded-md text-white gap-1">
        <Plus className="w-5 h-5" />
        <span>Create a label</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new label</DialogTitle>
        </DialogHeader>

        <Errors errors={errors} setErrors={setErrors} />

        <div className="flex flex-col gap-2 mt-2">
          <Label> Label name</Label>
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter the label"
          />
        </div>

        <div className="">
          <input
            type="color"
            name="color"
            value={values.color}
            onChange={handleChange}
            className="w-12 h-12"
          />
        </div>

        <DialogFooter>
          <Button onClick={submit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
