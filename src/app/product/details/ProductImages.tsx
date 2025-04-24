import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import useSliderPagination from "@/hooks/use-slider-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImages({ product }: { product: any }) {
  const [initialSlide] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);

  const swiperRef = useRef<any>(null);
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const pagination = useSliderPagination({
    itemsPerView: 5,
    onSelect: (index: number) => {
      if (swiperRef.current) swiperRef.current.slideTo(index);
    },
    loop: false,
  });

  return (
    <div className="">
      <div className="relative">
        <div className="absolute bottom-4 right-4 z-50 text-white bg-gray-900/50 flex items-center gap-2 p-1 rounded-xl">
          <button onClick={handlePrev} className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span onClick={handleNext} className="font-semibold">
            {currentSlide + 1}/{product.images.length}
          </span>
          <button className="p-2">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <Swiper
          modules={[Autoplay]}
          initialSlide={initialSlide}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          autoplay={{ delay: 500 }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiperRef.current.autoplay.stop();
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
        >
          {product.images.map((item: string, index: number) => (
            <SwiperSlide key={`carousselitem${index}`} className="w-full">
              <div className="flex items-center justify-center w-full">
                <img src={item} className="rounded-3xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <footer className="mt-4 px-8 w-full flex items-center justify-center">
        <div className="w-full mx-auto  overflow-x-hidden h-[120px]">
          <div id="slider-pagination" className="flex relative w-full">
            {product.images.map((item: string, index: number) => (
              <div
                key={`slider-item-${index}`}
                data-index={index}
                style={{ height: `${pagination.itemWidth - 16}px` }}
                className={cn(pagination.itemClassName, "h-auto px-[8px]")}
              >
                <div
                  onClick={pagination.handleClick}
                  className={cn("bg-cover w-full h-full rounded-2xl", {
                    "opacity-50": !pagination.isActive(index),
                    "border-2 border-sky-400": pagination.isActive(index),
                  })}
                  style={{ backgroundImage: `url(${item})` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
