"use client";

import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil, Plus, Printer } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDollars, hideCreditCardNumber } from "@/lib/utils";
import { format } from "date-fns";
import UserAvatar from "@/components/common/UserAvatar";

const historyData = [
  {
    status: "Delivery successful",
    date: "2025-03-02T09:27:00Z",
    color: "#22C55E",
  },
  {
    status: "Transporting to [2]",
    date: "2025-03-01T08:27:00Z",
  },
  {
    status: "Transporting to [1]",
    date: "2025-02-28T07:27:00Z",
  },
  {
    status: "The shipping unit has picked up the goods",
    date: "2025-02-27T06:27:00Z",
  },
  {
    status: "Order has been created",
    date: "2025-02-27T06:27:00Z",
  },
];

const historyProcess = [
  {
    event: "Order time",
    date: "2025-03-02T09:27:00Z",
  },
  {
    event: "Payment time",
    date: "2025-03-02T09:27:00Z",
  },
  {
    event: "Delivery time for the carrier",
    date: "2025-03-02T09:27:00Z",
  },
  {
    event: "Completion time",
    date: "2025-03-02T09:27:00Z",
  },
];
export default function OrderDetailsPage() {
  const order = {
    subtotal: 83.74,
    shipping: -10,
    taxes: 10,
    discount: -10,
    total: 100,
    products: [
      {
        name: "Urban Explorer Sneakers",
        image: "/images/product-1.jpg",
        price: 99.99,
        quantity: 4,
      },
      {
        name: "Mountain Trekking Boots",
        image: "/images/product-2.jpg",
        price: 129.99,
        quantity: 2,
      },
      {
        name: "City Commute Backpack",
        image: "/images/product-3.jpg",
        price: 49.99,
        quantity: 6,
      },
    ],
    user: {
      name: "Afrika Kemi",
      email: "afrikakemi@gmail.com",
      avatar: "/assets/images/avatar/avatar-1.webp",
      ip: "192.158.1.38",
    },
    paymentMethod: {
      type: "mastercard",
      currentBalance: 50000,
      cardHolder: "Afrika Kemi",
      expiration: "12/25",
      cardNumber: "4312324595843214",
      typeLogo:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
  };

  return (
    <PageContent className="max-w-6xl mx-auto mb-20">
      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-2xl">Order #6011</p>
            <p className="text-muted-foreground">02 Mar 2025 9:27 am</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="Completed">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Printer />
              Print
            </Button>
            <Button variant="dark" size="sm">
              <Pencil />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <aside className="space-y-8 md:col-span-2">
            <Card className="rounded-xl shadow-xl bg-white">
              <CardHeader>
                <CardTitle
                  label="Details"
                  action={
                    <>
                      <button
                        onClick={() => {}}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Pencil className="w-5 h-5 text-gray-500" />
                      </button>
                    </>
                  }
                />
              </CardHeader>

              <CardContent className="px-6 pb-3">
                <ul>
                  {order.products.map((item: any, index: number) => (
                    <li
                      key={`orderproduct${index}`}
                      className="flex items-center justify-between bg-white py-4 border-b border-dashed"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="bg-cover w-12 h-12 rounded-xl"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-muted-foreground">{item.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <p>x{item.quantity}</p>
                        <p className="font-sembiold">
                          {formatDollars(item.quantity * item.price)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 w-full flex items-center border-none justify-end">
                <table className="w-[250px]">
                  <tbody>
                    {[
                      {
                        label: "Subtotal",
                        content: <span>{formatDollars(order.subtotal)}</span>,
                      },
                      {
                        label: "Shipping",
                        content: (
                          <span className="text-red-500">
                            {formatDollars(order.shipping)}
                          </span>
                        ),
                      },
                      {
                        label: "Discount",
                        content: (
                          <span className="text-red-500">
                            {formatDollars(order.discount)}
                          </span>
                        ),
                      },
                      {
                        label: "Taxes",
                        content: (
                          <span className="text-red-500">
                            {formatDollars(order.taxes)}
                          </span>
                        ),
                      },
                      {
                        label: (
                          <span className="text-lg text-gray-800 font-semibold">
                            Total
                          </span>
                        ),
                        content: (
                          <span className="text-gray-800 font-semibold text-xl">
                            {formatDollars(order.total)}
                          </span>
                        ),
                      },
                    ].map((item, index) => (
                      <tr key={`orderdetailsheaderitem${index}`}>
                        <td className="text-muted-foreground flex items-center justify-end pr-20 py-2">
                          {item.label}
                        </td>
                        <td className="text-end">{item.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardFooter>
            </Card>

            <Card className="rounded-xl shadow bg-white mt-8">
              <CardHeader>
                <CardTitle
                  label="History"
                  action={
                    <>
                      <button onClick={() => {}} className="">
                        <Pencil className="w-6 h-6" />
                      </button>
                    </>
                  }
                />
              </CardHeader>

              <CardContent
                className="px-6 pb-6
              "
              >
                <div className="grid grid-cols-5 gap-4">
                  <aside className="col-span-3">
                    <ul className="space-y-4">
                      {historyData.map((item, index) => (
                        <li key={`ordertimeline${index}`} className="flex">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <div className="w-1 h-10 border-l-2 border-gray-300"></div>
                          </div>
                          <div className="ml-2 -mt-1">
                            <p className="font-medium">{item.status}</p>
                            <p className="text-muted-foreground text-sm">
                              {format(item.date, "dd MMM yyyy h:mm a")}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <aside className="col-span-2">
                    <ul className="border border-dashed p-4 rounded-xl space-y-4">
                      {historyProcess.map((item, index) => (
                        <li key={`historyProcess${index}`}>
                          <p className="text-muted-foreground">{item.event}</p>
                          <p className="font-medium">
                            {format(item.date, "dd MMM yyyy h:mm a")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </CardContent>
            </Card>
          </aside>
          <aside>
            <div className="py-8 rounded-xl shadow">
              <article className="px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold"> Customer info</h3>
                  <button className="text-muted-foreground">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex  gap-4 mt-4">
                  <UserAvatar
                    avatar={order.user.avatar}
                    name={order.user.name}
                  />
                  <div>
                    <p>{order.user.name}</p>
                    <p className="text-muted-foreground">{order.user.email}</p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">IP Addres:</span>
                      {order.user.ip}
                    </p>
                    <button className="text-red-500 inline-flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add to Blacklist
                    </button>
                  </div>
                </div>
              </article>

              <article className="px-4 py-4 py-4 border-t border-dashed ">
                <div className="flex justify-between items-center ">
                  <h3 className="text-xl font-semibold"> Delivery</h3>
                  <button className="text-muted-foreground">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <table className="mt-4">
                  <tbody>
                    <tr className="">
                      <td className="text-muted-foreground pr-20">Ship by</td>
                      <td>DHL</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Speedy</td>
                      <td>Strandard</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Tracking No</td>
                      <td className="underline">SPX037739199373</td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article className="px-4 py-4 py-4 border-t border-dashed ">
                <div className="flex justify-between items-center ">
                  <h3 className="text-xl font-semibold"> Shipping</h3>
                  <button className="text-muted-foreground">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <table className="mt-4">
                  <tbody>
                    <tr className="">
                      <td className="text-muted-foreground pr-20">Address</td>
                      <td>
                        19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
                      </td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground">Phone number</td>
                      <td>365-374-4961</td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article className="px-4 py-4 py-4 border-t border-dashed ">
                <div className="flex justify-between items-center ">
                  <h3 className="text-xl font-semibold"> Payment</h3>
                  <button className="text-muted-foreground">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-end">
                  <div>
                    <div className="mt-4 h-6 w-10 rounded bg-white flex items-center justify-center">
                      <img
                        src={order.paymentMethod.typeLogo}
                        alt={order.paymentMethod.type}
                        className="h-8 w-auto"
                      />
                    </div>
                    <div className="font-medium flex items-center gap-2 mt-2 text-gray-600">
                      {hideCreditCardNumber(order.paymentMethod.cardNumber).map(
                        (char, i) => (
                          <span key={`orderpaymentmethodcardnumber${i}`}>
                            {char}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </div>
    </PageContent>
  );
}
