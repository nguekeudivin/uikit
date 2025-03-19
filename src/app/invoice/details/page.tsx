"use client";

import { SelectField } from "@/components/common/form/SelectField";
import PageContent from "@/components/common/PageContent";
import {
  CloudDownload,
  Eye,
  Pencil,
  Printer,
  Send,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBackground, getColor } from "@/lib/colors";
import { format } from "date-fns";
import { formatDollars } from "@/lib/utils";

export default function InvoiceDetailsPage() {
  const invoice = {
    invoiceNumber: "INV-99",
    status: "Paid",
    createDate: new Date(2025, 2, 17), // March 17, 2025
    dueDate: new Date(2025, 3, 2), // April 2, 2025/ This will be validated as a required field
    shipping: 52.17,
    taxes: 85.21,
    discount: 68.71,
    from: {
      name: "Jayvion Simon",
      address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
      phone: "+1 202-555-0143",
    },
    to: {
      name: "Lucian Obrien",
      address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
      phone: "+1 416-555-0198",
    },
    items: [
      {
        title: "Urban Explorer Sneakers",
        description:
          "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
        service: "Technology",
        quantity: 11,
        price: 83.74,
        total: 11 * 83.74,
        errors: {},
      },
      {
        title: "Classic Leather Loafers",
        description:
          "She eagerly opened the gift, her eyes sparkling with excitement.",
        service: "Health and Wellness",
        quantity: 10,
        price: 97.14,
        total: 10 * 97.14,
        errors: {},
      },
      {
        title: "Mountain Trekking Boots",
        description:
          "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
        service: "Travel",
        quantity: 10,
        price: 68.71,
        total: 7 * 68.71,
        errors: {},
      },
    ],
  };

  const getSubtotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const getTotal = () => {
    return (
      getSubtotal() -
      invoice.shipping -
      invoice.discount +
      (invoice.taxes * getSubtotal()) / 100
    );
  };

  const [status, setStatus] = useState<string>("Paid");
  const router = useRouter();

  const actions = [
    {
      icon: Pencil,
      text: "Edit",
      action: () => {
        router.push("/invoice/edit");
      },
    },
    {
      icon: Eye,
      text: "View",
      action: () => {
        window.print();
      },
    },
    {
      icon: CloudDownload,
      text: "Download",
      action: () => {
        // Print it
        window.print();
      },
    },
    {
      icon: Printer,
      text: "Print",
      action: () => {
        // Print it
      },
    },
    {
      icon: Send,
      text: "send",
      action: () => {
        // Print it
      },
    },
    {
      icon: Share2,
      text: "Share",
      action: () => {
        // Print it
      },
    },
  ];

  return (
    <>
      <div className="no-print">
        <PageContent
          title={invoice.invoiceNumber}
          links={{ Invoice: "/invoice/list", [invoice.invoiceNumber]: "#" }}
          className="max-w-6xl mx-auto"
        >
          <header className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              {actions.map((item, index) => (
                <div key={`action-${index}`}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            item.action();
                          }}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <item.icon className="w-5 h-5 text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{item.text}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>

            <div>
              <SelectField
                label="Status"
                name="status"
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
              >
                {["Paid", "Pending", "Overdue", "Draft"].map((item, index) => (
                  <option key={`form-status-${index}`} value={item}>
                    {item}
                  </option>
                ))}
              </SelectField>
            </div>
          </header>
        </PageContent>
      </div>

      <section className=" max-w-6xl mx-auto mt-8 px-8 py-6  shadow rounded-xl mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl text-green-600 font-black">M</h2>
          <div>
            <div
              className="px-2 py-1 float-right rounded-md inline-block font-bold text-sm"
              style={{
                backgroundColor: getBackground(status),
                color: getColor(status),
              }}
            >
              {status}
            </div>
            <h3 className="text-2xl mt-2 font-semibold">
              {invoice.invoiceNumber}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <aside>
            <h3 className="font-semibold">Invoice from</h3>
            <div className="text-gray-700">
              <p>{invoice.from.name}</p>
              <p>{invoice.from.address}</p>
              <p>{invoice.from.phone}</p>
            </div>
          </aside>
          <aside>
            <h3 className="font-semibold">Invoice to</h3>
            <div className="text-gray-700">
              <p>{invoice.to.name}</p>
              <p>{invoice.to.address}</p>
              <p>{invoice.to.phone}</p>
            </div>
          </aside>
          <aside>
            <h3 className="font-semibold">Date create</h3>
            <p className="text-gray-700">
              {format(invoice.createDate, "dd MMM yyyy")}
            </p>
          </aside>
          <aside>
            <h3 className="font-semibold">Due date</h3>
            <p className="text-gray-700">
              {format(invoice.dueDate, "dd MMM yyyy")}
            </p>
          </aside>
        </div>

        <div className=" overflow-x-auto">
          <table className="w-full mt-8">
            <thead>
              <tr className="bg-gray-100 font-medium text-gray-500 text-left">
                <th className="py-4 px-4">#</th>
                <th className="px-4">Description</th>
                <th className="px-4">Qty</th>
                <th className="px-4">Unit price</th>
                <th className="px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr
                  key={`invoice-item-${index}`}
                  className="border-b border-dashed "
                >
                  <td className="py-6 px-4 text-center">{index + 1}</td>
                  <td className="px-4">
                    <div>
                      <h3> {item.title}</h3>
                      <p className="text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-4">{item.quantity}</td>
                  <td className="px-4">{formatDollars(item.price)}</td>
                  <td className="px-4">
                    {formatDollars(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end">
          <table className="mt-8">
            <tbody>
              <tr>
                <td className="text-right text-muted-foreground pt-4">
                  Subtotal
                </td>
                <td className="font-semibold pl-24 text-right">
                  {formatDollars(getSubtotal())}
                </td>
              </tr>
              <tr>
                <td className="text-right text-muted-foreground pt-4">
                  Shipping
                </td>
                <td className="font-semibold pl-24 text-red-500 text-right">
                  {formatDollars(-1 * invoice.shipping)}
                </td>
              </tr>
              <tr>
                <td className="text-right text-muted-foreground pt-4">
                  Discount
                </td>
                <td className="font-semibold pl-24 text-red-500 text-right">
                  {formatDollars(-1 * invoice.discount)}
                </td>
              </tr>
              <tr>
                <td className="text-right text-muted-foreground pt-4">Taxes</td>
                <td className="font-semibold pl-24 text-right">
                  {invoice.taxes}%
                </td>
              </tr>

              <tr className="">
                <td className="text-right font-semibold text-xl pt-4">Total</td>
                <td className="font-semibold pl-24 text-xl text-right">
                  {formatDollars(getTotal())}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer className="border-t border-dashed mt-8 pt-4 flex items-center justify-between">
          <div>
            <p className="font-medium">NOTES</p>
            <p className="text-gray-800">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </p>
          </div>
          <div>
            <p className="font-medium">Have a question ?</p>
            <p className="text-gray-800">support@maximals.com</p>
          </div>
        </footer>
      </section>
    </>
  );
}
