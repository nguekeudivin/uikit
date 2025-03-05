import { cn } from "@/lib/utils";
import { useState } from "react";

export default function useSearch({ data, predicate }: any) {
  const [results, setResults] = useState<any[]>(data);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = ({ target }: any) => {
    setKeyword(target.value);
    setResults(data.filter((item: any) => predicate(item, keyword)));
  };

  const renderNotFound = (className: string) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center flex-col h-[400px] border",
          className
        )}
      >
        <p className="text-xl font-semibold text-center"> Not found </p>
        <p className="text-center">
          No results found for <span className="font-bold">{keyword}</span>
        </p>
        <p className="text-center">
          Try checking for typos or using complete words.
        </p>
      </div>
    );
  };

  return {
    keyword,
    setKeyword,
    results,
    setResults,
    handleChange,
    renderNotFound,
  };
}
