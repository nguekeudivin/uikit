import { DataTableFilter } from "@/types/shared";
import { users } from "../mocks/users";

export const fetchUsersByFilters = (filters: DataTableFilter[]) => {
  return Promise.resolve(users);
};

export const fetchUserStatusData = () => {
  return Promise.resolve([
    {
      label: "All",
      value: "",
      count: 20,
    },
    {
      label: "Active",
      value: "active",
      count: 2,
    },
    {
      label: "Pending",
      value: "pending",
      count: 10,
    },
    {
      label: "Banned",
      value: "banned",
      count: 5,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: 2,
    },
  ]);
};
