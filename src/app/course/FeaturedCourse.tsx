"use client";

import { formatDollars } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Introduction to  Python programming",
    pricePerYer: 83.56,
    duration: 120,
    students: 450,
    image: "/assets/images/courses/course-1.jpg",
  },
  {
    title: "Introduction to  Python programming",
    pricePerYer: 83.56,
    duration: 120,
    students: 450,
    image: "/assets/images/courses/course-2.jpg",
  },
  {
    title: "Introduction to  Python programming",
    pricePerYer: 83.56,
    duration: 120,
    students: 450,
    image: "/assets/images/courses/course-3.jpg",
  },
  {
    title: "Introduction to  Python programming",
    pricePerYer: 83.56,
    duration: 120,
    students: 450,
    image: "/assets/images/courses/course-4.jpg",
  },
  {
    title: "Introduction to  Python programming",
    pricePerYer: 83.56,
    duration: 120,
    students: 450,
    image: "/assets/images/courses/course-5.jpg",
  },
];

export default function FeaturedCourse() {
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    if (hours == 0) return `${min} minutes`;
    if (min == 0) return `${hours}h`;
    return `${hours}h ${min}m`;
  };

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="mb-6">
          <h3 className="font-semibold text-2xl"> FeatureCourse</h3>
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
        {courses.map((item, index: number) => (
          <SwiperSlide key={`course-item-${index}`} style={{ width: "320px" }}>
            <div className="shadow  p-2 rounded-xl">
              <div
                className="relative w-full h-64 bg-cover rounded-xl"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="px-2">
                <div className="flex gap-4 text-gray-600 mt-4">
                  <div className="bg-gray-200 rounded-lg px-2 py-1 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(item.duration)}</span>
                  </div>
                  <div className="bg-gray-200 rounded-lg px-2 py-1 text-sm flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{item.students}</span>
                  </div>
                </div>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <div className="mt-8 flex justify-between">
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-xl">
                      {formatDollars(item.pricePerYer)}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 ml-1">
                      / Year
                    </span>
                  </div>
                  <div>
                    <Button variant="dark"> Join</Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
