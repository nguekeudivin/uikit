import { cn } from "@/lib/utils";
import React from "react";

interface FieldLabelProps {
  label: string;
  htmlFor?: string;
  error?: string;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ label, htmlFor, error }, ref) => {
    const hasError = error != undefined && error != "";

    return (
      <label
        htmlFor={htmlFor}
        ref={ref} // Forward the ref to the label element
        className={cn(
          "absolute left-1 px-2 transition-all duration-300 ease-in-out -top-3 text-sm text-gray-600 bg-white z-30",
          {
            "text-red-500": hasError,
          }
        )}
      >
        {label}
      </label>
    );
  }
);

// Set a display name for better debugging in React DevTools
FieldLabel.displayName = "FieldLabel";

interface AnimatedFieldLabelProps {
  label: string;
  move: boolean;
  htmlFor: string;
  className?: string;
  error?: string;
}

const AnimatedFieldLabel = React.forwardRef<
  HTMLLabelElement,
  AnimatedFieldLabelProps
>(
  (
    {
      label,
      move,
      error,
      htmlFor,
      className = "top-[25%] text-muted-foreground bg-transparent z-0",
    },
    ref
  ) => {
    const hasError = error != undefined && error != "";

    return (
      <label
        htmlFor={htmlFor}
        ref={ref} // Forward the ref to the label element
        className={cn(
          "absolute left-2 px-2 transition-all duration-300 ease-in-out",
          move ? "-top-3 text-sm  text-gray-700 bg-white z-30" : className,
          {
            "text-red-500": hasError,
          }
        )}
      >
        {label}
      </label>
    );
  }
);

// Set a display name for better debugging in React DevTools
AnimatedFieldLabel.displayName = "AnimatedFieldLabel";

export { FieldLabel, AnimatedFieldLabel };
