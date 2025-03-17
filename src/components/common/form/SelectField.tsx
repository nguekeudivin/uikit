import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { AnimatedFieldLabel } from "./FieldLabel";

interface SelectFieldProps extends React.HTMLProps<HTMLSelectElement> {
  label?: string;
  error?: string;
  bgColor?: string;
  inputClassName?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    {
      className,
      inputClassName,
      name,
      value,
      label,
      onChange,
      onFocus,
      onBlur,
      error,
      id,
      bgColor = "bg-white",
      ...props
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Determine if the label should be shown
    const shouldShowLabelOnTop = isFocused || value !== "";

    const hasError = error != undefined && error != "";

    return (
      <div className={cn("bg-white", bgColor, className)}>
        <div className="relative bg-inherit">
          {/* Label */}
          {label != undefined && (
            <AnimatedFieldLabel
              htmlFor={id != undefined ? id : `input${name}`}
              label={label}
              move={shouldShowLabelOnTop}
              error={error}
              className={cn({
                "font-bold": isFocused,
              })}
            />
          )}

          <select
            id={id != undefined ? id : `select${name}`}
            name={name}
            value={value}
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
              "h-12 w-full appearance-none truncate rounded-md border border-input bg-inherit py-2 pl-3 pr-8   focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
              inputClassName,
              {
                "border-red-500  focus:ring-red-500": hasError,
              }
            )}
            ref={ref}
            {...props}
          />
          <label
            htmlFor={id != undefined ? id : `select${name}`}
            className="block absolute h-full right-6 top-0 flex items-center justify-center flex-col"
          >
            <ChevronDown className="absolute  h-4 w-4 opacity-50" />
          </label>
        </div>
        {hasError && <small className="text-red-500 pl-1">{error}</small>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export { SelectField };
