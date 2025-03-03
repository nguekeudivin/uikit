import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";
import { colors } from "@/lib/colors";

import { formatDollars, hexToRGBA } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const data = [
  {
    seller: "Jayvion Simon",
    product: "CAP",
    country: "de",
    total: 83.74,
    rank: "Top 1",
  },
  {
    seller: "Lucian Obrien",
    product: "Branded shoes",
    country: "gb",
    total: 97.14,
    rank: "Top 2",
  },
  {
    seller: "Deja Brady",
    product: "Headphone",
    country: "fr",
    total: 68.71,
    rank: "Top 3",
  },
  {
    seller: "Harrison Stein",
    product: "Cell phone",
    country: "kr",
    total: 85.21,
    rank: "Top 4",
  },
  {
    seller: "Reece Chung",
    product: "Earings",
    country: "us",
    total: 52.17,
    rank: "Top 5",
  },
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "seller",
    header: "Seller",
  },
  {
    accessorKey: "product",
    header: "Product",
  },

  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const country = row.getValue("country");
      return (
        <img
          src={`https://flagcdn.com/w80/${country}.png`}
          width={20}
          height={30}
          alt={country as string}
        />
      );
    },
  },

  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total");
      return <>{formatDollars(total as number)}</>;
    },
  },

  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      return (
        <div
          className="px-2 py-1 text-sm rounded-xl inline-block"
          style={{
            backgroundColor: hexToRGBA(colors[row.index], 0.1),
            color: colors[row.index],
          }}
        >
          {row.getValue("rank")}
        </div>
      );
    },
  },
];

export default function BestSaleman() {
  return (
    <Card>
      <CardHeader>
        <CardTitle label="Best Saleman" action={undefined} />
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
