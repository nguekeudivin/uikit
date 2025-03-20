import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
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

export default function ApplicationCarousel() {
  const swiperRef = useRef<any>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
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

  return (
    <div className="relative">
      <div className="right-6 top-2 absolute z-40">
        <button onClick={handlePrev} className="p-2 rounded-full text-gray-200">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className="p-2 rounded-full text-gray-200">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

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
              <div className="bg-gray-900/80 h-full rounded-xl relative">
                <div className="absolute bottom-4 p-4">
                  <h3 className="text-lg text-green-500  uppercase">
                    {item.label}
                  </h3>
                  <h3 className="text-xl text-white">{item.title}</h3>
                  <h4 className="mt-2 text-sm text-gray-300">
                    {item.description}
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-6 z-40 left-6 flex gap-2">
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
