import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatedFieldLabel } from "./FieldLabel";
import { cn } from "@/lib/utils";
import useSearch from "@/hooks/use-search";
import { useAway } from "@/hooks/use-away";

interface TagsFieldProps extends React.ComponentProps<"div"> {
  label?: string;
  error?: string;
  values: (string | number)[];
  placeholder?: string;
  suggestions: any[];
  optionsClassName?: string;
  onValuesChange: (values: (string | number)[]) => void;
}

const TagsField = forwardRef<HTMLInputElement, TagsFieldProps>(
  (
    {
      label,
      placeholder,
      values,
      className,
      error,
      id,
      optionsClassName,
      suggestions,
      onFocus,
      onBlur,
      onValuesChange,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    // Determine if the label should be shown
    const shouldShowLabelOnTop =
      isFocused || values.length != 0 || placeholder != undefined;
    const hasError = error != undefined && error != "";

    const fakeInputRef = useRef<HTMLDivElement>(undefined);
    useAway(fakeInputRef, () => {
      setIsFocused(false);
    });
    const dropdownRef = useRef<HTMLDivElement>(undefined);

    const search = useSearch({
      data: suggestions,
      predicate: (item: any, keyword: string) => {},
    });

    useEffect(() => {
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

    return (
      <div ref={fakeInputRef as any} className="relative h-12">
        {label != undefined && (
          <AnimatedFieldLabel
            htmlFor={id != undefined ? id : `input${name}`}
            label={label}
            move={shouldShowLabelOnTop}
            error={error}
            onClick={() => {
              setIsFocused(true);
            }}
          />
        )}
        <input
          id={id != undefined ? id : `input${name}`}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e: any) => {
            setInputValue(e.target.value);
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
        {isFocused && (
          <div
            ref={dropdownRef as any}
            className={cn(
              "absolute top-12 left-0  max-h-[300px] w-[300px] bg-white p-3 z-40  shadow-xl rounded-xl w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
              optionsClassName
            )}
          >
            <ul className="space-y-1">
              {suggestions.map((item: any) => (
                <li
                  key={`checkbox-${item.value}`}
                  onClick={() => {
                    if (!values.includes(item.value))
                      onValuesChange([...values, item.value]);
                    else
                      onValuesChange(values.filter((el) => el != item.value));
                  }}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md",
                    {
                      "bg-gray-200": values.includes(item.value),
                    }
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
