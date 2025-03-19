"use client";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { CurrentVisits } from "./CurrentVisits";
import { WebsiteVisits } from "./WebsiteVisits";

import StatisticsColored from "@/components/statistics/StatisticsColored";
import ConversionRates from "./ConversionRates";
import CurrentSubject from "./CurrentSubject";
import News from "./News";
import OrderTimeline from "./OrderTimeline";
import TraficBySite from "./TraficBySite";
import AnalyticsTasks from "./AnalyticsTasks";

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
    <div className="px-8 pt-2 pb-24">
      <h2 className="text-3xl font-semibold"> Welcome back 👋</h2>

      <section className="mt-6">
        <StatisticsColored />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1">
          <div>
            <CurrentVisits />
          </div>
        </aside>
        <aside className="col-span-1 md:col-span-2">
          <WebsiteVisits />
        </aside>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
        <aside className="col-span-1 md:col-span-2">
          <div>
            <ConversionRates />
          </div>
        </aside>
        <aside className="col-span-1">
          <div>
            <CurrentSubject />
          </div>
        </aside>
        <aside className="col-span-1 md:col-span-2">
          <div>
            <News />
          </div>
        </aside>
        <aside className="col-span-1">
          <div>
            <OrderTimeline />
          </div>
        </aside>
        <aside>
          <div>
            <TraficBySite />
          </div>
        </aside>
        <aside className="col-span-1 md:col-span-2">
          <div>
            <AnalyticsTasks />
          </div>
        </aside>
      </section>
    </div>
  );
}
