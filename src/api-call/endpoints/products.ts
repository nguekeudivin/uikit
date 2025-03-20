import { DataTableFilter } from "@/types/shared";
import { products } from "../mocks/products";

export const fetchProductsByFilters = (filters: DataTableFilter[]) => {
  console.log(filters);

  return Promise.resolve(products);
};
