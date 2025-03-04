"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  FileDown,
  FileUp,
  Pencil,
  Printer,
  Trash,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PageContent from "@/components/common/PageContent";
import StatusFilters from "../../../components/common/StatusFilters";
import SearchField from "@/components/common/form/SearchField";
import SimpleTable from "@/components/common/table/SimpleTable";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import useDataTable from "@/hooks/use-datatable";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { getColor } from "@/lib/colors";

import { cn, formatDollars, hexToRGBA } from "@/lib/utils";
import { User, UserStatus } from "@/types/users";
import { format } from "date-fns";
import { Order } from "@/types/order";
import {
  fetchOrdersByFilters,
  fetchOrderStatusData,
} from "@/api-call/endpoints/orders";
import { useSimpleForm } from "@/hooks/use-simple-form";
import DateField from "@/components/common/form/DateField";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRecord } from "@/hooks/use-record";
import Link from "next/link";
import { IdType } from "@/types/shared";
const createColumns = ({
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

export default function UserListPage() {
  const { values: isUnfold, setValue: unfold } = useRecord<boolean>({});

  const [items, setItems] = useState<User[]>([]);
  const [status, setStatus] = useState<UserStatus[]>([]);
  const columns = createColumns({
    deleteOrder,
    isUnfold,
    unfold,
  });

  const { table, filters, setFilterValue, getFilterValue } = useDataTable({
    data: items,
    state: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    columns,
  });

  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    fetchOrdersByFilters(filters).then((results: any[]) => setItems(results));
    setResultCount(table.getFilteredRowModel().rows.length);
  }, [filters]);

  useEffect(() => {
    fetchOrderStatusData().then((results) => setStatus(results));
  }, []);

  const form = useSimpleForm({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      keyword: "",
    },
  });

  useEffect(() => {
    if (form.values.startDate && form.values.endDate) {
      setFilterValue(
        "date",
        `${format(form.values.startDate, "dd-MM-yyyy")} to ${format(
          form.values.endDate,
          "dd-MM-yyyy"
        )}`
      );
    }
  }, [form.values]);

  function deleteOrder(row: any) {
    // Delete order here.
  }

  return (
    <PageContent
      title="List"
      links={{ User: "#", List: "#" }}
      className="max-w-6xl pb-4"
    >
      <div className="shadow rounded-lg mt-12">
        <StatusFilters
          status={status}
          filters={filters}
          onValueChange={(value) => {
            setFilterValue("status", value);
          }}
          className="border-b"
        />

        <div className="flex items-center gap-4 px-4 mt-6">
          <DateField
            label="Start date"
            value={form.values.startDate}
            onValueChange={(date) => {
              form.setValue("startDate", date);
            }}
          />

          <DateField
            label="End Date"
            value={form.values.endDate}
            onValueChange={(date) => {
              form.setValue("endDate", date);
            }}
          />

          <SearchField
            value={form.values.keyword}
            onChange={({ target }: any) => {
              setFilterValue(
                "keyword",
                target.value != "" ? target.value : undefined
              );
              form.setValue("keyword", target.value);
            }}
            placeholder="Search..."
            className="w-full"
          />

          <div className="pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4 text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Printer />
                  <span>Print</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileDown />
                  <span>Import</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileUp />
                  <span>Export</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="px-4 mt-4">
          <FiltersValuesList
            resultCount={resultCount}
            setFilterValue={setFilterValue}
            filters={filters}
            onValueRemoved={(id: string) => {
              if (id == "date") {
                form.setValue("startDate", undefined);
                form.setValue("endDate", undefined);
              }
              if (id == "keyword") form.setValue("keyword", "");
            }}
            config={{
              status: "Status",
              role: "Role",
              keyword: "Keyword",
              date: "Date",
            }}
          />
        </div>

        <div className="mt-6">
          <SimpleTable
            table={table}
            columns={columns}
            onDeleteSelected={() => {
              // handle onDeleteSelected
            }}
            renderRow={({ row, dense }: any) => (
              <>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.original.products != undefined && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      height={0}
                      className="p-0"
                    >
                      <div
                        className={cn(
                          "h-0 px-4 overflow-hidden  bg-gray-200 overflow-hidden transition-all duration-300 ease-in-out",
                          {
                            "h-auto py-4": isUnfold[row.id],
                          }
                        )}
                      >
                        <ul className="rounded-xl overflow-hidden">
                          {row.original.products.map(
                            (item: any, index: number) => (
                              <li
                                key={`orderproduct${index}`}
                                className="flex items-center justify-between bg-white p-4 border-t"
                              >
                                <div className="flex items-center gap-4">
                                  <div
                                    className="bg-cover w-12 h-12 rounded-xl"
                                    style={{
                                      backgroundImage: `url(${item.image})`,
                                    }}
                                  />
                                  <div>
                                    <p>{item.name}</p>
                                    <p className="text-muted-foreground">
                                      {item.code}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-8">
                                  <p>x{item.quantity}</p>
                                  <p className="font-sembiold">
                                    {formatDollars(item.quantity * item.price)}
                                  </p>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          />
        </div>
      </div>
    </PageContent>
  );
}
