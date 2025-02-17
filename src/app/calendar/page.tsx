"use client";

import CalendarView from "./CalendarView";

import { format } from "date-fns";
import colors from "@/lib/colors";
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
import CreateItemDialog from "./CreateItemDialog";

export default function CalendarPage() {
  const [labels, setLabels] = useState<CalendarItemLabel[]>([]);
  const [items, setItems] = useState<CalendarItem[]>([]);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>("create");

  const startCreateItem = (startDate: Date, endDate: Date) => {
    setFormMode("create");
    setOpenForm(true);
  };

  const createItem = (item: CalendarItem) => {
    return storeItem(item)
      .then((created: CalendarItem) => {
        setItems((prev) => [...prev, created]);
        setOpenForm(false);

        return Promise.resolve(item);
      })
      .catch((error) => Promise.reject(error));
  };

  const startEditItem = (item: CalendarItem) => {
    setFormMode("edit");
    setOpenForm(true);
  };

  const editItem = (item: CalendarItem) => {
    return updateItem(item)
      .then((updated) => {
        return Promise.resolve(updated);
      })
      .catch((error) => Promise.reject(error));
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
    fetchLabels().then((items) => setLabels(items));
    fetchItems().then((items) => setItems(items));
  }, []);

  const renderItemComponent = (item: CalendarItem, index: number) => (
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
  );

  return (
    <section className="px-8">
      <CalendarContext.Provider
        value={{
          items,
          labels,
          openForm,
          formMode,
          setOpenForm,
          setLabels,
          setFormMode,
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
          <CreateItemDialog />
        </div>

        <CalendarView />
      </CalendarContext.Provider>
    </section>
  );
}
