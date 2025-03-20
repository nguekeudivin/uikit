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
import { CloudUpload, LayoutGrid, LayoutList } from "lucide-react";
import { DatePickerWithRange } from "@/components/common/DatePickerWidthRange";
import { format } from "date-fns";
import FileGridListing from "./FileGridListing";

import { FileContext } from "../file/FileContext";
import FileTableListing from "./FileTableListing";
import { cn } from "@/lib/utils";

export default function FileManagerPage() {
  const columns = createColumns();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [openFolderDialog, setOpenFolderDialog] = useState<boolean>(false);

  // const handleUploadedFiles = (files: File[]) => {
  const handleUploadedFiles = () => {
    // handle uploaded files here.
  };

  //  const createFolder = ({ name, files }: Folder) => {
  const createFolder = () => {
    // handle folder creation.
  };

  // const editFolder = (id: IdType, { name, files }: Partial<Folder>
  const editFolder = () => {
    // handle edit folder.
  };

  // const deleteFolder = (id: IdType)
  const deleteFolder = () => {
    // handle delete here.
  };

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
    isPaginated: false,
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

  const [mode, setMode] = useState<string>("table");

  return (
    <FileContext.Provider
      value={{
        openUpload,
        handleUploadedFiles,
        setOpenUpload,
        createFolder,
        editFolder,
        deleteFolder,
        openFolderDialog,
        setOpenFolderDialog,
      }}
    >
      <PageContent
        title="File Manager"
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
        <div className="w-full mt-8 flex flex-wrap gap-4 md:flex-no-wrap items-center justify-between">
          <div className="flex  w-full items-center gap-4">
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

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-4 items-center">
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

            <div className="flex items-center gap-1 justify-end">
              <button
                onClick={() => {
                  setMode("table");
                }}
                className={cn("p-2 rounded-md text-muted-foreground", {
                  "bg-gray-100 text-gray-700": mode == "table",
                })}
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMode("grid");
                }}
                className={cn("p-2 rounded-md text-muted-foreground", {
                  "bg-gray-100 text-gray-700": mode == "grid",
                })}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
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
          {mode == "table" ? (
            <FileTableListing table={table} columns={columns} />
          ) : (
            <FileGridListing table={table} />
          )}
        </div>
      </PageContent>
    </FileContext.Provider>
  );
}
