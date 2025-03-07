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
  perPage = 15,
}: SearchConfig<T>) {
  const [results, setResults] = useState<ListPagination<T>>(defaultResults);
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [sorting, setSorting] = useState<SearchSorting>();
  const {
    values: filters,
    safeSetValues: setFilters,
    setValue: setFilterValue,
  } = useRecord<any>({});

  const hasError = error != "" || error != undefined;

  const handleChange = ({ target }: any) => {
    setKeyword(target.value);
    // Apply the predicate.
    if (predicate)
      setResults(
        paginateList(
          defaultResults.allData.filter((item: T) =>
            predicate(item, { keyword, filters })
          ),
          1,
          perPage
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

  const apply = (values: any) => {
    let newFilters = setFilters(values);
    // Run the search. We keep the keyword because we need to consider it in the search.
    // The keyword is not consider as a filter here. we may have a filter call keyword that will difference from the keyword for search.
    // It may be handle the same way by the api but the way we handle it here. It's not the same.
    if (fetch) {
      setLoading(true);
      fetch({ keyword, filters: newFilters })
        .then((items: ListPagination<T>) => {
          setLoading(false);
          setResults(items);
        })
        .catch((err) => {
          setError("An error happens when searching for items");
        });
    } else {
      // If predicate.
      if (predicate)
        setResults(
          paginateList(
            defaultResults.allData.filter((item: T) =>
              predicate(item, { keyword, filters: newFilters })
            ),
            1,
            perPage
          )
        );
    }
  };

  const sortBy = ({ attr, order = "desc", label }: SearchSorting) => {
    // Update the sorting
    setSorting({ attr, order, label: label ? label : attr });

    // Run the request. We still send keyword and filters because we need to consider them in the research.
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
      setResults(
        paginateList(sortList(defaultResults.allData, attr, order), 1, perPage)
      );
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
    setFilterValue,
    setKeyword,
    results,
    setResults,
    handleChange,
    renderNotFound,
  };
}
