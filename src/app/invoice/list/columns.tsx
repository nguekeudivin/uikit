"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getColor } from "@/lib/colors";

import { formatDollars, hexToRGBA } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";

export const createColumns = ({
  startDeleteItem,
  startEditItem,
}: {
  startDeleteItem: (item: any) => void;
  startEditItem: (item: any) => void;
}) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const { name, invoiceNumber } = row.original;
        return (
          <div className="flex items-center gap-2">
            <div className="shrink-0 w-12 h-12 rounded-full items-center justify-center flex text-white bg-green-600 text-xl">
              {name[0]}
            </div>
            <div>
              <p>{name}</p>
              <p className="text-muted-foreground">{invoiceNumber}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Create
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const createDate = row.original.createDate;
        return (
          <div className="truncate">
            <p className="font-normal">{format(createDate, "dd MMM yyyy")}</p>
            <p className="text-muted-foreground">
              {format(createDate, "hh:mm a")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due",
      cell: ({ row }) => {
        const dueDate = row.original.dueDate;
        return (
          <div className="truncate">
            <p className="font-normal">{format(dueDate, "dd MMM yyyy")}</p>
            <p className="text-muted-foreground">
              {format(dueDate, "hh:mm a")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return <>{formatDollars(row.original.amount)}</>;
      },
    },
    {
      accessorKey: "sent",
      header: "Sent",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const color = getColor(row.original.status);
        return (
          <div
            className="px-3 py-0.5 rounded inline-block font-bold text-sm"
            style={{
              backgroundColor: hexToRGBA(color, 0.1),
              color: color,
            }}
          >
            {row.getValue("status")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100">
              <Pencil className="w-5 h-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4 text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    startEditItem(row.original);
                  }}
                >
                  <Pencil />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    startDeleteItem(row.original);
                  }}
                  className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100"
                >
                  <Trash className="text-red-500" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ] as ColumnDef<Invoice>[];
};
