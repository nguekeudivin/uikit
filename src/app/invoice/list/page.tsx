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

import { User, UserStatus } from "@/types/users";
import { useSimpleForm } from "@/hooks/use-simple-form";
import DropdownCheckboxes from "@/components/common/form/DropdownCheckboxes";
import { createColumns } from "./columns";
import {
  fetchInvoicesByFilters,
  fetchInvoiceStatusData,
  services,
} from "@/api-call/endpoints/invoices";
import DateField from "@/components/common/form/DateField";
import { format } from "date-fns";
import { cn, formatDollars } from "@/lib/utils";
import CustomRadialBar from "@/components/common/CustomRadialBar";
import { getColor } from "@/lib/colors";
import icons from "@/lib/icons";

export default function InvoiceListPage() {
  const [items, setItems] = useState<User[]>([]);
  const [status, setStatus] = useState<any[]>([]);
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
      useApi: false,
    });

  useEffect(() => {
    fetchInvoicesByFilters(filters).then((results: any[]) => setItems(results));
  }, [filters]);

  useEffect(() => {
    fetchInvoiceStatusData().then((results) => setStatus(results));
  }, []);

  function startEditItem(item: User) {}
  function startDeleteItem(item: User) {}

  const [resultCount, setResultCount] = useState(0);
  useEffect(() => {
    setResultCount(table.getFilteredRowModel().rows.length);
  }, [table]);

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

  return (
    <PageContent
      title="List"
      links={{ User: "#", List: "#" }}
      className="max-w-6xl pb-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 shadow rounded-2xl mt-8 p-4">
        {status.map((item, index) => (
          <div
            key={`status-grid-item-${index}`}
            className={cn("flex items-center border-dashed justify-center", {
              "border-r": index != status.length - 1,
            })}
          >
            <div className="">
              <CustomRadialBar
                radius={64}
                width={90}
                height={90}
                coloredSize={5}
                mutedSize={5}
                color={getColor(item.value)}
                mutedColor="#F3F4F6"
                coverage={item.percentage}
                centerHTML={
                  <>
                    {(() => {
                      const Icon = icons[item.label] as any;
                      return (
                        <Icon
                          className="w-8 h-8 stroke-1"
                          style={{ color: getColor(item.value) }}
                        />
                      );
                    })()}
                  </>
                }
              />
            </div>
            <div>
              <p className="font-semibold text-lg">{item.label}</p>
              <p className="text-muted-foreground">{item.count} invoices</p>
              <p className="font-semibold">{formatDollars(item.amount)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="shadow rounded-lg mt-8">
        <StatusFilters
          status={status}
          filters={filters}
          onValueChange={(value: any) => {
            setFilterValue("status", value);
          }}
          className="border-b"
        />

        <div className="flex items-center grid grid-cols-1 md:grid-cols-4  gap-4 px-4 mt-6">
          <DropdownCheckboxes
            label="Service"
            className="w-[200px]"
            optionsClassName="w-[250px]"
            options={services.map((item) => ({ value: item, label: item }))}
            name="service_filter"
            values={
              (() => {
                const items = getFilterValue("service");
                return items === undefined || items === null ? [] : items;
              })() as string[]
            }
            onValuesChange={(values) => {
              setFilterValue(
                "service",
                values.length == 0 ? undefined : values
              );
            }}
          />

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

          <div className="flex items-center gap-2">
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

            <div className="pl-4">
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
              service: "Service",
              keyword: "Keyword",
              date: "Date",
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
