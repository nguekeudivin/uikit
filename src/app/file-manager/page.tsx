"use client";

import PageContent from "@/components/common/PageContent";
import SearchField from "@/components/common/form/SearchField";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import useDataTable from "@/hooks/use-datatable";
import { useEffect, useState } from "react";
import { useSimpleForm } from "@/hooks/use-simple-form";

import { createColumns } from "./columns";
import FileTypeFilter from "./FileTypeFilter";
import { files } from "@/api-call/mocks/files";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { DatePickerWithRange } from "@/components/common/DatePickerWidthRange";
import { format } from "date-fns";
import FileGridListing from "./FileGridListing";

export default function FileManagerPage() {
  const columns = createColumns();

  const { table, filters, setFilterValue, getFilterValue } = useDataTable({
    data: files,
    state: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    columns,
    useApi: false,
  });

  const [resultCount, setResultCount] = useState(0);
  useEffect(() => {
    setResultCount(table.getFilteredRowModel().rows.length);
  }, [table]);

  const form = useSimpleForm({
    defaultValues: {
      keyword: "",
      stock: [],
      status: [],
    },
  });

  return (
    <PageContent
      title="Filemanager"
      action={
        <>
          <Button variant="dark">
            <CloudUpload />
            Upload
          </Button>
        </>
      }
      className="max-w-6xl pb-4"
    >
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
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

        <div className="flex items-center gap-4">
          <DatePickerWithRange
            onSelect={(dateRange) => {
              if (dateRange.from && dateRange.to) {
                setFilterValue(
                  "date",
                  `${format(dateRange.from, "dd-MM-yyyy")} to ${format(
                    dateRange.to,
                    "dd-MM-yyyy"
                  )}`
                );
              }
            }}
          />

          <FileTypeFilter
            selected={getFilterValue("type")}
            select={(type: string) => {
              setFilterValue("type", type);
            }}
          />
        </div>
      </div>

      <div className="px-4 mt-4">
        <FiltersValuesList
          resultCount={resultCount}
          setFilterValue={setFilterValue}
          filters={filters}
          config={{
            date: "Date",
            type: "Type",
            keyword: "Keyword",
          }}
          onValueRemoved={(id: string) => {
            if (id == "keyword") form.setValue("keyword", "");
          }}
        />
      </div>

      <div className="mt-6">
        {/* <FileTableListing table={table} columns={columns} /> */}

        <FileGridListing table={table} />
      </div>
    </PageContent>
  );
}
