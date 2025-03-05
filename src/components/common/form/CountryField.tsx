import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import { useAway } from "@/hooks/use-away";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";

interface Country {
  name: string;
  ab: string;
  code: string;
}

const sampleCountries = [
  { name: "France", ab: "fr", code: "+33" },
  { name: "Cameroon", ab: "cm", code: "+237" },
  { name: "United States", ab: "us", code: "+1" },
  { name: "Canada", ab: "ca", code: "+1" },
  { name: "Germany", ab: "de", code: "+49" },
  { name: "United Kingdom", ab: "gb", code: "+44" },
  { name: "Nigeria", ab: "ng", code: "+234" },
  { name: "India", ab: "in", code: "+91" },
  { name: "Brazil", ab: "br", code: "+55" },
  { name: "South Africa", ab: "za", code: "+27" },
];

interface InputPhoneProps {
  onValueChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
  countryClassName?: string;
  inputClassName?: string;
  label?: string;
  countriesList?: Country[];
  error?: string;
}

export default function CountryField({
  onValueChange,
  value,
  placeholder,
  id,
  name,
  className,
  inputClassName,
  label,
  countriesList,
  error,
}: InputPhoneProps) {
  const [country, setCountry] = useState<Country>();

  const [countries, setCountries] = useState<Country[]>([]);
  const [autoComplete, setAutoComplete] = useState<Country[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value as string);
  }, [value]);

  useEffect(() => {
    // Choose the country list.
    const list = countriesList == undefined ? sampleCountries : countriesList;
    // Choose the country item.
    let item = list[0];
    // set Countlies
    setCountries(list);
    setAutoComplete(list);
  }, [countriesList]);

  useEffect(() => {
    setAutoComplete(
      countries.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setInputValue((event.target as HTMLInputElement).value); //
    //onValueChange(`${country.code}${inputValue}`);
    if (!show) {
      setShow(true);
    }
  };

  const selectCountry = (item: Country) => {
    onValueChange(item.name);
    setInputValue(item.name);
    setCountry(item);
    setShow(false);
  };

  const countriesListRef = useRef(undefined);
  useAway(countriesListRef, () => {
    setShow(false);
  });

  const hasError = error != undefined && error != "";

  return (
    <div>
      <div
        ref={countriesListRef as any}
        className={cn(
          "flex items-center relative border rounded-md h-12 ",
          className,
          {
            "border-primary border-2": isFocused,
          }
        )}
      >
        {label != undefined && (
          <FieldLabel
            label={label}
            error={error}
            className={cn({
              "font-bold": isFocused,
            })}
          />
        )}

        {/* Input */}
        <div className="relative flex items-center  w-full px-3">
          <div
            className="shrink-0 w-6 h-6 bg-gray-200 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(https://flagcdn.com/w80/${country?.ab}.png)`,
            }}
          ></div>
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            value={inputValue != undefined ? inputValue : ""}
            onChange={handleChange}
            className={cn(
              "px-3 py-2 focus:outline-none w-full block",
              inputClassName
            )}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />

          <button
            className="w-8 h-8 inline-flex items-center justify-center text-muted-foreground p-1 hover:bg-gray-100 rounded-full"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? (
              <X className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <ul
          className={clsx(
            "bg-white p-2 z-40 space-y-1  space-y-1 shadow-xl rounded-xl w-full max-h-[300px] absolute top-10 left-0 w-[200px] overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200",
            { block: show && autoComplete.length, hidden: !show }
          )}
        >
          {autoComplete.map((item, index) => (
            <li
              onClick={() => {
                selectCountry(item);
              }}
              key={`country${index}`}
              className="flex  items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div
                className="shrink-0 w-6 h-6 bg-gray-200 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(https://flagcdn.com/w80/${item?.ab}.png)`,
                }}
              ></div>

              <div className="flex item-center gap-2">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-sm uppercase text-muted-foreground">
                  {item.ab}({item.code})
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {hasError && <small className="text-red-500 pl-1">{error}</small>}
    </div>
  );
}
