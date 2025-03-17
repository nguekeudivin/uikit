"use client";

import DateField from "@/components/common/form/DateField";
import LeadedTextField from "@/components/common/form/LeadedTextField";
import { SelectField } from "@/components/common/form/SelectField";
import TextField from "@/components/common/form/TextField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import { useSimpleForm, validateObject } from "@/hooks/use-simple-form";
import { formatDollars } from "@/lib/utils";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import CustomerDialog from "../CustomerDialog";
import { useDialog } from "@/hooks/use-dialog";
import TextAreaField from "@/components/common/form/TextAreaField";
import { services } from "@/api-call/endpoints/invoices";

export default function CreateInvoicePage() {
  const router = useRouter();

  // Create dialog.
  const fromDialog = useDialog(false);
  const toDialog = useDialog(false);

  // Customer from and to
  const [from, setFrom] = useState<any>({
    name: "Jayvion Simon",
    address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phone: "+1 202-555-0143",
  });
  const [to, setTo] = useState<any>({});

  // Form for the invoice.
  const form = useSimpleForm({
    defaultValues: {
      invoiceNumber: "INV-99",
      status: "Paid",
      createDate: undefined, // This will be validated as a required field
      dueDate: undefined, // This will be validated as a required field
      shipping: 0,
      taxes: 0,
      discount: 0,
    },
    schema: z
      .object({
        invoiceNumber: z.string().min(1, "Invoice number is required"),
        createDate: z.date({ required_error: "Create date is required" }), // Ensure createDate is a valid date and required
        dueDate: z.date({ required_error: "Due date is required" }), // Ensure dueDate is a valid date and required
      })
      .refine(
        (data) => data.dueDate > data.createDate, // Ensure dueDate is greater than createDate
        {
          message: "Due date must be greater than the create date",
          path: ["dueDate"], // Attach the error to the dueDate field
        }
      ),
  });

  // Item of the invoices
  const [items, setItems] = useState<any[]>([
    {
      title: "",
      description: "",
      service: "Technology",
      quantity: 0,
      price: 0,
      total: 0,
      errors: {}, // We bind the errors here to simplify the error management
    },
  ]);

  // Handle change for item form.
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

  // Create a new item.
  const addItem = () => {
    setItems((currents) => [
      ...currents,
      {
        title: "",
        description: "",
        service: "Technology",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    return (
      getSubtotal() -
      form.values.shipping -
      form.values.discount +
      (form.values.taxes * getSubtotal()) / 100
    );
  };

  // Valide the form.
  const submit = () => {
    // Validate first the invoice form.
    let isValid = form.check();

    // Create the schema to validate item form.
    const schema = z.object({
      title: z.string().min(1, "Title is required"), // Validate title
      description: z.string().min(1, "Description is required"),
      service: z.string().min(1, "Status is required"), // Validate status
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"), // Validate quantity
      price: z.coerce.number().min(0, "Price cannot be negative"), // Validate price
      total: z.coerce.number().min(0, "Total cannot be negative"), // Validate total
    });

    // validate each item form.
    items.forEach((item: any, index: number) => {
      const result = validateObject(item, schema);
      if (!result.valid) {
        isValid = false;
        // We update the errors of the item into the array.
        setItems((currents) =>
          currents.map((item, i) => {
            if (i == index) {
              return { ...item, errors: result.errors };
            } else {
              return item;
            }
          })
        );
      } else {
        // So set the errors of the item into the array to null.
        setItems((currents) =>
          currents.map((item, i) => {
            if (i == index) {
              return { ...item, errors: {} };
            } else {
              return item;
            }
          })
        );
      }
    });

    // If the whole is valid.
    if (isValid) {
      router.push("/invoice/list");
    } else {
    }
  };

  return (
    <PageContent
      title="Create a new invoice"
      links={{ Invoice: "/invoice/list", "New invoice": "#" }}
      className="max-w-6xl mx-auto mb-24"
    >
      <CustomerDialog
        dialog={fromDialog}
        customer={from}
        setCustomer={setFrom}
      />
      <CustomerDialog dialog={toDialog} customer={to} setCustomer={setTo} />

      <div className="shadow-xl rounded-xl  mt-8">
        <div className="grid grid-cols-2 pb-6 p-6">
          <aside className="border-r">
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="text-xl font-normal">From:</div>
              <Button
                onClick={() => {
                  fromDialog.open();
                }}
                variant="ghost"
              >
                {from.name != undefined ? <Pencil /> : <Plus />}
              </Button>
            </div>
            {from.name != undefined && (
              <>
                <h4 className="font-normal">{from.name}</h4>
                <p className="text-muted-foreground">{from.address}</p>
                <p className="text-muted-foreground">{from.phone}</p>
              </>
            )}
          </aside>

          <aside className="pl-6">
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="text-xl font-normal">To:</div>
              <Button
                onClick={() => {
                  toDialog.open();
                }}
                variant="ghost"
              >
                {to.name != undefined ? <Pencil /> : <Plus />}
              </Button>
            </div>
            {to.name != undefined && (
              <>
                <h4 className="font-normal">{to.name}</h4>
                <p className="text-muted-foreground">{to.address}</p>
                <p className="text-muted-foreground">{to.phone}</p>
              </>
            )}
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
            error={form.errors.invoiceNumber}
          />
          <SelectField
            label="Status"
            name="status"
            value={form.values.status}
            onChange={form.handleChange}
            bgColor="bg-gray-100"
            error={form.errors.status}
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
            error={form.errors.createDate}
          />
          <DateField
            className="w-full"
            name="dueDate"
            label="Due Date"
            onValueChange={(date) => {
              form.setValue("dueDate", date);
            }}
            bgColor="bg-gray-100"
            error={form.errors.dueDate}
          />
        </div>
        <aside className="border-r p-8">
          <div className="text-xl font-normal text-muted-foreground">
            Details:
          </div>
          {items.map((_: any, index) => (
            <div
              key={`invoice-item-form-${index}`}
              className="mt-4 border-b py-4 border-dashed"
            >
              <div className="flex gap-4 bg-white">
                <TextField
                  name="title"
                  label="Title"
                  placeholder=""
                  value={items[index].title}
                  onChange={(e) => handleChange(e, index)}
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  error={items[index].errors.title}
                  className="w-[25%]"
                />
                <TextAreaField
                  name="description"
                  label="Description"
                  placeholder=""
                  value={items[index].description}
                  onChange={(e) => handleChange(e, index)}
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  error={items[index].errors.description}
                  className="w-[25%]"
                />
                <SelectField
                  label="Service"
                  name="service"
                  value={items[index].service}
                  onChange={(e) => handleChange(e, index)}
                  inputClassName="h-10"
                  error={items[index].errors.service}
                  className="w-[15%]"
                >
                  {services.map((item, i) => (
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
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  error={items[index].errors.quantity}
                  className="w-[8%]"
                />
                <LeadedTextField
                  placeholder="0.0"
                  name="price"
                  value={items[index].price}
                  onChange={(e) => handleChange(e, index)}
                  label="Price"
                  leading="$"
                  inputClassName="h-10"
                  type="number"
                  error={items[index].errors.price}
                  className="w-[9%]"
                />
                <LeadedTextField
                  placeholder="0.0"
                  name="total"
                  value={items[index].price * items[index].quantity}
                  onChange={(e) => handleChange(e, index)}
                  label="Total"
                  leading="$"
                  type="number"
                  error={form.errors.total}
                  inputClassName="h-10"
                  disabled={true}
                  className="w-[9%]"
                />
              </div>
              <div className="flex items-center justify-end mt-2">
                <Button
                  onClick={() => {
                    setItems((currents) =>
                      currents.filter((_, i) => i != index)
                    );
                  }}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-red-50 font-normal"
                >
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
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  type="number"
                />
              </div>

              <div className="w-36">
                <TextField
                  name="discount"
                  label="Discount($)"
                  placeholder=""
                  value={form.values.discount}
                  onChange={form.handleChange}
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  type="number"
                />
              </div>

              <div className="w-36">
                <TextField
                  name="taxes"
                  label="taxes(%)"
                  placeholder=""
                  value={form.values.taxes}
                  onChange={form.handleChange}
                  inputClassName="h-10"
                  floatingClassName="top-[20%]"
                  type="number"
                />
              </div>
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
                      {formatDollars(-1 * form.values.shipping)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right text-muted-foreground pt-4">
                      Discount
                    </td>
                    <td className="font-semibold pl-24 text-red-500 text-right">
                      {formatDollars(-1 * form.values.discount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right text-muted-foreground pt-4">
                      Taxes
                    </td>
                    <td className="font-semibold pl-24 text-right">
                      {form.values.taxes}%
                    </td>
                  </tr>

                  <tr className="">
                    <td className="text-right font-semibold text-xl pt-4">
                      Total
                    </td>
                    <td className="font-semibold pl-24 text-xl text-right">
                      {formatDollars(getTotal())}
                    </td>
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
        <Button onClick={submit} variant="dark">
          {" "}
          Create & Send{" "}
        </Button>
      </div>
    </PageContent>
  );
}
