"use client";

import { AreaInstalled } from "./AreaInstalled";
import { CurrentDownload } from "./CurrentDownload";
import NewInvoices from "./NewInvoices";
import { RelatedApplications } from "./RelatedApplications";
import Statistics from "@/components/statistics/StatisticsWithBar";
import TheTops from "./TheTops";
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
import ApplicationCarousel from "./ApplicationsCarousel";

const carouselItems = [
  {
    label: "Featured App",
    title: "Mental Health in the Digital Age: Navigation",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/image.png",
  },
  {
    label: "New features",
    title: "We have added new features to the application",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/image.png",
  },
  {
    label: "Bugs fixed",
    title: "We have fixed a lot of bugs present into the application",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/images/image.png",
  },
];

export default function ApplicationsPage() {
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
    <div className="px-8 pt-4">
      <section className="grid  grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-xl md:col-span-2"
          style={{ backgroundImage: `url(/images/image.png)` }}
        >
          <div className="bg-gray-900/90 p-8 py-12  rounded-xl flex items-center">
            <div className="flex items-center justify-between text-white">
              <div className="w-3/5">
                <h3 className="text-3xl font-semibold">
                  Welcome back 👋 <br /> Afrika Kemi
                </h3>
                <h4 className="mt-4 text-lg text-gray-300">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything
                </h4>
                <Button className="mt-6 text-white"> Go now </Button>
              </div>
              <div className="w-2/5"></div>
            </div>
          </div>
        </div>

        <ApplicationCarousel />
      </section>

      <section className="mt-8">
        <Statistics />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1">
          <div>
            <CurrentDownload />
          </div>
        </aside>
        <aside className="col-span-1 md:col-span-2">
          <AreaInstalled />
        </aside>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1 md:col-span-2">
          <div>
            <NewInvoices />
          </div>
        </aside>
        <aside className="col-span-1">
          <RelatedApplications />
        </aside>
      </section>

      <section className="mt-8">
        <TheTops />
      </section>
    </div>
  );
}
