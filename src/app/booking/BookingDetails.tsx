"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";
import { colors } from "@/lib/colors";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Download,
  EllipsisVertical,
  Printer,
  Share2,
  Trash,
} from "lucide-react";
import { hexToRGBA } from "@/lib/utils";
import { format } from "date-fns";
import { bookings } from "@/api-call/endpoints/booking";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div
            className="shrink-0 rounded-lg h-12 bg-cover w-12 bg-gray-100 flex items-center justify-center relative"
            style={{ backgroundImage: `url(${row.original.image})` }}
          ></div>
          <div className="ml-4 text-nowrap">{row.original.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="text-nowrap">
          <p>{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Check In",
    cell: ({ row }) => {
      const date = row.original.startDate as string;
      return (
        <div className="text-nowrap">
          <p>{format(date, "dd MMM yyyy")}</p>
          <p className="text-muted-foreground text-sm">
            {format(date, "HH:mm a")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Check out",
    cell: ({ row }) => {
      const date = row.original.endDate as string;
      return (
        <div className="text-nowrap">
          <p>{format(date, "dd MMM yyyy")}</p>
          <p className="text-muted-foreground text-sm">
            {format(date, "HH:mm a")}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = colors[row.original.status];
      return (
        <div
          className="px-3 py-1 rounded-xl inline-block font-bold text-sm"
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

export default function BookingDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Booking Details" action={undefined} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={bookings.slice(0, 5)} />
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
