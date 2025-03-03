"use client";
import { Check, Plus, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, Trash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCardDialog from "./AddPaymentMethodDialog";
import { useAccount } from "./AccountContext";

const creditCards = [
  {
    type: "visa",
    currentBalance: 10200,
    cardHolder: "Afrika Kemi",
    expiration: "11/25",
    cardNumber: "4111111111111111",
    typeLogo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  },

  {
    type: "mastercard",
    currentBalance: 50000,
    cardHolder: "Afrika Kemi",
    expiration: "12/25",
    cardNumber: "4312324595843214",
    typeLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
  },
  {
    type: "visa",
    currentBalance: 10200,
    cardHolder: "Afrika Kemi",
    expiration: "11/25",
    cardNumber: "4111111111116579",
    typeLogo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  },
];

export default function AccountPaymentMethod() {
  const { addPaymentMethodDialog, defaultPaymentMethod } = useAccount();

  return (
    <Card className="rounded-xl shadow bg-white mt-8">
      <AddCardDialog />

      <CardHeader>
        <CardTitle
          label="Payment method"
          action={
            <>
              <button
                onClick={() => {
                  addPaymentMethodDialog.open();
                }}
                className="text-primary inline-flex items-center font-bold gap-2"
              >
                <Plus className="w-5 h-5" /> New Card
              </button>
            </>
          }
        />
      </CardHeader>

      <CardContent className="px-6 pb-6 grid grid-cols-2 gap-4 pt-4">
        {creditCards.map((item, index) => (
          <div
            key={`creditcard${index}`}
            className="p-4 border rounded-xl relative"
          >
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {}}>
                    <Star />
                    <span>Set as primary</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <Edit2 />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100"
                  >
                    <Trash className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-6 w-10 rounded bg-white flex items-center justify-center">
                <img
                  src={item.typeLogo}
                  alt={item.type}
                  className="h-8 w-auto"
                />
              </div>
              {defaultPaymentMethod.cardNumber == item.cardNumber && (
                <div className=" flex items-center gap-1.5 bg-sky-100 text-sky-600 rounded-lg text-sm px-2 font-semibold py-1">
                  Default
                </div>
              )}
            </div>

            <div className="text-xl font-medium flex items-center gap-2 mt-4 text-gray-600">
              {Array.from({ length: 4 })
                .map((_, i) => {
                  const str = item.cardNumber
                    .toString()
                    .slice(i * 4, i * 4 + 4);
                  if (i != 3)
                    return str
                      .split("")
                      .map(() => "*")
                      .join("");
                  else return str;
                })
                .map((item, i) => (
                  <span key={`cardnumber${i}`}>{item}</span>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
