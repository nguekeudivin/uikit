import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { menu } from "../AppSidebar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SearchDialog() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const items: any[] = menu()
    .map((item) => {
      if (item.menu != undefined) {
        return item.menu.map((el) => ({
          label: `${item.label} ${el.label}`,
          route: el.route,
        }));
      } else {
        return item;
      }
    })
    .flat();

  const predicate = (item: any, keyword: string) => {
    return (
      item.label.toLowerCase().includes(keyword.toLowerCase()) ||
      item.route.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleSearch = (event: any) => {
    const keyword = event.target.value;
    setKeyword(keyword);

    const result = items.filter((item) => predicate(item, keyword));

    setResults(result);
  };

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;

    // Create a regular expression to match the keyword (case-insensitive)
    const regex = new RegExp(`(${keyword})`, "gi");

    // Split the text by the keyword and wrap matches in a <span>
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <button className="bg-gray-100 p-2 rounded-md">
          <Search className="text-gray-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px] top-[35%] p-0 rounded-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Dialog</DialogTitle>
        </DialogHeader>
        <div className="flex items-center p-4 pb-0">
          <Search className="text-muted-foreground" />
          <Input
            value={keyword}
            onChange={handleSearch}
            className="border-none focus:border-none focus:ring-0  focus:outline-none text-lg"
            placeholder="Search..."
          />
        </div>
        <div className="max-h-[400px] border-t overflow-auto p-4">
          {results.length > 0 ? (
            <ul>
              {results.map((item, index) => (
                <li
                  onClick={() => {
                    setOpen(false);
                    router.push(item.route);
                  }}
                  key={index}
                  className="border-b  border-dashed"
                >
                  <div className="p-2 border border-white border-dashed hover:border-primary hover:border hover:bg-primary/10 rounded-xl transition-all  duration-300 ease-in-out">
                    <div className="font-semibold">
                      {highlightKeyword(item.label, keyword)}
                    </div>
                    <div className="text-sm">
                      {highlightKeyword(item.route, keyword)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={cn(
                "flex items-center justify-center flex-col h-[250px]"
              )}
            >
              <p className="text-xl font-semibold text-center"> Not found </p>
              <p className="text-center">
                No results found for{" "}
                <span className="font-bold">{keyword}</span>
              </p>
              <p className="text-center">
                Try checking for typos or using complete words.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
