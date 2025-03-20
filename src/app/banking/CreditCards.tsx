"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import clsx from "clsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, Eye, EyeClosed, Trash } from "lucide-react";
import { formatDollars } from "@/lib/utils";

const cards = [
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
];

export default function CreditCards() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const [showBalance, setShowBalance] = useState<Record<number, boolean>>({});
  return (
    <div className="mb-12">
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="h-full">
          {cards.map((item, index) => (
            <CarouselItem key={`creditcard${index}`} className="h-full">
              <div className="p-8 bg-gradient-to-r from-[#191F2F] to-[#333D3A] bg-cover rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <p className="text-gray-300 text-sm">Current Balance</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="w-4 h-4 text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
                <div className="flex items-center gap-3 mt-2">
                  <p className="font-bold text-3xl">
                    {showBalance[index] ? (
                      <span> {formatDollars(item.currentBalance)}</span>
                    ) : (
                      <span>
                        {item.currentBalance
                          .toString()
                          .split("")
                          .map(() => "*")
                          .join("")}
                      </span>
                    )}
                  </p>
                  <button
                    className="text-gray-300"
                    onClick={() => {
                      setShowBalance((prev) => ({
                        ...prev,
                        [index]: !showBalance[index],
                      }));
                    }}
                  >
                    {showBalance[index] ? <EyeClosed /> : <Eye />}
                  </button>
                </div>

                <div className="flex items-center justify-end gap-4 mt-8">
                  <div className="h-6 w-10 rounded bg-white flex items-center justify-center">
                    <img
                      src={item.typeLogo}
                      alt={item.type}
                      className="h-4 w-auto"
                    />
                  </div>
                  <div className="text-xl font-semibold flex items-center gap-2">
                    {Array.from({ length: 4 })
                      .map((_, index) => {
                        const str = item.cardNumber
                          .toString()
                          .slice(index, index + 4);
                        if (index != 3)
                          return str
                            .split("")
                            .map(() => "*")
                            .join("");
                        else return str;
                      })
                      .map((item, index) => (
                        <span key={`cardnumber${index}`}>{item}</span>
                      ))}
                  </div>
                </div>
                <div className="flex items-center mt-8 gap-6">
                  <div>
                    <p className="text-gray-300 text-sm">Card Holder</p>
                    <p className="text-lg font-semibold">{item.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Expiration date</p>
                    <p className="text-lg font-semibold">{item.expiration}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-8 right-8 flex gap-2">
          {cards.map((item, index) => (
            <div
              key={`carouselitemdot${index}`}
              onClick={() => {
                console.log("set current");
                if (api) setCurrent(api.selectedScrollSnap());
              }}
              className={clsx("w-3 h-3 rounded-full ", {
                "bg-green-600": index == current,
                "bg-green-800/50": index != current,
              })}
            ></div>
          ))}
        </div>
        <div className="absolute w-full h-12 ">
          <div className="w-[90%] bg-gray-300 mx-auto h-2 rounded-b-full"></div>
          <div className="w-[80%] bg-gray-200 mx-auto h-2 rounded-b-full"></div>
        </div>
      </Carousel>
    </div>
  );
}
