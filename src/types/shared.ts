import { ReactNode } from "react";

export interface MenuItem {
  label: string;
  icon?: any;
  route?: string;
  badge?: string | number;
  menu?: MenuItem[];
}

// data contains the items of the current page
// allData contains the items that maybe use for static search.
// When we perform a static pagination using the paginateList util function all the inputs are save into allData so that we may use them again later.
// As example if we have 200 items apply a static pagination with perPage = 20 then data will have 20 elements and allData 200 elements.
// So we apply a server pagination, for performance with can ask the server to add the allData attribut containing all the data.
// allData are use by hooks that perform static search like useSearch.
export interface ListPagination<T> {
  data: T[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  allData: T[]; // this values is usefull only for static pagination.
}

export type UriParams = Record<string, number | string>;

export type IdType = string | number;

export interface FileImage {
  file: File;
  src: string;
}

export interface DataTableFilter {
  id: string | number;
  value: any;
}
