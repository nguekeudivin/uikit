import { useState } from "react";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function useDataTable({ data, columns, useApi, state }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // When working with datatable. There is something we need to keep in mind.
  // It handle only the data that are define in its core. So anything external won't be handle.
  // For example if need to handle a filter that are not directly link to a column of the table, it won't work.
  // For example if we want to filter using a keyword. We need to have keyword column into the table. But it's generaly the case.
  // So in order to support the keyword filtring we need to make additionnal filtring consideration.
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filters, setFilters] = useState<any[]>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...state,
    },
  });

  const isValidValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.length != 0;
    } else {
      return value != undefined;
    }
  };

  const setFilterValue = (name: string, value: any) => {
    // If useApi is set to true we do not handle filtring with datatable.
    // We must then handle the filtring by listening to filters changes
    if (!useApi) {
      const column = table.getAllColumns().find((col) => col.id === name);
      // Save the table filters.
      if (column) {
        column?.setFilterValue(value);
      }
    }

    if (isValidValue(value))
      setFilters((values) => [
        ...values.filter((val: any) => val.id != name),
        { id: name, value },
      ]);
    else {
      setFilters((values) => values.filter((val: any) => val.id != name));
    }
  };

  const getFilterValue = (name: string) => {
    const filter = filters.find((item) => item.id == name);
    if (filter) {
      return filter.value;
    } else {
      return undefined;
    }
  };

  return {
    filters,
    table,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    setFilterValue,
    getFilterValue,
  };
}
