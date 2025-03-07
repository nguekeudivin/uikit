import { ListPagination } from "./shared";

export interface SearchConfig<T> {
  defaultResults: ListPagination<T>;
  // For static search
  predicate?: (item: T, params: any) => boolean;
  // For api search
  fetch?: (params: any) => Promise<ListPagination<T>>;
  fetchSuggestions?: (params: any) => Promise<ListPagination<T>>;
  sort?: (params: any) => Promise<ListPagination<T>>;
  perPage?: number;
}

export interface SearchSorting {
  attr: string;
  order?: string;
  label?: string;
}
