"use client";

import { flexRender, RowSelection } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/common/table/DataTablePagination";
import { Switch } from "@/components/ui/switch";
import { Grid2x2X, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MdCheckBox, MdIndeterminateCheckBox } from "react-icons/md";

interface SimpleTableProps {
  table: any;
  columns: any;
  onDeleteSelected?: () => void;
}
export default function SimpleTable({
  table,
  columns,
  onDeleteSelected,
}: SimpleTableProps) {
  const [dense, setDense] = useState<boolean>(false);

  return (
    <div className="relative  border">
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between bg-green-100 py-3 px-4">
          <div className="flex items-center gap-2 ">
            {table.getIsAllRowsSelected() ? (
              <button onClick={() => table.toggleAllRowsSelected(false)}>
                <MdCheckBox className="w-5 h-5 text-primary" />
              </button>
            ) : (
              <button
                onClick={() => {
                  table.toggleAllRowsSelected(true);
                }}
              >
                <MdIndeterminateCheckBox className="w-5 h-5 text-primary" />
              </button>
            )}

            <p className="ml-6 text-green-800 font-semibold">
              {table.getFilteredSelectedRowModel().rows.length} selected
            </p>
          </div>

          <button onClick={onDeleteSelected}>
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}

      <Table>
        <TableHeader className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-dashed"
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell
                    key={cell.id}
                    className={cn({
                      "py-2": dense,
                      "py-4": !dense,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="h-[300px]  bg-gray-100 m-4 flex items-center justify-center rounded-xl border border-dashed">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Grid2x2X className="w-12 h-12 " />
                    <p className="text-xl mt-2">No data</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4 border-t">
        <div className="items-center flex gap-4">
          <Switch
            id="dense-switch"
            onCheckedChange={(checked) => setDense(checked)}
          />
          <label id="denses-switch"> Dense</label>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
