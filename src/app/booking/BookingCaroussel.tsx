"use client";

import { bookings } from "@/api-call/endpoints/booking";
import { formatDollars } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Users } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { useRef } from "react";

export default function BookingCaroussel() {
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

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="mb-6">
          <h3 className="font-semibold text-2xl"> Newest booking</h3>
          <h4 className="text-muted-foreground">8 bookings</h4>
        </div>

        <button
          onClick={handlePrev}
          className=" absolute right-12 top-4 z-20 text-light"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className=" absolute right-4 top-4">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {bookings.map((item, index) => (
          <SwiperSlide style={{ width: "300px" }}>
            <div className="bg-gray-200 p-2 rounded-xl">
              <div className="p-2">
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full bg-cover w-12 h-12"
                    style={{ backgroundImage: `url(${item.avatar})` }}
                  ></div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(item.startDate, "dd MMM yyy HH:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span> 3 days 2 nights</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span> 3 days 2 nights</span>
                  </div>
                </div>
              </div>

              <div
                className="relative w-full h-64 bg-cover rounded-xl"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute bottom-4 right-4 bg-gray-900  text-white rounded-lg px-2 py-0.5">
                  {formatDollars(item.price)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
