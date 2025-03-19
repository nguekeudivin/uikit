"use client";

import { Button } from "@/components/ui/button";
import StatisticsWithCurves from "@/components/statistics/StatisticsWithCurves";
import { SalesByGenders } from "./SalesByGenders";
import { YearlySales } from "./YearlySales";
import SaleOverview from "./SaleOverview";
import CurrentBalance from "./CurrentBalance";
import BestSaleman from "./BestSaleman";
import LastProducts from "./LastProducts";
import EcommerceCaroussel from "./EcommerceCaroussel";

export default function Home() {
  return (
    <div className="px-8 pt-4 pb-24">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-xl col-span-1 md:col-span-2"
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

        <EcommerceCaroussel />
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
