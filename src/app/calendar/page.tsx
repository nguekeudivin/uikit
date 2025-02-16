"use client";

import CalendarView from "./CalendarView";
import {
  createLabel,
  ScheduleLabel,
  schedules,
} from "@/api-call/endpoints/schedules";

import { format } from "date-fns";
import colors from "@/lib/colors";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
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

export default function CalendarPage() {
  const [labels, setLabels] = useState<ScheduleLabel[]>([]);
  const { values, setValue, handleChange } = useSimpleForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const addItem = () => {
    // handle click to add new item here.
  };

  const addNewLabel = (label: ScheduleLabel) => {
    // api call.
    createLabel(label).then((res) => {
      setLabels((prev) => [...prev, label]);
    });
  };

  return (
    <section className="px-8">
      <div className="flex justify-between mt-6">
        <h2 className="text-2xl font-bold"> Calendar </h2>

        <Dialog>
          <DialogTrigger className="inline-flex items-center bg-primary px-4 py-2 rounded-md text-white gap-1">
            <Plus className="w-5 h-5" />
            <span> Add schedule</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add schedule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxScore">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Max Score"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxScore">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Max Score"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="maxScore">Label</Label>
                {/* <RadioGroup
                  onValueChange={(value) => setValue("label", value)}
                  defaultValue={labels[0].label}
                >
                  {labels.map((item, index) => (
                    <div
                      key={`label${index}`}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={item}
                        id={`schedulelabel${index}`}
                      />
                      <Label htmlFor={`schedulelabel${index}`}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <AddNewLabel add={addNewLabel} /> */}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <CalendarView
        schedules={schedules}
        onAddItem={addItem}
        createItemComponent={(item, index) => (
          <div
            key={`${format(item.startDate, "yyyy-MM-dd")}${index}`}
            className="h-full p-1 rounded-lg font-normal"
            style={{ backgroundColor: colors[item.label] }}
          >
            <h4 className="text-sm">{item.title}</h4>
            <div className="flex gap-1 items-center">
              <span className="text-xs text-gray-700">
                {format(item.startDate, "hh:mm a")}
              </span>{" "}
              <Minus className="w-2 h-2" />
              <span className="text-xs text-gray-700">
                {format(item.endDate, "hh:mm a")}
              </span>
            </div>
          </div>
        )}
      />
    </section>
  );
}
