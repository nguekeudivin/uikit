import { useSimpleForm } from "@/hooks/use-simple-form";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { Filter, X } from "lucide-react";
import { SelectField } from "@/components/common/form/SelectField";
import TextField from "@/components/common/form/TextField";

interface ProductExtraFiltersProps {
  table: any;
  action: any;
}
export default function ProductExtraFilters({
  table,
  action,
}: ProductExtraFiltersProps) {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<any[]>([]);

  const form = useSimpleForm({
    defaultValues: {
      column: "name",
      operator: "contains",
      value: "",
    },
    schema: z.object({
      column: z.string().min(1, "Column is required"),
      operator: z.string().min(1, "Operator is required"),
      value: z.string().min(1, "Value is required"),
    }),
    onUpdate: (values: any) => {
      let toValidate = values;

      if (values.operator == "is empty") {
        toValidate = { ...toValidate, value: "none" };
      }

      if (form.check(toValidate)) {
        // set filters.
        setFilters((currents: any) => [
          ...currents.filter((item: any) => item.column != values.column),
          toValidate,
        ]);
      } else {
        setFilters((currents: any) =>
          currents.filter((item: any) => item.column != values.column)
        );
      }
    },
  });

  const config: Record<string, string> = {
    name: "Product",
    createdAt: "Created At",
    stock: "Stock",
    price: "Price",
    status: "Status",
  };

  const getOperators = (column: string) => {
    if (["stock", "status"].includes(column)) {
      return ["is", "is not", "is any of"];
    } else {
      return [
        "contains",
        "does not contains",
        "equals",
        "does not equals",
        "start with",
        "end with",
        "is empty",
        "is any of",
      ];
    }
  };

  const getValuesOptions = (column: string) => {
    switch (column) {
      case "stock":
        return ["In stock", "Low Stock", "Out of stock"];
      case "status":
        return ["Published", "Draft"];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (action.type == "filter") {
      setOpenFilters(true);
      form.setValue("column", action.column.id);
    }
  }, [action]);

  return (
    <>
      <Popover
        open={openFilters}
        onOpenChange={(value) => {
          setOpenFilters(value);
        }}
      >
        <PopoverTrigger className="flex items-center justify-center gap-2 relative">
          <Filter className="w-4 h-4" />
          Filters
          {filters.length > 0 && (
            <span className="block absolute -top-3 text-sm left-1 bg-green-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-white">
              {filters.length}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent className="p-6 flex items-center gap-4 w-[600px]">
          <button
            onClick={() => {
              setFilters([]);
              setOpenFilters(false);
            }}
            className="text-muted-foreground p-1 rounded-full bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
          <SelectField
            label="Column"
            onChange={form.handleChange}
            value={form.values.column}
            name="column"
          >
            {table.getAllColumns().map((column: any, i: number) => (
              <option key={`column-option-${column.id}`} value={column.id}>
                {config[column.id]}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Operator"
            onChange={form.handleChange}
            name="operator"
            value={form.values.operator}
          >
            {getOperators(form.values.column).map((operator, i) => (
              <option key={`operator-option-${i}`} value={operator}>
                {operator}
              </option>
            ))}
          </SelectField>
          {form.values.operator != "is empty" && (
            <>
              {["stock", "status"].includes(form.values.column) ? (
                <SelectField
                  label="Value"
                  name="value"
                  value={form.values.value}
                  onChange={form.handleChange}
                >
                  {getValuesOptions(form.values.column).map((option, i) => (
                    <option key={`value-option-${i}`} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <TextField
                  label="Value"
                  placeholder="Filter value"
                  name="value"
                  value={form.values.value}
                  onChange={form.handleChange}
                />
              )}
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
