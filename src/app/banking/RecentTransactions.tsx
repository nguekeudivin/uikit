"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable";
import colors from "@/lib/colors";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Download,
  EllipsisVertical,
  Printer,
  Share2,
  Trash,
} from "lucide-react";
import { hexToRGBA } from "@/lib/utils";
import { format } from "date-fns";
import icons from "@/lib/icons";

const data = [
  {
    type: "Receive",
    counterparty: "Annette Black",
    date: "2025-02-19T19:37:00Z",
    amount: 68.71,
    status: "In Progress",
    image: "/assets/images/avatar/avatar-1.webp",
  },
  {
    type: "Payment",
    counterparty: "Courtney Henry",
    date: "2025-02-18T18:37:00Z",
    amount: 85.21,
    status: "Completed",
    image: "/assets/images/avatar/avatar-2.webp",
  },
  {
    type: "Payment",
    counterparty: "Theresa Webb",
    date: "2025-02-17T17:37:00Z",
    amount: 52.17,
    status: "Failed",
    image: "/assets/images/avatar/avatar-3.webp",
  },
  {
    type: "Payment",
    counterparty: "Fast Food",
    date: "2025-02-16T16:37:00Z",
    amount: 25.18,
    status: "Completed",
    icon: "fastFood",
  },
  {
    type: "Payment",
    counterparty: "Fitness",
    date: "2025-02-15T15:37:00Z",
    amount: 43.84,
    status: "In Progress",
    icon: "fitness",
  },
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "Description",
    cell: ({ row }) => {
      console.log(row);
      const counterparty = row.original.counterparty as string;
      const image = row.original.image as string;
      let Icon = undefined;
      if (row.original.icon) {
        Icon = icons[row.original.icon as string] as any;
      }
      return (
        <div className="flex items-center">
          <div
            className="rounded-full h-12 w-12 bg-gray-100 flex items-center justify-center relative"
            style={{ backgroundImage: `url()` }}
          >
            {Icon != undefined ? (
              <Icon className="text-gray-700" />
            ) : (
              <img
                src={image}
                alt={counterparty}
                className="w-12 h-12 rounded-full"
              />
            )}

            {row.original.type == "Receive" ? (
              <div className="absolute bottom-0 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-green-500 text-white ">
                <ArrowDown className="rotate-45 w-3 h-3" />
              </div>
            ) : (
              <div className="absolute bottom-0 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white ">
                <ArrowUp className="rotate-45 w-3 h-3" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <p className="font-semibold">
              {row.original.type == "Receive"
                ? "Receive money from"
                : "Payment for"}
            </p>
            <p className="text-muted-foreground">{counterparty}</p>
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
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = colors[row.getValue("status") as string];
      return (
        <div
          className="px-3 py-1 rounded-xl inline-block font-bold"
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
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-4 h-4 text-gray-800" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Download />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer />
              <span> Print</span>
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
      );
    },
  },
];

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Recent transactions" action={undefined} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <button className="inline-flex items-center gap-2">
          <span>View All</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </CardFooter>
    </Card>
  );
}
