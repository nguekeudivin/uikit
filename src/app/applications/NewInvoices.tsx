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
  ChevronRight,
  Download,
  EllipsisVertical,
  Printer,
  Share2,
  Trash,
} from "lucide-react";
import { hexToRGBA } from "@/lib/utils";

const data = [
  { id: "INV-1990", category: "Android", price: 83.74, status: "Paid" },
  { id: "INV-1991", category: "Mac", price: 97.14, status: "Out of date" },
  { id: "INV-1992", category: "Windows", price: 68.71, status: "Progress" },
  { id: "INV-1993", category: "Android", price: 85.21, status: "Paid" },
  { id: "INV-1994", category: "Mac", price: 52.17, status: "Paid" },
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Invoice ID",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = colors[row.getValue("status") as string];
      return (
        <div
          className="px-3 py-1 rounded-xl inline-block"
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

export default function NewInvoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="New invoices" action={undefined} />
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
