export interface ListingPagination {
  data: any[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export type UriParams = Record<string, number | string>;

export type IdType = string | number;
