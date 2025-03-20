import { format } from "date-fns";
import { Trash, X } from "lucide-react";
import { isDate } from "date-fns";

interface FiltersValuesListProps {
  resultCount: number;
  setFilterValue: any;
  onValueRemoved: any;
  filters: any;
  className?: string;
  config: Record<string, string>; // associate column if to readable text. We could use table header but something table headers are not string and we need strin
}

export default function FiltersValuesList({
  filters,
  config,
  setFilterValue,
  resultCount,
  onValueRemoved,
  className,
}: FiltersValuesListProps) {
  const renderItem = (item: any, remove: any) => {
    const displayValue = (value: any) => {
      if (isDate(item.value)) {
        return format(value, "dd-MM-yyyy");
      } else {
        return value;
      }
    };

    return (
      <div className="rounded-xl px-2 p-0.5 flex items-center gap-2 bg-gray-100">
        <span> {displayValue(item.value)}</span>
        <button
          onClick={() => {
            remove();
          }}
          className="bg-gray-500 p-0.5 rounded-full text-white"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  };

  return (
    <>
      {filters.length > 0 && (
        <div className={className}>
          <p className="flex gap-2">
            <strong className="text-lg">{resultCount}</strong>
            <span className="text-muted-foreground">results found</span>
          </p>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-2 mt-2">
              {filters.map((item: any, index: number) => (
                <div
                  key={`columnfiltervalue${index}`}
                  className="border border-dashed flex items-center rounded-xl px-2 py-2 gap-2"
                >
                  <p className="font-bold">{config[item.id]}:</p>
                  {Array.isArray(item.value) ? (
                    <div className="flex items-center gap-2">
                      {item.value.map((el: string, elIndex: number) => (
                        <div key={`coloumfiltervaluearray${index}${elIndex}`}>
                          {renderItem({ id: item.id, value: el }, () => {
                            const newValue = item.value.filter(
                              (e: string) => e != el
                            );
                            setFilterValue(item.id, newValue);
                            // If the new value is empty then we have remove the field.
                            if (newValue.length == 0) onValueRemoved(item.id);
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderItem(item, () => {
                      setFilterValue(item.id, undefined);
                      onValueRemoved(item.id);
                    })
                  )}
                </div>
              ))}
            </ul>
            <button
              onClick={() => {
                filters.map((item: any) => {
                  setFilterValue(item.id, undefined);
                  onValueRemoved(item.id);
                });
              }}
              className="text-red-500 gap-2 inline-flex items-center font-semibold"
            >
              <Trash className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
