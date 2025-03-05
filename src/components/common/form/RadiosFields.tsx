import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CheckBoxOption } from "@/types/form";

interface RadiosFieldProps {
  name?: string;
  label?: string;
  options: CheckBoxOption[];
  onValueChange: (value: any) => void;
  error?: string;
  className?: string;
  optionClassName?: string;
  value: any;
}

export default function RadiosField({
  label,
  options,
  name,
  onValueChange,
  error,
  optionClassName,
  value,
}: RadiosFieldProps) {
  const hasError = error != undefined && error != "";

  return (
    <div>
      {label != undefined && <Label> {label} </Label>}
      <RadioGroup
        defaultValue={value}
        className="flex items-center gap-4"
        value={value}
        onValueChange={onValueChange}
      >
        {options.map((item, index) => (
          <div
            key={`${name as string}${index}`}
            className={cn("flex items-center gap-2", optionClassName)}
          >
            <RadioGroupItem
              value={item.value}
              id={`${name as string}${index}`}
            />
            <label htmlFor={`${name as string}${index}`}>{item.label}</label>
          </div>
        ))}
      </RadioGroup>
      {hasError && <small className="text-red-500 pl-1">{error}</small>}
    </div>
  );
}
