import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

export default function EcommerceCaroussel() {
  const swiperRef = useRef<any>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        initialSlide={currentSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="h-64 md:h-full"
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={`carousselitem${index}`}>
            <div
              style={{ backgroundImage: `url(${item.image})` }}
              className="w-full h-full bg-cover rounded-xl"
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-6 z-40 right-6 flex gap-2">
        {carouselItems.map((item, index) => (
          <div
            key={`carouselitemdot${index}`}
            onClick={() => {
              swiperRef.current.slideTo(index);
            }}
            className={cn("w-3 h-3 rounded-full ", {
              "bg-green-600": index == currentSlide,
              "bg-green-800/50": index != currentSlide,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
}
