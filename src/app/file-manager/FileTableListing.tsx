import SimpleTable from "@/components/common/table/SimpleTable";
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export default function FileTableListing({
  table,
  columns,
}: {
  table: any;
  columns: any;
}) {
  return (
    <SimpleTable
      tableClassName="border-separate [border-spacing:0_1rem]"
      className="border-none"
      table={table}
      columns={columns}
      onDeleteSelected={() => {
        // handle onDeleteSelected
      }}
      header={
        <TableHeader className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any, index: number) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn({
                      "rounded-l-xl border-l ": index == 0,
                      "rounded-r-xl border-r":
                        index == headerGroup.headers.length - 1,
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
      }
      renderRows={({ rows, dense }: any) => (
        <>
          {rows.map((row: any) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="rounded-2xl border-b"
            >
              {row.getVisibleCells().map((cell: any, index: number) => (
                <TableCell
                  key={cell.id}
                  className={cn("border-t border-b text-gray-800", {
                    "py-2": dense,
                    "py-4": !dense,
                    "rounded-l-xl border-l ": index == 0,
                    "rounded-r-xl border-r":
                      index == row.getVisibleCells().length - 1,
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </>
      )}
    />
  );
}
