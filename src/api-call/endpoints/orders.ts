import { DataTableFilter } from "@/types/shared";
import { orders } from "../mocks/orders";

export const fetchOrdersByFilters = (filters: DataTableFilter[]) => {
  console.log(filters);
  return Promise.resolve(orders);
};

export const fetchOrderStatusData = () => {
  return Promise.resolve([
    {
      label: "All",
      value: "",
      count: 20,
    },
    {
      label: "Completed",
      value: "Completed",
      count: 2,
    },
    {
      label: "Pending",
      value: "Pending",
      count: 10,
    },
    {
      label: "Cancelled",
      value: "Cancelled",
      count: 5,
    },
    {
      label: "Refunded",
      value: "Refunded",
      count: 10,
    },
  ]);
};
