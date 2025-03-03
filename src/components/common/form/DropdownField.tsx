import * as React from "react";
import { AnimatedFieldLabel } from "./FieldLabel";
import { cn } from "@/lib/utils";
import { useAway } from "@/hooks/use-away";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MaterialInputProps extends React.ComponentProps<"div"> {
  label: string;
  values: string[];
  options: any;
  name: string;
  onValuesChange: (values: string[]) => void;
  optionsClassName?: string;
}

// Define the MaterialInput component with forwardRef
const DropdownField = React.forwardRef<HTMLDivElement, MaterialInputProps>(
  (
    {
      className,
      label,
      id,
      options,
      name,
      values,
      onValuesChange,
      optionsClassName,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const shouldShowLabelOnTop = isFocused || values.length > 0;

    const fakeInputRef = React.useRef(undefined);
    useAway(fakeInputRef, () => {
      setIsFocused(false);
    });

    const handleChecked = (checked: boolean, item: any) => {
      if (checked) {
        if (!values.includes(item.value))
          onValuesChange([...values, item.value]);
      } else {
        onValuesChange(values.filter((v) => v != item.value));
      }
    };

    return (
      <div ref={ref} className={cn("relative h-12", className)}>
        {/* Label */}
        {label != undefined && (
          <AnimatedFieldLabel
            htmlFor={id != undefined ? id : `input${name}`}
            label={label}
            move={shouldShowLabelOnTop}
          />
        )}

        <div ref={fakeInputRef as any}>
          <div
            id={id}
            onClick={() => {
              setIsFocused(!isFocused);
            }}
            className={clsx(
              "flex w-full px-3 items-center bg-transparent rounded-md border  text-base ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary h-12 relative",
              {
                "border-2 border-primary": isFocused,
              }
            )}
          >
            {values.join(",")}
            <button className="absolute top-2 right-2 p-1 text-muted-foreground">
              {isFocused ? (
                <ChevronUp className="w-4 h-5" />
              ) : (
                <ChevronDown className="w-4 h-5" />
              )}
            </button>
          </div>
          {isFocused && (
            <div
              className={cn(
                "bg-white p-3 z-40  shadow-xl rounded-xl w-full max-h-[300px] w-[300px] absolute top-12 left-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
                optionsClassName
              )}
            >
              <ul className="space-y-1">
                {options.map((item: any) => (
                  <li
                    key={`checkbox-${item.value}`}
                    className={clsx(
                      "flex items-center gap-2 px-2 py-1 rounded-md",
                      {
                        "bg-gray-200": values.includes(item.value),
                      }
                    )}
                  >
                    <Checkbox
                      id={`option${name}${item.value}`}
                      checked={values.includes(item.value)}
                      onCheckedChange={(checked: boolean) =>
                        handleChecked(checked, item)
                      }
                    />
                    <label htmlFor={`option${name}${item.value}`}>
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DropdownField.displayName = "DropdownField";

export default DropdownField;
