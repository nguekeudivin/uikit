"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { AnimatedFieldLabel } from "./FieldLabel";

interface DateFieldProps {
  label?: string;
  name?: string;
  error?: string;
  value?: Date | undefined;
  className?: string;
  onValueChange?: (date: Date | undefined) => void;
}

export default function DateField({
  label,
  name,
  error,
  className,
  value,
  onValueChange,
}: DateFieldProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const shouldShowLabelOnTop = isFocused || date != undefined;

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div
      className={cn(
        "h-12 w-[250px] rounded-xl border relative hover:border-primary",
        {
          "border-2 border-primary": isFocused,
        },
        className
      )}
    >
      {label != undefined && (
        <AnimatedFieldLabel
          htmlFor={name as string}
          label={label}
          move={shouldShowLabelOnTop}
          error={error}
          onClick={() => {
            setIsFocused(true);
          }}
        />
      )}
      <Popover
        open={isFocused}
        onOpenChange={(value) => {
          if (value) {
            setIsFocused(true);
          } else {
            setIsFocused(false);
          }
        }}
      >
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full inline-flex items-center px-3 justify-end text-right font-normal h-full",
              !date && "text-muted-foreground",
              {
                "justify-start text-left": date != undefined,
              }
            )}
          >
            {date == undefined ? (
              <CalendarIcon className="h-4 w-4" />
            ) : (
              <> {format(date, "dd MMM yyyy")}</>
            )}
          </button>
        </PopoverTrigger>
        {date != undefined && (
          <button
            onClick={() => {
              setIsFocused(false);
              setDate(undefined);
              if (onValueChange) onValueChange(undefined);
            }}
            className="absolute top-4 right-4"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              //onSelect(date as Date);
              if (onValueChange) onValueChange(date as Date);
              setDate(date as Date);
              setIsFocused(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
