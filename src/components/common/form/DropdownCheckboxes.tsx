import * as React from "react";
import { AnimatedFieldLabel } from "./FieldLabel";
import { cn } from "@/lib/utils";
import { useAway } from "@/hooks/use-away";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownCheckboxesProps extends React.ComponentProps<"div"> {
  label: string;
  values: (string | number)[];
  options?: any;
  name: string;
  onValuesChange: (values: (string | number)[]) => void;
  optionsClassName?: string;
  error?: string;
}

// Define the MaterialInput component with forwardRef
const DropdownCheckboxes = React.forwardRef<
  HTMLDivElement,
  DropdownCheckboxesProps
>(
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
      error,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const shouldShowLabelOnTop = isFocused || values.length > 0;

    const fakeInputRef = React.useRef<HTMLDivElement>(undefined);
    useAway(fakeInputRef, () => {
      setIsFocused(false);
    });

    const dropdownRef = React.useRef<HTMLDivElement>(undefined);

    const handleChecked = (checked: boolean, item: any) => {
      if (checked) {
        if (!values.includes(item.value))
          onValuesChange([...values, item.value]);
      } else {
        onValuesChange(values.filter((v) => v != item.value));
      }
    };

    React.useEffect(() => {
      setTimeout(() => {
        if (isFocused && dropdownRef.current && fakeInputRef.current) {
          const rect = dropdownRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;

          if (spaceBelow < dropdownRef.current.offsetHeight) {
            dropdownRef.current.style.top = "auto";
            dropdownRef.current.style.bottom = "100%";
          } else {
            dropdownRef.current.style.top = "100%";
            dropdownRef.current.style.bottom = "auto";
          }
        }
      }, 50);
    }, [isFocused]);

    const hasError = error != undefined && error != "";

    return (
      <div>
        <div ref={ref} className={cn("relative h-12", className)}>
          {/* Label */}
          {label != undefined && (
            <AnimatedFieldLabel
              htmlFor={id != undefined ? id : `input${name}`}
              label={label}
              move={shouldShowLabelOnTop}
              className={cn({
                "font-bold": isFocused,
              })}
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
                  "border-red-500": hasError,
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
                ref={dropdownRef as any}
                className={cn(
                  "absolute top-12 left-0  max-h-[300px] w-[300px] bg-white p-3 z-40  shadow-xl rounded-xl w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
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
        {hasError && <small className="text-red-500 pl-1">{error}</small>}
      </div>
    );
  }
);

DropdownCheckboxes.displayName = "DropdownCheckboxes";

export default DropdownCheckboxes;
