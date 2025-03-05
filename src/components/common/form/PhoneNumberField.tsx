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
  defaultCountry?: string;
  countriesList?: Country[];
  error?: string;
}

export default function PhoneNumberField({
  onValueChange,
  value,
  placeholder,
  id,
  name,
  className,
  countryClassName,
  inputClassName,
  label,
  defaultCountry,
  countriesList,
  error,
}: InputPhoneProps) {
  const [country, setCountry] = useState<Country>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const countriesListRef = useRef(undefined);
  useAway(countriesListRef, () => {
    setShowCountries(false);
  });

  useEffect(() => {
    // Choose the country list.
    const list = countriesList == undefined ? sampleCountries : countriesList;
    // Choose the country item.
    let item = list[0];

    // Update the country item according to the defaultCountry provided.
    if (defaultCountry != undefined) {
      item = list.find(
        (item) => item.name.toLowerCase() == defaultCountry.toLowerCase()
      ) as Country;
    }

    setCountries(list);
    setCountry(item);
  }, [defaultCountry]);

  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    setInputValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (country) setInputValue(value?.split(country.code).pop() as string);
  }, [country]);

  useEffect(() => {
    if (country) onValueChange(`${country.code}${inputValue}`);
  }, [inputValue]);

  const hasError = error != undefined && error != "";

  return (
    <>
      <div
        ref={countriesListRef as any}
        className={clsx(
          cn("flex items-center relative border rounded-md h-12", className),
          {
            "border-primary border-2": focus,
            "border-red-500 focus:ring-red-500": hasError,
          }
        )}
      >
        {label != undefined && (
          <FieldLabel
            label={label}
            error={error}
            className={cn({
              "font-bold": focus,
            })}
          />
        )}

        <div
          className={cn(
            "flex items-center p-2 pr-3 border-r",
            countryClassName
          )}
        >
          {country && (
            <Image
              src={`https://flagcdn.com/w80/${country.ab}.png`}
              alt={country.ab}
              width={20}
              height={20}
            />
          )}

          <button
            className="ml-2 text-muted-foreground p-1 hover:bg-gray-100 rounded-full"
            onClick={() => {
              setShowCountries(!showCountries);
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <ul
          className={clsx(
            "bg-white p-2  shadow-xl rounded-xl w-full h-[300px] absolute top-10 left-0 w-[200px] overflow-auto scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200 z-40",
            { block: showCountries, hidden: !showCountries }
          )}
        >
          {countries.map((item, index) => (
            <li
              onClick={() => {
                setCountry(item);
                setShowCountries(false);
              }}
              key={`country${index}`}
              className="flex  items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <Image
                  src={`https://flagcdn.com/w80/${item.ab}.png`}
                  alt={item.ab}
                  width={20}
                  height={20}
                />
              </div>

              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-sm uppercase text-muted-foreground">
                  {item.ab}({item.code})
                </p>
              </div>
            </li>
          ))}
        </ul>

        <input
          id={id}
          name={name}
          placeholder={placeholder}
          value={inputValue != undefined ? inputValue : ""}
          onChange={handleChange}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          className={cn(
            "border-none px-3 py-2 w-full focus:outline-none focus:border-none",
            inputClassName
          )}
        />

        {inputValue != undefined && inputValue != "" && (
          <button
            onClick={() => setInputValue("")}
            className="absolute top-[25%] right-2 p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
      {hasError && <small className="text-red-500 pl-1">{error}</small>}
    </>
  );
}
