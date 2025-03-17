"use client";

import DateField from "@/components/common/form/DateField";
import LeadedTextField from "@/components/common/form/LeadedTextField";
import { SelectField } from "@/components/common/form/SelectField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { formatDollars } from "@/lib/utils";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function CreateInvoicePage() {
  const from = {
    name: "Jayvion Simon",
    address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phoneNumber: "+1 202-555-0143",
  };

  const form = useSimpleForm({
    defaultValues: {
      invoiceNumber: "",
      status: "",
      createDate: undefined,
      dueDate: undefined,
    },
    schema: z.object({
      invoiceNumber: z.string().min(1, "Invoice number is required"),
    }),
  });

  const itemForm = useSimpleForm({
    defaultValues: {
      title: [""],
      description: [""],
      status: [""],
      quantity: [0],
      price: [0],
      total: [0],
    },
    schema: z.object({}),
  });

  const [items, setItems] = useState<any[]>([
    {
      title: "",
      description: "",
      status: "",
      quantity: 0,
      price: 0,
      total: 0,
    },
  ]);

  const handleChange = ({ target }: any, index: number) => {
    const value = target.value;
    const name = target.name;
    setItems((currents) =>
      currents.map((item, i) => {
        if (i == index) {
          return {
            ...item,
            [name]: value,
          };
        } else {
          return item;
        }
      })
    );
  };

  const addItem = () => {
    setItems((currents) => [
      ...currents,
      {
        title: "",
        description: "",
        status: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
  };

  return (
    <PageContent
      title="Create a new invoice"
      links={{ Invoice: "/invoice/list", "New invoice": "#" }}
      className="max-w-6xl mx-auto mb-24"
    >
      <div className="shadow-xl rounded-xl  mt-8">
        <div className="grid grid-cols-2 pb-6 p-6">
          <aside className="border-r">
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="text-xl font-normal">From:</div>
              <Button variant="ghost">
                <Pencil />
              </Button>
            </div>
            <h4 className="font-normal">{from.name}</h4>
            <p className="text-muted-foreground">{from.address}</p>
            <p className="text-muted-foreground">{from.phoneNumber}</p>
          </aside>

          <aside className="pl-6">
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="text-xl font-normal">To:</div>
              <Button variant="ghost">
                <Plus />
              </Button>
            </div>
          </aside>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 bg-gray-50 p-6">
          <TextField
            label="Invoice Number"
            name="invoiceNumber"
            placeholder="INV-999"
            value={form.values.invoiceNumber}
            onChange={form.handleChange}
            disabled={true}
            bgColor="bg-gray-100"
          />
          <SelectField
            label="Status"
            name="status"
            value={form.values.status}
            onChange={form.handleChange}
            bgColor="bg-gray-100"
          >
            {["Paid", "Pending", "Overdue", "Draft"].map((item, index) => (
              <option key={`form-status-${index}`} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
          <DateField
            className="w-full"
            name="createDate"
            label="Create Date"
            value={form.values.createDate}
            onValueChange={(date) => {
              form.setValue("createDate", date);
            }}
            bgColor="bg-gray-100"
          />
          <DateField
            className="w-full"
            name="dueDate"
            label="Due Date"
            onValueChange={(date) => {
              form.setValue("dueDate", date);
            }}
            bgColor="bg-gray-100"
          />
        </div>
        <aside className="border-r p-8">
          <div className="text-xl font-normal text-muted-foreground">
            Details:
          </div>
          {items.map((_: any, index) => (
            <div className="mt-4">
              <div className="flex items-center gap-4 bg-white">
                <TextField
                  name="title"
                  label="Title"
                  placeholder=""
                  value={items[index].title}
                  onChange={(e) => handleChange(e, index)}
                  className="h-10"
                  floatingClassName="top-[20%]"
                />
                <TextField
                  name="description"
                  label="Description"
                  placeholder=""
                  value={items[index].description}
                  onChange={(e) => handleChange(e, index)}
                  className="h-10"
                  floatingClassName="top-[20%]"
                  error={form.errors.quantity}
                />
                <SelectField
                  label="Service"
                  name="service"
                  value={items[index].service}
                  onChange={(e) => handleChange(e, index)}
                  className="h-10"
                  error={form.errors.quantity}
                >
                  {[
                    "Technology",
                    "Health and Wellness",
                    "Travel",
                    "Education",
                    "Food and Beverage",
                    "Fashion",
                    "Home and Garden",
                  ].map((item, i) => (
                    <option key={`service-${i}-${index}`} value={item}>
                      {item}
                    </option>
                  ))}
                </SelectField>
                <TextField
                  name="quantity"
                  label="Quantity"
                  value={items[index].quantity}
                  onChange={(e) => handleChange(e, index)}
                  type="number"
                  placeholder=""
                  className="h-10"
                  floatingClassName="top-[20%]"
                />
                <LeadedTextField
                  placeholder="0.0"
                  name="price"
                  value={items[index].price}
                  onChange={(e) => handleChange(e, index)}
                  label="Price"
                  leading="$"
                  error={form.errors.price}
                  className="h-10"
                />
                <LeadedTextField
                  placeholder="0.0"
                  name="total"
                  value={items[index].total}
                  onChange={(e) => handleChange(e, index)}
                  label="Total"
                  leading="$"
                  error={form.errors.total}
                  className="h-10"
                  disabled={true}
                />
              </div>
              <div className="flex items-center justify-end">
                <Button variant="ghost">
                  <Trash className="text-red-500 w-5 h-5" />
                  <span className="text-red-500">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </aside>

        <div className="my-4 border-t border-dashed"></div>

        <footer className="px-6 py-4 flex justify-between">
          <div>
            <Button
              onClick={() => {
                addItem();
              }}
              variant="ghost"
              className=" text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold"
            >
              <Plus />
              Add Item
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="w-36">
                <TextField
                  name="shipping"
                  label="Shipping($)"
                  placeholder=""
                  value={form.values.shipping}
                  onChange={form.handleChange}
                  className="h-10"
                  floatingClassName="top-[20%]"
                />
              </div>

              <div className="w-36">
                <TextField
                  name="discount"
                  label="Discount($)"
                  placeholder=""
                  value={form.values.discount}
                  onChange={form.handleChange}
                  className="h-10"
                  floatingClassName="top-[20%]"
                />
              </div>

              <div className="w-36">
                <TextField
                  name="taxes"
                  label="taxes(%)"
                  placeholder=""
                  value={form.values.taxes}
                  onChange={form.handleChange}
                  className="h-10"
                  floatingClassName="top-[20%]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <table className="mt-8">
                <tbody>
                  {Object.entries({
                    Subtotal: 502.44,
                    Shipping: 0,
                    Discount: 0,
                    Taxes: 0,
                  }).map(([label, value]) => (
                    <tr>
                      <td className="text-right text-muted-foreground pt-4">
                        {label}
                      </td>
                      <td className="font-semibold pl-24">
                        {formatDollars(value)}
                      </td>
                    </tr>
                  ))}
                  <tr className="">
                    <td className="text-right font-semibold text-xl pt-4">
                      Total
                    </td>
                    <td className="font-semibold pl-24 text-xl">502.44</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </footer>
      </div>

      <div className="flex items-center items-center justify-end mt-8 gap-2">
        <Button variant="outline" className="border-2">
          Save as Draft
        </Button>
        <Button variant="dark"> Create & Send </Button>
      </div>
    </PageContent>
  );
}
