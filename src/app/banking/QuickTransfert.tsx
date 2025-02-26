"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { contacts } from "@/api-call/endpoints/contacts";
import { useEffect, useState } from "react";
import clsx from "clsx";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { formatDollars } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function QuickTransfert() {
  const balance = 10600;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [center, setCenter] = useState(3);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const c = current + 3;
    setCenter(c % count);
  }, [current, count]);

  const [amount, setAmount] = useState(500);
  const handleInput = (event: any) => {
    setAmount(event.target.value);
  };

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle label="Quick Transfert" />
      </CardHeader>
      <CardContent className="pb-6">
        <div className="px-6 mt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-muted-foreground"> RECENT </h4>
            <button className="inline-flex items-center gap-2">
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center mb-2 text-muted-foreground">
          {contacts[center]?.name}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="h-full px-10"
        >
          <CarouselContent className="h-full items-center ">
            {contacts.map((item, index) => (
              <CarouselItem
                key={`creditcard${index}`}
                className="basis-1/7 h-full "
              >
                <div
                  className={clsx(
                    "w-12 h-12 rounded-full  flex items-center justify-center"
                  )}
                >
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className={clsx(
                      "rounded-full bg-cover transition-all transtion-500",
                      {
                        "w-12 h-12": center == index,
                        "w-10 h-10": center != index,
                        //"border border-red-500": center == index,
                      }
                    )}
                  >
                    <div
                      className={clsx({
                        "w-full h-full bg-gray-300/70 rounded-full":
                          center != index,
                      })}
                    ></div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="top-2 right-2 text-white bg-gray-400 border-none w-6 h-6" />
          <CarouselPrevious className="top-2 left-2 bg-gray-400 border-none text-white w-6 h-6" />
        </Carousel>

        <div className="mt-8 px-6">
          <h4 className="text-muted-foreground"> INSERT AMOUNT </h4>
          <div
            className="flex items-center justify-center mt-4"
            onClick={() => {
              document.getElementById("priceInput")?.focus();
            }}
          >
            <div className="text-3xl font-semibold -mt-3 mr-1">$</div>
            <input
              id="priceInput"
              value={amount}
              style={{ width: amount.toString().length * 21 }}
              onChange={handleInput}
              className="text-4xl  font-semibold  inline-flex bg-transparent focus:border-none focus:outline-none"
            ></input>
          </div>

          <div className="mt-6">
            <SliderPrimitive.Root
              defaultValue={[amount]}
              value={[amount]}
              max={balance}
              step={25}
              className="relative flex w-full touch-none select-none items-center"
              onValueChange={(values) => setAmount(values[0])}
            >
              <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
                <SliderPrimitive.Range className="absolute h-full bg-primary/80" />
                <div className="absolute h-full flex items-center">
                  {Array.from({ length: Math.ceil(balance / 100) }).map(
                    (_, index) => (
                      <div
                        key={`rangestep${index}`}
                        className="border-r border-white h-full"
                        style={{ width: `${25}px` }}
                      ></div>
                    )
                  )}
                </div>
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus:outline-none" />
            </SliderPrimitive.Root>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xl font-medium">Your balance</p>
            <p className="text-2xl font-semibold  ">{formatDollars(balance)}</p>
          </div>

          <Button className="w-full mt-8"> Transfert now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
