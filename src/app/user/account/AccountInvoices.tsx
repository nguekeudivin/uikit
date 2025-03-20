"use client";

import { formatDollars } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

const invoices = [
  {
    invoiceNumber: "INV-1990",
    date: "2025-03-03T00:00:00Z",
    amount: 83.74,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1991",
    date: "2025-03-02T00:00:00Z",
    amount: 97.14,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1992",
    date: "2025-03-01T00:00:00Z",
    amount: 68.71,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1993",
    date: "2025-02-28T00:00:00Z",
    amount: 85.21,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1994",
    date: "2025-02-27T00:00:00Z",
    amount: 52.17,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1995",
    date: "2025-02-26T00:00:00Z",
    amount: 25.18,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1996",
    date: "2025-02-25T00:00:00Z",
    amount: 43.84,
    format: "PDF",
  },
  {
    invoiceNumber: "INV-1997",
    date: "2025-02-24T00:00:00Z",
    amount: 60.98,
    format: "PDF",
  },
];

export default function AccountInvoices() {
  return (
    <Card className="rounded-xl shadow bg-white">
      <CardHeader>
        <CardTitle label="Invoice history" action={undefined} />
      </CardHeader>

      <CardContent className="px-6">
        <ul className="space-y-4 mt-4">
          {invoices.map((item, index) => (
            <li
              key={`invoices${index}`}
              className="flex items-center justify-between"
            >
              <div>
                <p>{item.invoiceNumber}</p>
                <p className="text-muted-foreground">
                  {format(item.date, "dd MMM yyy")}
                </p>
              </div>
              <div className="flex">
                <p>{formatDollars(item.amount)}</p>
                <a href="#" className="underline ml-8">
                  PDF
                </a>
              </div>
            </li>
          ))}
        </ul>

        <CardFooter className="mt-4 w-full px-0 py-3  border-dashed">
          <button className="inline-flex items-center gap-2 font-medium">
            <ChevronDown className="w-4 h-4" /> Show more
          </button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
