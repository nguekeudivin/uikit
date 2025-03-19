"use client";

import { cn, hideCreditCardNumber } from "@/lib/utils";
import { Check, ChevronDown, Plus, Star } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddCardDialog from "./AddPaymentMethodDialog";
import { useAccount } from "./AccountContext";
import AccountCreditCards from "./AccountPaymentMethod";
import AccountAddressBook from "./AccountAddressBook";
import AddressBookDialog from "./AddressBookDialog";
import AddAddressDialog from "./AddAddressDialog";
import PaymentMethodDialog from "./PaymentMethodDialog";
import AccountInvoices from "./AccountInvoices";

export default function AccountBilling() {
  const plans = [
    {
      name: "Basic",
      monthlyPrice: "Free",
      features: [
        "Access to free courses",
        "Community support",
        "Limited storage (5GB)",
        "Basic analytics",
      ],
    },
    {
      name: "Starter",
      monthlyPrice: 4.99,
      features: [
        "Unlimited courses",
        "Email support",
        "100GB storage",
        "Advanced analytics",
      ],
    },
    {
      name: "Premium",
      monthlyPrice: 9.99,
      features: [
        "Priority support",
        "1TB storage",
        "Custom branding",
        "Team Collaboration",
      ],
    },
  ];

  const [currentPlan, setCurrentPlan] = useState<string>("Starter");

  const {
    addressBookDialog,
    defaultAddress,
    defaultPaymentMethod,
    paymentMethodDialog,
  } = useAccount();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <aside className="md:col-span-2">
        <AddressBookDialog />
        <PaymentMethodDialog />
        <Card className="rounded-xl shadow bg-white">
          <CardHeader>
            <CardTitle label="Plan" action={undefined} />
          </CardHeader>

          <CardContent className="px-6">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {plans.map((item, index) => (
                <li
                  onClick={() => setCurrentPlan(item.name)}
                  key={`plan${index}`}
                  className={cn(
                    "p-4 border rounded-lg relative cursor-pointer",
                    {
                      "border-2 border-sky-300 bg-sky-50":
                        currentPlan == item.name,
                    }
                  )}
                >
                  {currentPlan == item.name && (
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-sky-200 text-sky-600 rounded-lg text-sm px-2 py-1">
                      <Star className="w-3 h-3" />
                      current
                    </div>
                  )}

                  <p className="text-lg text-muted-foreground ">{item.name}</p>
                  <p className="font-semibold text-3xl mt-1">
                    {item.monthlyPrice}
                  </p>
                  <ul className="mt-4">
                    {item.features.map((item, featureIndex: number) => (
                      <li
                        className="text-muted-foreground flex items-center gap-2"
                        key={`featureIndex${featureIndex}`}
                      >
                        <Check className="w-4 h-4" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <table className="mt-8">
              <tbody>
                {[
                  {
                    label: "Plan",
                    content: currentPlan,
                  },
                  {
                    label: "Billing name",
                    content: (
                      <button
                        onClick={() => {
                          addressBookDialog.open();
                        }}
                        className="text-gray-800 flex items-center gap-2 font-semibold"
                      >
                        {defaultAddress.name}
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    ),
                  },
                  {
                    label: "Billing Address",
                    content:
                      "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
                  },
                  {
                    label: "Phone number",
                    content: "+1 202-555-0143",
                  },
                  {
                    label: "Payment Method",
                    content: (
                      <button
                        onClick={() => {
                          paymentMethodDialog.open();
                        }}
                        className="text-gray-800 flex items-center gap-2 font-semibold"
                      >
                        {hideCreditCardNumber(
                          defaultPaymentMethod.cardNumber
                        ).map((char, i) => (
                          <span key={`cardnumber${i}`}>{char}</span>
                        ))}
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    ),
                  },
                ].map((item, index) => (
                  <tr key={`billingdetail${index}`}>
                    <td className="text-muted-foreground pr-6 pt-2">
                      {item.label}
                    </td>
                    <td className="text-muted-foreground">{item.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CardFooter className="mt-8 w-full flex items-center border-dashed justify-end gap-4">
              <Button variant="outline"> Cancel plan</Button>
              <Button variant="dark"> Upgrade plan</Button>
            </CardFooter>
          </CardContent>
        </Card>

        <AccountCreditCards />

        <AccountAddressBook />
      </aside>
      <aside>
        <AccountInvoices />
      </aside>
    </div>
  );
}
