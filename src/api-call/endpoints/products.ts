import { DataTableFilter } from "@/types/shared";
import { products } from "../mocks/products";

export const fetchProductsByFilters = (filters: DataTableFilter[]) => {
  return Promise.resolve(products);
};
