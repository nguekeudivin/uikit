import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";
import { Eye, EyeClosed } from "lucide-react";

interface LeadedTextFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  canToggleType?: boolean;
  error?: string;
  leading: React.ReactNode;
}

// Define the MaterialInput component with forwardRef
const LeadedTextField = React.forwardRef<
  HTMLInputElement,
  LeadedTextFieldProps
>(
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
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [inputType, setType] = React.useState<any>(
      type == undefined ? "text" : type
    );

    const hasError = error != undefined && error != "";

    return (
      <>
        <div className="relative">
          {/*  When the leading is set. The label is fixed automatically. */}
          {label != undefined && (
            <FieldLabel
              label={label}
              error={error}
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

          <div
            ref={ref}
            className={cn(
              "flex w-full h-12 items-center bg-transparent rounded-md border  text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary",
              {
                "border-2 border-primary": isFocused,
                "border-red-500": hasError,
              }
            )}
          >
            <div className="shrink-0 px-3 text-muted-foreground">{leading}</div>
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
                "flex h-12 w-full py-2 bg-transparent rounded-md  text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:border-none"
              )}
              ref={ref}
            />
          </div>
        </div>
        {hasError && <small className="text-red-500 pl-1">{error}</small>}
      </>
    );
  }
);

// Set a display name for better debugging in React DevTools
LeadedTextField.displayName = "LeadedTextField";

export default LeadedTextField;
