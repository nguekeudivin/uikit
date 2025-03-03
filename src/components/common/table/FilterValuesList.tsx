import { Trash, X } from "lucide-react";
import { useEffect } from "react";

interface FiltersValuesListProps {
  resultCount: number;
  setFilterValue: any;
  filters: any;
  config: Record<string, string>; // associate column if to readable text. We could use table header but something table headers are not string and we need strin
}

export default function FiltersValuesList({
  filters,
  config,
  setFilterValue,
  resultCount,
}: FiltersValuesListProps) {
  const renderItem = (item: any, remove: any) => {
    return (
      <div className="rounded-xl px-2 p-0.5 flex items-center gap-2 bg-gray-100">
        <span> {item.value}</span>
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

  useEffect(() => {
    console.log(filters);
  }, []);

  return (
    <>
      {filters.length > 0 && (
        <div className="">
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
                          {renderItem({ id: item.id, value: el }, () =>
                            setFilterValue(
                              item.id,
                              item.value.filter((e: string) => e != el)
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderItem(item, () => setFilterValue(item.id, undefined))
                  )}
                </div>
              ))}
            </ul>
            <button
              onClick={() => {
                filters.map((item: any) => {
                  setFilterValue(item.id, undefined);
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
