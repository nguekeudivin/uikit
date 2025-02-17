"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { hexToRGBA } from "@/lib/utils";
import { z } from "zod";
import { useCalendar } from "./CalendarContext";
import CreateItemLabelDialog from "./CreateItemLabelDialog";

export default function AddItemDialog() {
  const {
    labels,
    openForm,
    setOpenForm,
    formMode,
    createItem,
    editItem,
    createItemLabel,
  } = useCalendar();

  const {
    values,
    setValue,
    resetValues,
    handleChange,
    validate,
    renderErrors,
    setValues,
  } = useSimpleForm({
    defaultValues: {
      title: "",
      description: "",
      label: "",
      startDate: "",
      endDate: "",
    },
    schema: z
      .object({
        title: z.string().min(1, "Title is required"),
        label: z.string().min(1, "Please choose a label for the schedule"),
        startDate: z.string().min(1, "Please provide the start date"),
        endDate: z.string().min(1, "Provide the end date"),
      })
      .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
        message: "End date must be later than start date",
        path: ["endDate"], // Error will be attached to `endDate`
      }),
  });

  return (
    <Dialog
      open={openForm}
      onOpenChange={(value) => {
        if (value == false) resetValues();
        setOpenForm(value);
      }}
    >
      <DialogTrigger className="inline-flex items-center bg-primary px-4 py-2 rounded-md text-white gap-1">
        <Plus className="w-5 h-5" />
        <span> Add schedule</span>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add schedule</DialogTitle>
        </DialogHeader>
        {renderErrors()}
        <div className="grid gap-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={values.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={values.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>

          <div className="flex flex-col gap-2">
            {labels.length > 0 && (
              <>
                <Label htmlFor="maxScore">Label</Label>

                <div className="mt-1 grid grid-cols-2 gap-2">
                  {labels.map((item: any, index: number) => (
                    <div
                      onClick={() => {
                        setValue("label", item.label);
                      }}
                      key={`label${index}`}
                      style={{
                        backgroundColor:
                          values.label == item.label
                            ? hexToRGBA(item.color, 0.4)
                            : "transparent",
                        //backgroundColor: item.color,
                      }}
                      className="cursor-pointer flex items-center space-x-2 border-2 border-gray-2 rounded-lg p-2 hover:bg-gray-100"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span> {item.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mt-2">
            <CreateItemLabelDialog />
          </div>
        </div>
        <DialogFooter>
          {formMode == "create" ? (
            <Button onClick={() => createItem}> Save </Button>
          ) : (
            <Button onClick={() => editItem}> Save changes </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
