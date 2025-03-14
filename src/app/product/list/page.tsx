"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Pencil, Router, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PageContent from "@/components/common/PageContent";
import SearchField from "@/components/common/form/SearchField";
import SimpleTable from "@/components/common/table/SimpleTable";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import useDataTable from "@/hooks/use-datatable";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { getColor } from "@/lib/colors";

import { cn, formatDollars, hexToRGBA } from "@/lib/utils";
import { useSimpleForm } from "@/hooks/use-simple-form";
import DropdownCheckboxes from "@/components/common/form/DropdownCheckboxes";
import { fetchProductsByFilters } from "@/api-call/endpoints/products";
import { Product } from "@/types/product";
import { format } from "date-fns";

const createColumns = ({
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
      header: "Product",
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
      header: "Create at",
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
                "bg-green-100": quantity > 50,
                "bg-amber-100": quantity < 50,
                "bg-red-100": quantity == 0,
              })}
            >
              <div
                className={cn("rounded-lg h-2", {
                  "bg-green-500": quantity > 50,
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

export default function ProductsListPage() {
  const [items, setItems] = useState<Product[]>([]);
  const columns = createColumns({
    startEditItem,
    startDeleteItem,
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
    useApi: true,
  });

  useEffect(() => {
    fetchProductsByFilters(filters).then((results: any[]) => setItems(results));
  }, [filters]);

  function startEditItem(item: Product) {}
  function startDeleteItem(item: Product) {}

  const [resultCount, setResultCount] = useState(0);
  useEffect(() => {
    setResultCount(table.getFilteredRowModel().rows.length);
  }, [table]);

  const form = useSimpleForm({
    defaultValues: {
      keyword: "",
    },
  });

  return (
    <PageContent
      title="List"
      links={{ User: "#", List: "#" }}
      className="max-w-6xl pb-4"
    >
      <div className="shadow rounded-lg mt-12">
        <div className="flex items-center gap-4 px-4 mt-6">
          <DropdownCheckboxes
            label="Role"
            className="w-[200px]"
            optionsClassName="w-[250px]"
            options={[
              {
                label: "CTO",
                value: "CTO",
              },
              {
                label: "Sale Manager",
                value: "Sale Manager",
              },
              {
                label: "CEO",
                value: "CEO",
              },
            ]}
            name="role_filter"
            values={
              (() => {
                const items = getFilterValue("role");
                return items === undefined || items === null ? [] : items;
              })() as string[]
            }
            onValuesChange={(values) => {
              setFilterValue("role", values.length == 0 ? undefined : values);
            }}
          />

          <SearchField
            onChange={({ target }: any) => {
              setFilterValue(
                "keyword",
                target.value != "" ? target.value : undefined
              );
            }}
            placeholder="Search..."
            className="w-full"
          />
        </div>

        <div className="px-4 mt-4">
          <FiltersValuesList
            resultCount={resultCount}
            setFilterValue={setFilterValue}
            filters={filters}
            config={{
              stock: "Stock",
              status: "Status",
              keyword: "Keyword",
            }}
            onValueRemoved={(id: string) => {
              if (id == "keyword") form.setValue("keyword", "");
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
          />
        </div>
      </div>
    </PageContent>
  );
}
