"use client";

import { EllipsisVertical, FileDown, FileUp, Printer } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PageContent from "@/components/common/PageContent";
import StatusFilters from "@/components/common/StatusFilters";
import SearchField from "@/components/common/form/SearchField";
import SimpleTable from "@/components/common/table/SimpleTable";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import useDataTable from "@/hooks/use-datatable";
import { useEffect, useState } from "react";
import {
  fetchUsersByFilters,
  fetchUserStatusData,
} from "@/api-call/endpoints/users";
import { User, UserStatus } from "@/types/users";
import { useSimpleForm } from "@/hooks/use-simple-form";
import DropdownCheckboxes from "@/components/common/form/DropdownCheckboxes";
import { createColumns } from "./columns";

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
        <StatusFilters
          status={status}
          filters={filters}
          onValueChange={(value: any) => {
            setFilterValue("status", value);
          }}
          className="border-b"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-6">
          <div className="w-full">
            {" "}
            <DropdownCheckboxes
              label="Role"
              className="w-full md:w-[200px]"
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
          </div>
          <div className="flex justify-between items-center gap-4">
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
