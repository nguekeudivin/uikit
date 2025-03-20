import { getBackground, getColor } from "@/lib/colors";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

interface StatusFiltersProps {
  status: any[];
  filters: any[];
  onValueChange: (value: string) => void;
  className?: string;
}

export default function StatusFIlters({
  status,
  filters,
  onValueChange,
  className,
}: StatusFiltersProps) {
  const tabsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const getFilterValue = () => {
    const current = filters.find(
      (item: any) => item.id.toLowerCase() == "status"
    );

    if (current != undefined) {
      return current.value;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const activeTabElement = tabsRef.current[getFilterValue() as string];

    if (activeTabElement && indicatorRef.current) {
      const { offsetWidth, offsetLeft } = activeTabElement;
      indicatorRef.current.style.width = `${offsetWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
    }
  }, [filters, getFilterValue]);

  const isActiveFilter = (name: string, value: string) => {
    return (
      filters.find((item: any) => item.id == name && item.value == value) !=
      undefined
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-8 relative px-4 w-full overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
        className
      )}
    >
      {status.map((item, index) => (
        <div
          key={`status${index}`}
          ref={(el) => (tabsRef.current[item.value] = el) as any}
          onClick={() => {
            onValueChange(item.value);
          }}
          className={cn(
            "text-muted-foreground flex items-center gap-2 cursor-pointer  py-2",
            {
              "font-semibold text-gray-800":
                isActiveFilter("status", item.value) ||
                (getFilterValue() == "" && item.value == ""),
            }
          )}
        >
          <span className="text-medium">{item.label}</span>
          <span
            className="px-2 rounded-md text-sm"
            style={{
              color:
                isActiveFilter("status", item.value) &&
                getColor(item.label) != "white"
                  ? "white"
                  : getColor(item.label),
              backgroundColor:
                isActiveFilter("status", item.value) &&
                getColor(item.label) != "white"
                  ? getColor(item.label)
                  : getBackground(item.label),
            }}
          >
            {item.count}
          </span>
        </div>
      ))}
      <div
        ref={indicatorRef}
        className="absolute bottom-0  h-[2px] bg-gray-900 transition-all duration-300"
      />
    </div>
  );
}
