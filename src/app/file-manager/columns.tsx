"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { formatFileSize, hexToRGBA } from "@/lib/utils";
import { format } from "date-fns";
import FileIcon from "@/components/common/FileIcon";
import { FileItem } from "@/types/file";
import { EllipsisVertical, Link, Share2, Star, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const createColumns = () => {
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
        const { name, type } = row.original;
        return (
          <div className="flex items-center gap-4 font-normal">
            <FileIcon className="w-8 h-8 shrink-0" name={type} />
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => <span> {formatFileSize(row.original.size)}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
    },

    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.date as string;
        return (
          <>
            <p>{format(date, "dd MMM yyyy")}</p>
            <p className="text-muted-foreground text-sm">
              {format(date, "HH:mm a")}
            </p>
          </>
        );
      },
    },
    {
      accessorKey: "users",
      header: <div className="text-center">Shared</div>,
      cell: ({ row }) => {
        const users = row.original.users as any[];
        return (
          <div className="flex items-center justify-end gap-4">
            <div className="">
              {users.length != 0 && (
                <div className="flex items-center relative mt-2">
                  {users.slice(0, 2).map((user, userIndex) => (
                    <div
                      key={`fileuser${row.index}${userIndex}`}
                      style={{
                        right: `${(userIndex + 1) * 25}px`,
                        backgroundImage: `url(${user.image})`,
                      }}
                      className={`z-${
                        userIndex * 10
                      } absolute w-8 h-8 bg-cover rounded-full border border-white`}
                    ></div>
                  ))}
                  {users.length > 2 && (
                    <div className="right-[0px] text-sm font-semibold z-5 absolute w-8 h-8 rounded-full bg-primary/10 text-primary border-primary flex items-center justify-center">
                      +{users.length - 2}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button>
              {row.original.starred ? (
                <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
              ) : (
                <Star className="text-muted-foreground w-5 h-5" />
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4 text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link />
                  <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100">
                  <Trash className="text-red-500" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ] as ColumnDef<FileItem>[];
};
