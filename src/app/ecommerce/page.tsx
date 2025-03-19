"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import clsx from "clsx";
import { useEffect, useState } from "react";
import StatisticsWithCurves from "@/components/statistics/StatisticsWithCurves";
import { SalesByGenders } from "./SalesByGenders";
import { YearlySales } from "./YearlySales";
import SaleOverview from "./SaleOverview";
import CurrentBalance from "./CurrentBalance";
import BestSaleman from "./BestSaleman";
import LastProducts from "./LastProducts";

const carouselItems = [
  {
    label: "New",
    title: "Simple Shoes",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/product-1.jpg",
  },
  {
    label: "New",
    title: "Mocassin",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/product-2.jpg",
  },
  {
    label: "New",
    title: "Vans",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/product-3.jpg",
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
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

  return (
    <div className="px-8 pt-4 pb-24">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-xl col-span-2"
          style={{ backgroundImage: `url(/images/image.png)` }}
        >
          <div className="bg-gray-900/90 p-8 py-12  rounded-xl flex items-center">
            <div className="flex items-center justify-between text-white">
              <div className="w-3/5">
                <h3 className="text-3xl font-semibold">
                  Congratulations 🎉 <br /> Afrika Kemi
                </h3>
                <h4 className="mt-4 text-lg text-gray-300">
                  Best seller of the month you have done 57.6% more sales today.
                </h4>
                <Button className="mt-6 text-white"> Go now </Button>
              </div>
              <div className="w-2/5"></div>
            </div>
          </div>
        </div>

        <div className="h-64 md:h-full">
          <Carousel setApi={setApi} className="h-full">
            <CarouselContent className="h-full">
              {carouselItems.map((item, index) => (
                <CarouselItem key={`carouitem${index}`} className="h-full">
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className="h-full bg-cover rounded-xl"
                  >
                    <div className="bg-gradient-to-b from-white/10 to-gray-900 h-full rounded-xl relative">
                      <div className="absolute bottom-6 p-6 pb-0">
                        <h3 className="text-gray-300 uppercase">
                          {item.label}
                        </h3>
                        <h3 className="text-xl font-semibold mt-2 text-white">
                          {item.title}
                        </h3>
                        <Button className="mt-4"> Buy now</Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-6 right-6 flex gap-2">
              {carouselItems.map((item, index) => (
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
            <CarouselNext className="top-2 right-2 text-white bg-gray-800 border-none" />
            <CarouselPrevious className="top-2 right-12 bg-gray-800 border-none text-white" />
          </Carousel>
        </div>
      </section>

      <section className="mt-8">
        <StatisticsWithCurves />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1">
          <div>
            <SalesByGenders />
          </div>
        </aside>
        <aside className="col-span-2 md:col-span-2">
          <YearlySales />
        </aside>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1 md:col-span-2">
          <div>
            <SaleOverview />
          </div>
        </aside>
        <aside className="col-span-1">
          <div>
            <CurrentBalance />
          </div>
        </aside>
        <aside className="col-span-1 md:col-span-2">
          <div>
            <BestSaleman />
          </div>
        </aside>
        <aside className="col-span-1">
          <div>
            <LastProducts />
          </div>
        </aside>
      </section>
    </div>
  );
}
