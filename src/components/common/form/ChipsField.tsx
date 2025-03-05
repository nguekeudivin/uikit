import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatedFieldLabel } from "./FieldLabel";
import { cn, getInputTextWidth } from "@/lib/utils";
import useSearch from "@/hooks/use-search";
import { useAway } from "@/hooks/use-away";
import { X } from "lucide-react";

interface ChipsFieldProps extends React.ComponentProps<"div"> {
  label?: string;
  error?: string;
  name?: string;
  values: (string | number)[];
  placeholder?: string;
  suggestions?: any[];
  optionsClassName?: string;
  onValuesChange: (values: (string | number)[]) => void;
  chipClassName?: string;
  searchPredicate?: (item: any, keyword: string) => boolean;
  renderChip?: (item: any, removecallback: any) => ReactNode;
  renderSuggestion?: (item: any, pickCallback: any) => ReactNode;
  shouldPickSuggestion?: boolean;
}

const ChipsField = forwardRef<HTMLInputElement, ChipsFieldProps>(
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
      name,
      onFocus,
      onBlur,
      onValuesChange,
      chipClassName,
      searchPredicate,
      renderChip,
      renderSuggestion,
      shouldPickSuggestion = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const search = useSearch({
      data: suggestions,
      predicate:
        searchPredicate != undefined
          ? searchPredicate
          : (item: any, keyword: string) =>
              item.toLowerCase().includes(keyword.toLocaleLowerCase()),
    });

    // Determine if the label should be shown
    const shouldShowLabelOnTop =
      isFocused ||
      values.length != 0 ||
      placeholder != undefined ||
      search.keyword != "";

    const hasError = error != undefined && error != "";

    const fakeInputRef = useRef<HTMLDivElement>(undefined);
    useAway(fakeInputRef, () => {
      setIsFocused(false);
    });
    const dropdownRef = useRef<HTMLDivElement>(undefined);

    useEffect(() => {
      const inputElement = document.getElementById(
        id !== undefined ? id : `input${name}`
      );

      const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;

        if (e.key == "Backspace") {
          target.style.width = `${target.offsetWidth - 9}px`;
        } else {
          target.style.width = `${target.offsetWidth + 9}px`;
        }

        if (e.key === "Enter" || e.key === "Return") {
          const newValue = target.value.trim();

          if (newValue) {
            if (!shouldPickSuggestion) onValuesChange([...values, newValue]);
            target.value = "";
            target.style.width = `20px`;
          }
        }
      };

      if (inputElement) {
        inputElement.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        if (inputElement) {
          inputElement.removeEventListener("keydown", handleKeyDown);
        }
      };
    }, [values, onValuesChange, id, name]);

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
    }, [search.results]);

    return (
      <div>
        <label
          ref={fakeInputRef as any}
          // ref={ref}
          id="main-input-container"
          onClick={() => {
            setIsFocused(true);
          }}
          htmlFor={id != undefined ? id : `input${name}`}
          className={cn(
            "block relative min-h-16 px-3 pr-8 py-1  border flex flex-wrap items-center rounded-md",
            {
              "border-red-500": hasError,
              "border-primary border-2": isFocused,
            }
          )}
        >
          {label != undefined && (
            <AnimatedFieldLabel
              htmlFor={id != undefined ? id : `input${name}`}
              label={label}
              move={shouldShowLabelOnTop}
              error={error}
              onClick={() => {
                setIsFocused(true);
              }}
              className={cn({
                "font-bold": isFocused,
              })}
            />
          )}
          {values.map((value, index) => (
            <div key={`${name}${index}`} className="shrink-0 max-w-full mr-1">
              {renderChip ? (
                renderChip(value, () => {
                  onValuesChange(values.filter((v) => v != value));
                })
              ) : (
                <div
                  className={cn(
                    "rounded-xl p-0.5 px-2  flex no-wrap items-center gap-2 bg-sky-100",
                    chipClassName
                  )}
                >
                  <div className="truncate"> {value}</div>
                  <button
                    onClick={() => {
                      onValuesChange(values.filter((v) => v != value));
                    }}
                    className="bg-gray-500 p-0.5 rounded-full text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="relative overflow-hidden">
            <div className="text-muted-foreground absolute left-0 z-0 h-16 flex flex-col justify-center h-full shrink-0">
              {isFocused || search.keyword != "" ? "" : placeholder}
            </div>
            <input
              id={id != undefined ? id : `input${name}`}
              onChange={search.handleChange}
              onFocus={(e) => {
                e.target.style.width =
                  search.keyword != ""
                    ? `${getInputTextWidth(e.target)}px`
                    : `20px`;
                if (onFocus) onFocus(e);
              }}
              onBlur={(e) => {
                e.target.style.width = `auto`;
                if (onBlur) onBlur(e);
              }}
              className={cn(
                "overflow-wrap py-2  bg-transparent text-base  disabled:cursor-not-allowed disabled:opacity-500  focus:border-none focus:outline-none",
                className
              )}
            />
          </div>

          <button
            onClick={() => {
              onValuesChange([]);
              search.setKeyword("");
            }}
            className="text-muted-foreground absolute right-3 h-full flex justify-center flex-col"
          >
            <X className="w-4 h-4" />
          </button>

          {isFocused && (
            <div
              ref={dropdownRef as any}
              className={cn(
                "absolute top-12 left-0  max-h-[400px] w-[300px] bg-white p-3 z-40  shadow-xl rounded-xl w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
                optionsClassName,
                {
                  hidden: search.results.length < 0 && !shouldPickSuggestion,
                }
              )}
            >
              {search.results.length > 0 ? (
                <ul className="space-y-1">
                  {search.results.map((item: any, index: number) => (
                    <li key={`suggestion-${name as string}-${index}`}>
                      {renderSuggestion != undefined ? (
                        renderSuggestion(item, () => {
                          if (!values.includes(item))
                            onValuesChange([...values, item]);
                          else
                            onValuesChange(values.filter((el) => el != item));
                        })
                      ) : (
                        <div
                          onClick={() => {
                            if (!values.includes(item))
                              onValuesChange([...values, item]);
                            else
                              onValuesChange(values.filter((el) => el != item));
                          }}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded-md",
                            {
                              "bg-gray-200": values.includes(item),
                            }
                          )}
                        >
                          {item}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-3 text-gray-600"> No options </div>
              )}
            </div>
          )}
        </label>
        {hasError && <small className="text-red-500 pl-1">{error}</small>}
      </div>
    );
  }
);

ChipsField.displayName = "ChipsField";

export { ChipsField };
