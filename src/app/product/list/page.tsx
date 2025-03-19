"use client";

import { FileUp } from "lucide-react";

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
import { useSimpleForm } from "@/hooks/use-simple-form";
import DropdownCheckboxes from "@/components/common/form/DropdownCheckboxes";
import { fetchProductsByFilters } from "@/api-call/endpoints/products";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import ProductColumnVisibility from "./ProductColumnVisibility";
import ProductExtraFilters from "./ProductExtraFilters";
import { createColumns } from "./columns";

export default function ProductsListPage() {
  const [items, setItems] = useState<Product[]>([]);
  const columns = createColumns({
    startEditItem,
    startDeleteItem,
    filterColumn,
    manageColumn,
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

  // This is use to trigger filter popover or visibility management popover.
  const [action, setAction] = useState<{ type: string; column: any }>({
    type: "",
    column: undefined,
  });

  useEffect(() => {
    fetchProductsByFilters(filters).then((results: any[]) => setItems(results));
  }, [filters]);

  function startEditItem(item: Product) {}
  function startDeleteItem(item: Product) {}

  function filterColumn(column: any) {
    setAction({ type: "filter", column });
  }
  function manageColumn(column: any) {
    setAction({ type: "manage", column });
  }

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
      title="List"
      links={{ User: "#", List: "#" }}
      className="max-w-6xl pb-4"
    >
      <div className="shadow rounded-lg mt-12">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4  mt-6">
            <DropdownCheckboxes
              label="Stock"
              className="w-full md:w-[200px] shrink-0"
              options={[
                {
                  label: "In stock",
                  value: "In stock",
                },
                {
                  label: "Low stock",
                  value: "Low stock",
                },
                {
                  label: "Out of stock",
                  value: "Out of Stock",
                },
              ]}
              name="stock"
              values={form.values.stock}
              onValuesChange={(values) => {
                form.setValue("stock", values);
              }}
              action={
                <Button
                  onClick={() => {
                    setFilterValue(
                      "stock",
                      form.values.stock == 0 ? undefined : form.values.stock
                    );
                  }}
                  variant="outline"
                  className="w-full mt-3"
                >
                  Apply
                </Button>
              }
            />

            <DropdownCheckboxes
              label="Publish"
              className="w-full md:w-[200px] shrink-0"
              options={[
                {
                  label: "Published",
                  value: "Published",
                },
                {
                  label: "Draft",
                  value: "Draft",
                },
              ]}
              name="status"
              values={form.values.status}
              onValuesChange={(values) => {
                form.setValue("status", values);
              }}
              action={
                <Button
                  onClick={() => {
                    setFilterValue(
                      "status",
                      form.values.status == 0 ? undefined : form.values.status
                    );
                  }}
                  variant="outline"
                  className="w-full mt-3"
                >
                  Apply
                </Button>
              }
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

          <div className="flex items-center gap-4 font-bold mt-4 md:mt-0 px-4 md:px-0">
            <ProductColumnVisibility table={table} action={action} />

            <ProductExtraFilters table={table} action={action} />

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-1">
                <FileUp className="w-4 h-4" />
                Exporter
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {}}>
                  Download as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>Print </DropdownMenuItem>
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
