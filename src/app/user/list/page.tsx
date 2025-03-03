"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
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
import StatusFilters from "./StatusFilters";
import DropdownField from "@/components/common/form/DropdownField";
import SearchField from "@/components/common/form/SearchField";
import SimpleTable from "@/components/common/table/SimpleTable";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import useDataTable from "@/hooks/use-datatable";
import { useEffect, useState } from "react";
import {
  fetchUsersByFilters,
  fetchUserStatusData,
} from "@/api-call/endpoints/users";
import UserAvatar from "@/components/common/UserAvatar";
import { getColor } from "@/lib/colors";

import { hexToRGBA } from "@/lib/utils";
import { User, UserStatus } from "@/types/users";

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
    },
    {
      accessorKey: "role",
      header: " Role",
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

export default function UserListPage() {
  const [items, setItems] = useState<User[]>([]);
  const [status, setStatus] = useState<UserStatus[]>([]);
  const columns = createColumns({
    startEditItem,
    startDeleteItem,
  });

  // Here we can use internal filters of external filters.
  // Keep 2 version of filter. The one belonging to data table and the custom one that is not internally supported by database.
  const { table, filters, rowSelection, setFilterValue, getFilterValue } =
    useDataTable({
      data: items,
      state: {
        pagination: {
          pageSize: 5,
          pageIndex: 0,
        },
      },
      columns,
      useApi: true, // set useApi to true if we want to handle filters with api not static datatable.
    });

  // If use api is set to true then need to list to filters update and send an api request.
  useEffect(() => {
    // Handle external filtring here.
    // By default
    fetchUsersByFilters(filters).then((results: any[]) => setItems(results));
  }, [filters]);

  useEffect(() => {
    fetchUserStatusData().then((results) => setStatus(results));
  }, []);

  function startEditItem(item: User) {}
  function startDeleteItem(item: User) {}

  const [resultCount, setResultCount] = useState(0);
  useEffect(() => {
    setResultCount(table.getFilteredRowModel().rows.length);
  }, [table]);

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
          <DropdownField
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
            config={{
              status: "Status",
              role: "Role",
              keyword: "Keyword",
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
