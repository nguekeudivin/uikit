"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { useRef } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MdStar, MdStarOutline } from "react-icons/md";

const reviews = [
  {
    name: "Jayvion Simon",
    date: "2025-02-24T12:17:00Z",
    avatar: "/assets/images/avatar/avatar-1.webp",
    tags: ["Great service", "Recommended", "Good price"],
  },
  {
    name: "Lucian Obrien",
    date: "2025-02-23T11:17:00Z",
    avatar: "/assets/images/avatar/avatar-2.webp",
    tags: ["Great service", "Recommended", "Best price"],
  },
  {
    name: "Deja Brady",
    date: "2025-02-23T11:17:00Z",
    avatar: "/assets/images/avatar/avatar-2.webp",
    tags: ["Great service", "Good price"],
  },
];

export default function CustomerReviews() {
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
    <Card>
      <CardHeader>
        <CardTitle
          label="Customer review"
          action={
            <div>
              <button onClick={handlePrev} className="text-muted-foreground">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="text-muted-foreground">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          }
        />
        <h4 className="text-muted-foreground">5 Reviews</h4>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <Swiper
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={`reviewsslide${index}`}>
              <div className="flex items-center gap-4">
                <div
                  className="rounded-full bg-cover w-12 h-12"
                  style={{ backgroundImage: `url(${item.avatar})` }}
                ></div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(item.date, "dd MMM yyy HH:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4 text-muted-foreground">
                {[1, 2, 3, 4, 5].map((item) => (
                  <span key={`reviewstart${item}${index}`}>
                    {item < 4 ? (
                      <MdStar className="text-yellow-500 w-5 h-5" />
                    ) : (
                      <MdStarOutline className="w-5 h-5" />
                    )}
                  </span>
                ))}
              </div>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium ea id molestiae qui dolor praesentium rem, optio quis
                tenetur excepturi aperiam perferendis velit odio animi fuga
                expedita quibusdam dolorem? At.
              </p>
              <div className="flex  gap-4 mt-4">
                {item.tags.map((tag, index) => (
                  <div
                    key={`customerreviewtag${index}`}
                    className="bg-gray-100 text-sm px-2 py-1 rounded-xl"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center gap-4 mt-8">
          <Button variant="lightRed" className="w-full">
            Reject
          </Button>
          <Button variant="dark" className="w-full">
            Accept
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
