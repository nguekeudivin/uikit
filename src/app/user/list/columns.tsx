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

import UserAvatar from "@/components/common/UserAvatar";
import { getColor } from "@/lib/colors";

import { hexToRGBA } from "@/lib/utils";
import { User } from "@/types/users";

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
      header: "Name",
      cell: ({ row }) => {
        const { name, avatar, email } = row.original;
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={name} avatar={avatar} />
            <div>
              <p>{name}</p>
              <p className="text-muted-foreground">{email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone number",
    },
    // {
    //   accessorKey: "email",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Email
    //         <ArrowUpDown />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    // },
    {
      accessorKey: "company",
      header: " Company",
      cell: ({ row }) => <p className="text-nowrap">{row.original.company}</p>,
    },
    {
      accessorKey: "role",
      header: " Role",
      cell: ({ row }) => <p className="text-nowrap">{row.original.role}</p>,
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
  ] as ColumnDef<User>[];
};
