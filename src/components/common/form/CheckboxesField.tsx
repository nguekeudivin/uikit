import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckBoxOption } from "@/types/form";

interface CheckboxFieldProps {
  name?: string;
  label?: string;
  options: CheckBoxOption[];
  onCheckedChange: (item: CheckBoxOption, checked: boolean) => void;
  error?: string;
  className?: string;
  optionClassName?: string;
}

export default function CheckboxField({
  label,
  options,
  name,
  onCheckedChange,
  error,
  className,
  optionClassName,
}: CheckboxFieldProps) {
  const hasError = error != undefined && error != "";

  return (
    <div>
      {label != undefined && <Label> {label} </Label>}
      <div className={cn("flex items-center gap-8 mt-3", className)}>
        {options.map((item, index) => (
          <div
            key={`${name as string}${index}`}
            className={cn("flex items-center gap-2", optionClassName)}
          >
            <Checkbox
              id={`${name as string}${index}`}
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
