"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getColor } from "@/lib/colors";
import { cn, formatDollars, hexToRGBA } from "@/lib/utils";
import { Product } from "@/types/product";
import { format } from "date-fns";
import ColumnHeader from "./ColumnHeader";

export const createColumns = ({
  startDeleteItem,
  startEditItem,
  manageColumn,
  filterColumn,
}: {
  startDeleteItem: (item: any) => void;
  startEditItem: (item: any) => void;
  manageColumn: any;
  filterColumn: any;
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
      header: ({ column }) => (
        <ColumnHeader
          label="Product"
          column={column}
          manageColumn={manageColumn}
          filterColumn={filterColumn}
        />
      ),
      cell: ({ row }) => {
        const { image, name, category } = row.original;
        return (
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-muted-foreground">{category}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <ColumnHeader
          label="Created At"
          column={column}
          manageColumn={manageColumn}
          filterColumn={filterColumn}
        />
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return (
          <div>
            <p className="font-normal">{format(createdAt, "dd MMM yyyy")}</p>
            <p className="text-muted-foreground">
              {format(createdAt, "hh:mm a")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        return (
          <div>
            <div
              className={cn("rounded-lg h-2", {
                "bg-sky-100": quantity > 50,
                "bg-amber-100": quantity < 50,
                "bg-red-100": quantity == 0,
              })}
            >
              <div
                className={cn("rounded-lg h-2", {
                  "bg-sky-500": quantity > 50,
                  "bg-amber-500": quantity < 50,
                  "bg-red-500": quantity == 0,
                })}
                style={{ width: `${quantity}%` }}
              ></div>
            </div>
            <div className="text-muted-foreground text-sm mt-2">
              {quantity == 0 && <p>Out of stock</p>}
              {quantity > 50 && <p>{quantity} in stock</p>}
              {quantity < 50 && <p>{quantity} low stock</p>}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return <>{formatDollars(row.original.price)}</>;
      },
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
  ] as ColumnDef<Product>[];
};
