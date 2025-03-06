"use client";

import { cn, paginateList, sortList } from "@/lib/utils";
import { useState } from "react";
import { useRecord } from "./use-record";
import { SearchConfig, SearchSorting } from "@/types/search";
import { ListPagination } from "@/types/shared";

export default function useSearch<T>({
  defaultResults,
  predicate,
  fetch,
  fetchSuggestions,
  sort,
}: SearchConfig<T>) {
  const [results, setResults] = useState<ListPagination<T>>(defaultResults);
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { values: filters, setValue: setFilter } = useRecord<any>({});
  const [sorting, setSorting] = useState<SearchSorting>();

  const hasError = error != "" || error != undefined;

  const handleChange = ({ target }: any) => {
    setKeyword(target.value);
    // Apply the predicate.
    if (predicate)
      setResults(
        paginateList(
          defaultResults.allData.filter((item: T) =>
            predicate(item, { keyword, filters })
          )
        )
      );
    // fetch suggesttions.
    if (fetchSuggestions) {
      setLoading(true);
      fetchSuggestions({ keyword, filters })
        .then((items: ListPagination<T>) => {
          setLoading(false);
          setResults(items);
        })
        .catch((err) => {
          setError("An error happens when searching for items");
        });
    }
  };

  const apply = () => {
    if (fetch) {
      setLoading(true);
      fetch({ keyword, filters })
        .then((items: ListPagination<T>) => {
          setLoading(false);
          setResults(items);
        })
        .catch((err) => {
          setError("An error happens when searching for items");
        });
    }
  };

  const sortBy = ({ attr, order = "desc", label }: SearchSorting) => {
    // We the sort function is apply here we run it.
    setSorting({ attr, order, label: label ? label : attr });
    if (sort) {
      setLoading(true);
      sort({ keyword, filters, sorting: { attr, order } }).then(
        (items: ListPagination<T>) => {
          setLoading(false);
          setResults(items);
        }
      );
    } else {
      // Otherwise we run static sorting.
      setResults(paginateList(sortList(defaultResults.allData, attr, order)));
    }
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
    hasError,
    loading,
    sorting,
    setLoading,
    apply,
    sortBy,
    keyword,
    filters,
    setFilter,
    setKeyword,
    results,
    setResults,
    handleChange,
    renderNotFound,
  };
}
