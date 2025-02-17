"use client";

import CalendarView from "./CalendarView";

import { format } from "date-fns";
import colors from "@/lib/colors";
import { useEffect, useState } from "react";
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
import AddNewLabel from "@/app/calendar/CreateItemLabelDialog";
import {
  fetchLabels,
  fetchSchedules,
  createScheduleLabel,
  createSchedule,
} from "@/api-call/endpoints/calendar";
import type { Schedule, ScheduleLabel } from "@/api-call/endpoints/calendar";
import { hexToRGBA } from "@/lib/utils";
import { z } from "zod";
import { CalendarContext } from "./CalendarContext";

export default function CalendarPage() {
  const [labels, setLabels] = useState<ScheduleLabel[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>("create");

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

  const addItem = () => {
    validate()
      .then(() => {
        createSchedule(values).then((item: Schedule) => {
          setSchedules((prev) => [...prev, item]);
          setOpen(false);
        });
      })
      .catch((error) => {});
  };

  const startEditItem = () => {};
  const editItem = () => {};

  const addNewLabel = (label: ScheduleLabel) => {
    return createScheduleLabel(label).then((res) => {
      setLabels((prev) => [...prev, label]);
      return Promise.resolve(label);
    });
  };

  useEffect(() => {
    fetchLabels().then((items) => setLabels(items));
    fetchSchedules().then((items) => setSchedules(items));
  }, []);

  return (
    <section className="px-8">
      <CalendarContext.Provider value={{ data: [] }}>
        <div className="flex justify-between mt-6">
          <h2 className="text-2xl font-bold"> Calendar </h2>
          <Dialog
            open={open}
            onOpenChange={(value) => {
              if (value == false) resetValues();
              setOpen(value);
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
                        {labels.map((item: any, index) => (
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
                  <AddNewLabel add={addNewLabel} />
                </div>
              </div>
              <DialogFooter>
                {formMode == "create" ? (
                  <Button onClick={addItem}> Save </Button>
                ) : (
                  <Button onClick={editItem}> Save changes </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <CalendarView
          items={schedules}
          addItem={(startDate: Date, endDate: Date) => {
            setValue("startDate", format(startDate, "yyyy-MM-dd'T'HH:mm"));
            setValue("endDate", format(endDate, "yyyy-MM-dd'T'HH:mm"));
            setFormMode("create");
            setOpen(true);
          }}
          startEditItem={(item: Schedule) => {
            setValues({
              title: item.title,
              label: item.label,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
            });
            setFormMode("edit");
            setOpen(true);
          }}
          renderItemComponent={(item, index) => (
            <div
              key={`${format(item.startDate, "yyyy-MM-dd")}${index}`}
              className="h-full p-1 rounded-lg font-normal text-black"
              style={{ backgroundColor: hexToRGBA(colors[item.label], 0.2) }}
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
      </CalendarContext.Provider>
    </section>
  );
}
