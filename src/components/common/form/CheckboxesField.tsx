import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckBoxOption } from "@/types/form";

interface CheckboxesFieldProps {
  name?: string;
  label?: string;
  options: CheckBoxOption[];
  onCheckedChange: (item: CheckBoxOption, checked: boolean) => void;
  error?: string;
  className?: string;
  optionClassName?: string;
  values: any[];
}

export default function CheckboxesField({
  label,
  options,
  name,
  onCheckedChange,
  error,
  className,
  optionClassName,
  values,
}: CheckboxesFieldProps) {
  const hasError = error != undefined && error != "";

  return (
    <div>
      {label != undefined && <Label> {label} </Label>}
      <div className={cn("space-y-2", className)}>
        {options.map((item, index) => (
          <div
            key={`${name as string}${index}`}
            className={cn("flex items-center gap-2", optionClassName)}
          >
            <Checkbox
              id={`${name as string}${index}`}
              checked={values.includes(item.value)}
              onCheckedChange={(checked) => {
                onCheckedChange(item, checked as boolean);
              }}
            />
            <label htmlFor={`${name as string}${index}`}>{item.label}</label>
          </div>
        ))}
      </div>
      {hasError && <small className="text-red-500 pl-1">{error}</small>}
    </div>
  );
}
