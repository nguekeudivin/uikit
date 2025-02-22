import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function CreditCards() {
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
    <div>
      {/* <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="h-full">
          {carouselItems.map((item, index) => (
            <CarouselItem key={`carouitem${index}`} className="h-full">
              <div
                style={{ backgroundImage: `url(${item.image})` }}
                className="h-full bg-cover rounded-xl"
              >
                <div className="bg-gradient-to-b from-white/10 to-gray-900 h-full rounded-xl relative">
                  <div className="absolute bottom-6 p-6 pb-0">
                    <h3 className="text-gray-300 uppercase">{item.label}</h3>
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
      </Carousel> */}
    </div>
  );
}
