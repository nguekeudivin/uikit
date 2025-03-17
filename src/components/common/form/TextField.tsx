import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedFieldLabel, FieldLabel } from "./FieldLabel";
import { Eye, EyeClosed } from "lucide-react";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  canToggleType?: boolean;
  error?: string;
  leading?: React.ReactNode;
  bgColor?: string;
  floatingClassName?: string;
}

// Define the MaterialInput component with forwardRef
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
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
      canToggleType = false,
      name,
      error,
      disabled,
      id,
      leading,
      bgColor = "bg-white",
      floatingClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [inputType, setType] = React.useState<any>(
      type == undefined ? "text" : type
    );

    // Determine if the label should be shown
    const shouldShowLabelOnTop =
      isFocused || value !== "" || placeholder != undefined;

    const hasError = error != undefined && error != "";

    return (
      <div className={bgColor}>
        <div className="relative w-full flex items-center bg-inherit">
          {/*  When the leading is set. The label is fixed automatically. */}
          {label != undefined && (
            <AnimatedFieldLabel
              htmlFor={id != undefined ? id : `input${name}`}
              label={label}
              move={shouldShowLabelOnTop}
              error={error}
              floatingClassName={floatingClassName}
              className={cn({
                "font-bold": isFocused,
              })}
            />
          )}

          {canToggleType && (
            <button
              className="absolute right-3 top-3 text-muted-foreground"
              onClick={() => {
                console.log(inputType == "password" ? "text" : "password");
                setType(inputType == "password" ? "text" : "password");
              }}
            >
              {inputType == "password" ? <EyeClosed /> : <Eye />}
            </button>
          )}

          {/* Input */}
          <input
            {...props}
            id={id != undefined ? id : `input${name}`}
            name={name}
            type={inputType}
            disabled={disabled}
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
              className,
              {
                "border-red-500 focus:ring-red-500": hasError,
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
TextField.displayName = "TextField";

export default TextField;
