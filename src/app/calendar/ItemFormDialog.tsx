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
import { hexToRGBA } from "@/lib/utils";
import { useCalendar } from "./CalendarContext";
import CreateItemLabelDialog from "./CreateItemLabelDialog";

export default function ItemFormDialog() {
  const { labels, openForm, setOpenForm, createItem, editItem, form } =
    useCalendar();

  const submit = () => {
    form
      .validateAsync()
      .then((validData: any) => {
        // If the id is set that means we are trying to update the item.
        if (form.values.id == "") createItem(validData);
        if (form.values.id != "") editItem(validData);
      })
      .catch(() => {});
  };

  return (
    <Dialog
      open={openForm}
      onOpenChange={(value) => {
        if (value == false) form.resetValues();
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
        {form.renderErrors()}
        <div className="grid gap-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
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
                value={form.values.startDate}
                onChange={form.handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={form.values.endDate}
                onChange={form.handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
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
                        form.setValue("label", item.name);
                      }}
                      key={`label${index}`}
                      style={{
                        backgroundColor:
                          form.values.label == item.name
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
                      <span> {item.name}</span>
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
          <Button onClick={submit}> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
