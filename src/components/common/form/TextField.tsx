import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedFieldLabel } from "./FieldLabel";

interface MaterialInputProps extends React.ComponentProps<"input"> {
  label?: string;
}

// Define the MaterialInput component with forwardRef
const TextField = React.forwardRef<HTMLInputElement, MaterialInputProps>(
  (
    {
      className,
      type,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      value = "",
      label,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    // Determine if the label should be shown
    const shouldShowLabelOnTop =
      isFocused || value !== "" || placeholder != undefined;

    return (
      <div className="relative h-12">
        {/* Label */}
        {label != undefined && (
          <AnimatedFieldLabel
            htmlFor={id != undefined ? id : `input${name}`}
            label={label}
            move={shouldShowLabelOnTop}
          />
        )}

        {/* Input */}
        <input
          {...props}
          id={id != undefined ? id : `input${name}`}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange) onChange(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          className={cn(
            "flex h-12 w-full px-3 py-2 bg-transparent rounded-md border border-input text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary",
            className
          )}
          ref={ref}
        />
      </div>
    );
  }
);

// Set a display name for better debugging in React DevTools
TextField.displayName = "TextField";

export default TextField;
