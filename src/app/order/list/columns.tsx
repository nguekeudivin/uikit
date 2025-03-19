"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
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

import UserAvatar from "@/components/common/UserAvatar";
import { getColor } from "@/lib/colors";

import { formatDollars, hexToRGBA } from "@/lib/utils";
import { format } from "date-fns";
import { Order } from "@/types/order";
import Link from "next/link";
import { IdType } from "@/types/shared";

export const createColumns = ({
  deleteOrder,
  isUnfold,
  unfold,
}: {
  deleteOrder: (row: any) => void;
  isUnfold: Record<IdType, boolean>;
  unfold: (id: IdType, bool: boolean) => void;
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
      accessorKey: "customer",
      header: "Cusotomer",
      cell: ({ row }) => {
        const customer = row.original.customer;
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={customer.name} avatar={customer.avatar} />
            <div>
              <p>{customer.name}</p>
              <p className="text-muted-foreground">{customer.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return (
          <div className="truncate">
            <p>{format(date, "dd MMM yyyy")}</p>
            <p className="text-muted-foreground text-sm">
              {format(date, "HH:mm a")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Items",
      cell: ({ row }) => <p>{row.original.products.length}</p>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return <p>{formatDollars(row.original.amount)} </p>;
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
            <button
              onClick={() => {
                unfold(row.id, !isUnfold[row.id]);
              }}
              className="p-1 hover:bg-gray-100 text-muted-foreground mr-2 rounded-full"
            >
              {isUnfold[row.id] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4 text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/order/details`}>
                    <Pencil />
                    <span>View</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    deleteOrder(row.original);
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
  ] as ColumnDef<Order>[];
};
