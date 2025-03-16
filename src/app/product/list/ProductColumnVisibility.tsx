import { Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import SearchField from "@/components/common/form/SearchField";
import { useEffect, useState } from "react";

interface FilterActionsProps {
  table: any;
  action: any;
}

export default function ProductColumnVisibility({
  table,
  action,
}: FilterActionsProps) {
  const [columns, setColumns] = useState<any[]>(
    table.getAllColumns().filter((column: any) => column.getCanHide())
  );
  const [results, setResults] = useState<any[]>(
    table.getAllColumns().filter((column: any) => column.getCanHide())
  );

  const checkedAll = () => {
    const visibles = columns.filter((column) => column.getIsVisible());

    if (visibles.length == 0) {
      return false;
    }

    if (visibles.length == columns.length) {
      return true;
    }

    return "indeterminate";
  };

  const config: Record<string, string> = {
    name: "Product",
    createdAt: "Created At",
    stock: "Stock",
    price: "Price",
    status: "Status",
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (action.type == "manage") {
      setIsOpen(true);
    }
  }, [action]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
    >
      <PopoverTrigger className="flex items-center justify-center gap-2 relative">
        <Eye className="w-4 h-4" />
        Colums
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <SearchField
            placeholder="Rechercher"
            onChange={({ target }: any) => {
              setResults(
                columns.filter((column) =>
                  config[column.id]
                    .toLowerCase()
                    .includes(target.value.toLowerCase())
                )
              );
            }}
          />
        </div>
        {results.length > 0 ? (
          <>
            <div className="space-y-2 mt-4">
              {results.map((column: any) => {
                return (
                  <div
                    key={`visibility-column-${column.id}`}
                    className="items-center flex gap-2"
                  >
                    <Checkbox
                      id={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                      }}
                    />
                    <label htmlFor={column.id}>{config[column.id]}</label>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-dashed my-4"></div>
            <footer>
              <div className="items-center flex gap-2">
                <Checkbox
                  id="visibility-all"
                  checked={checkedAll()}
                  onCheckedChange={(value) => {
                    columns.forEach((column) =>
                      column.toggleVisibility(!!value)
                    );
                  }}
                />
                <label htmlFor="visibility-all">Afficher/masquer toutes</label>
              </div>
            </footer>
          </>
        ) : (
          <p className="text-muted-foreground py-4"> Pas de colonnes</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
