import { DataTableFilter } from "@/types/shared";
import { invoices } from "../mocks/invoices";

//(filters: DataTableFilter[)
export const fetchInvoicesByFilters = (filters: DataTableFilter[]) => {
  console.log(filters);
  return Promise.resolve(invoices);
};

export const fetchInvoiceStatusData = () => {
  return Promise.resolve([
    {
      label: "All",
      value: "",
      count: 20,
      amount: 56000,
    },
    {
      label: "Paid",
      value: "Paid",
      amount: 23110.23,
      count: 10,
      percentage: 50,
    },
    {
      label: "Pending",
      value: "Pending",
      amount: 13800,
      count: 6,
      percentage: 30,
    },
    {
      label: "Overdue",
      value: "Overdue",
      count: 2,
      amount: 4650,
      percentage: 12,
    },
    {
      label: "Draft",
      value: "Draft",
      count: 2,
      amount: 4638,
      percentage: 12,
    },
  ]);
};

export const services = [
  "Technology",
  "Health and Wellness",
  "Travel",
  "Education",
  "Food and Beverage",
  "Fashion",
  "Home and Garden",
];
