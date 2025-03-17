import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedFieldLabel } from "./FieldLabel";

interface TextAreaFieldProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
  inputClassName?: string;
  floatingClassName?: string;
}

// Define the MaterialInput component with forwardRef
const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      className,
      inputClassName,
      floatingClassName,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      value = "",
      label,
      name,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    // Determine if the label should be shown
    const shouldShowLabelOnTop =
      isFocused || value !== "" || placeholder != undefined;

    const hasError = error != undefined && error != "";

    return (
      <div className={cn("bg-white", className)}>
        <div className="relative bg-inherit">
          {/* Label */}
          {label != undefined && (
            <AnimatedFieldLabel
              htmlFor={id != undefined ? id : `input${name}`}
              label={label}
              move={shouldShowLabelOnTop}
              floatingClassName={cn(
                "top-4 text-muted-foreground bg-transparent z-0",
                floatingClassName
              )}
              className={cn({
                "font-bold": isFocused,
              })}
            />
          )}

          {/* Input */}
          <textarea
            {...props}
            id={id != undefined ? id : `input${name}`}
            name={name}
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
              "flex w-full px-3 py-2 bg-transparent rounded-md border border-input text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary",
              inputClassName,
              {
                "border-red-500": hasError,
              }
            )}
            ref={ref}
          />
        </div>
        {hasError && <small className="text-red-500 pl-1">{error}</small>}
      </div>
    );
  }
);

// Set a display name for better debugging in React DevTools
TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
