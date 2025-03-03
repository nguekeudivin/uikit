"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAccount } from "./AccountContext";
import SearchField from "@/components/common/form/SearchField";
import useSearch from "@/hooks/use-search";
import { cn, hideCreditCardNumber } from "@/lib/utils";

const items = [
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

export default function PaymentMethodDialog() {
  const { paymentMethodDialog, defaultPaymentMethod, setDefaultPaymentMethod } =
    useAccount();

  const search = useSearch({
    data: items,
    predicate: (item: any, keyword: string) => {
      return (
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.address.toLowerCase().includes(keyword.toLowerCase()) ||
        item.phone.toLowerCase().includes(keyword.toLowerCase()) ||
        item.type.toLowerCase().includes(keyword.toLowerCase())
      );
    },
  });

  const selectItem = (item: any) => {
    //
    setDefaultPaymentMethod(item);
    paymentMethodDialog.close();
  };

  return (
    <Dialog
      open={paymentMethodDialog.isOpen}
      onOpenChange={() => {
        paymentMethodDialog.close();
      }}
    >
      <DialogContent className="px-0 py-6 rounded-2xl w-[400px]">
        <DialogHeader className="px-6">
          <DialogTitle className="text-xl">Address book</DialogTitle>
        </DialogHeader>
        <div className="px-4">
          <SearchField onChange={search.handleChange} className="w-full" />
        </div>
        {search.results.length > 0 ? (
          <div className="px-4 space-y-4">
            {search.results.map((item: any, index: number) => (
              <div
                onClick={() => {
                  selectItem(item);
                }}
                key={`paymentmethoddialogitem${index}`}
                className={cn(
                  "p-4 border-2 rounded-xl relative cursor-pointer",
                  {
                    "border-sky-600":
                      defaultPaymentMethod.cardNumber == item.cardNumber,
                  }
                )}
              >
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
                  {hideCreditCardNumber(item.cardNumber).map((char, i) => (
                    <span key={`cardnumber${i}`}>{char}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>{search.renderNotFound("h-[100px] border-none")}</>
        )}
      </DialogContent>
    </Dialog>
  );
}
