"use client";

import CalendarView from "./CalendarView";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Minus } from "lucide-react";

import {
  fetchLabels,
  fetchItems,
  storeItemLabel,
  storeItem,
  updateItem,
} from "@/api-call/endpoints/calendar";

import type { CalendarItem, CalendarItemLabel } from "@/types/calendar";
import { hexToRGBA } from "@/lib/utils";
import { CalendarContext } from "./CalendarContext";
import { z } from "zod";
import { useSimpleForm } from "@/hooks/use-simple-form";
import ItemFormDialog from "./ItemFormDialog";
import { IdType } from "@/types/shared";

export default function CalendarPage() {
  const [labels, setLabels] = useState<CalendarItemLabel[]>([]);
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const form = useSimpleForm({
    defaultValues: {
      id: "",
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

  const startCreateItem = (startDate: Date, endDate: Date) => {
    form.setValue("startDate", format(startDate, "yyyy-MM-dd'T'HH:mm"));
    form.setValue("endDate", format(endDate, "yyyy-MM-dd'T'HH:mm"));
    setOpenForm(true);
  };

  const createItem = (item: CalendarItem) => {
    storeItem(item)
      .then((created: CalendarItem) => {
        setItems((prev) => [...prev, created]);
        setOpenForm(false);
        form.resetValues();
      })
      .catch(() => {});
  };

  const startEditItem = (item: CalendarItem) => {
    form.setValue("id", item.id);
    form.setValue("title", item.title);
    form.setValue("label", item.label);
    form.setValue("startDate", format(item.startDate, "yyyy-MM-dd'T'HH:mm"));
    form.setValue("endDate", format(item.endDate, "yyyy-MM-dd'T'HH:mm"));
    form.setValue("description", item.description);
    setOpenForm(true);
  };

  const editItem = (item: CalendarItem) => {
    updateItem(item.id as IdType, item)
      .then(() => {
        setOpenForm(false);
        form.resetValues();
        // Reload item list to fetch the last information.
        // It's the most simple way to reload data.
        // We can also go and replace the new items directly into the items array
        // But there is no need to do that.
        fetchData();
      })
      .catch(() => {});
  };

  const createItemLabel = (label: CalendarItemLabel) => {
    return storeItemLabel(label)
      .then((created: CalendarItemLabel) => {
        setLabels((prev) => [...prev, created]);
        return Promise.resolve(label);
      })
      .catch((error) => Promise.reject(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchLabels().then((items) => setLabels(items));
    fetchItems().then((items) => setItems(items));
  };

  const getLabelColor = (name: string) => {
    // Find the label.
    const label = labels.find((item) => item.name == name);
    if (label) {
      return label.color;
    } else {
      // return a default color
      return "#D4D4D4"; // tailwind color gray-300
    }
  };

  const renderItemComponent = (item: CalendarItem, index: number) => (
    <div
      onClick={() => {
        startEditItem(item);
      }}
      key={`${format(item.startDate, "yyyy-MM-dd")}${index}`}
      className="h-full p-1 rounded-lg font-normal text-black"
      style={{ backgroundColor: hexToRGBA(getLabelColor(item.label), 0.2) }}
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
  );

  return (
    <section className="px-8">
      <CalendarContext.Provider
        value={{
          items,
          labels,
          openForm,
          form,
          setOpenForm,
          setLabels,
          startCreateItem,
          createItem,
          startEditItem,
          editItem,
          createItemLabel,
          renderItemComponent,
        }}
      >
        <div className="flex justify-between mt-6">
          <h2 className="text-2xl font-bold"> Calendar </h2>
          <ItemFormDialog />
        </div>

        <CalendarView />
      </CalendarContext.Provider>
    </section>
  );
}
