import {
  ChevronLeft,
  ChevronRight,
  Fullscreen,
  Minimize,
  Pause,
  Play,
  X,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "./details.css";
import { cn } from "@/lib/utils";
import useSliderPagination from "@/hooks/use-slider-pagination";

interface ImageDiaporamaProps {
  images: string[];
  show: boolean;
  setShow: any;
  initialSlide: number;
}

export default function ImageDiaporama({
  images,
  show,
  setShow,
  initialSlide,
}: ImageDiaporamaProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [auto, setAuto] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
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
  });

  useEffect(() => {
    const body = document.body;
    if (body) {
      if (show) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }

    // handle pagination.
    if (show) {
      pagination.init();
    } else {
      pagination.setReady(false);
    }
  }, [show]);

  function openFullscreen() {
    const elem = document.getElementById("image-carousel") as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      // Firefox
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      // IE/Edge
      doc.msExitFullscreen();
    }
  }

  if (!show) return null;

  return (
    <div
      id="image-carousel"
      className={
        "fixed top-0 left-0 w-full h-full bg-gray-900/90  justify-center transition-opacity duration-300 opacity-0 animate-fade-in"
      }
    >
      <button
        onClick={handlePrev}
        className=" absolute left-4 top-[40%] z-20 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronLeft className="w-6 h-6 " />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-[40%] text-white p-2 rounded-full hover;bg-gray-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute right-4 top-4 text-gray-300 flex  items-center gap-4 flex  font-semibold">
        <button
          onClick={() => {
            setAuto(!auto);
            if (swiperRef.current) {
              if (!auto) {
                swiperRef.current.autoplay.start();
              } else {
                swiperRef.current.autoplay.stop();
              }
            }
          }}
        >
          {auto ? <Pause /> : <Play />}
        </button>
        <button
          onClick={() => {
            const bool = !isFullScreen;
            setIsFullScreen(bool);
            if (bool) {
              openFullscreen();
            } else {
              closeFullscreen();
            }
          }}
        >
          {isFullScreen ? <Minimize /> : <Fullscreen />}
        </button>
        <span>
          {currentSlide + 1}/{images.length}
        </span>
        <button onClick={() => setShow(false)}>
          <X />
        </button>
      </div>

      <div className="mx-auto w-[60%]  relative top-[10%]">
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
            if (pagination.ready) {
              console.log("swiper set current");
              pagination.setCurrent(swiper.realIndex);
            }
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={`carousselitem${index}`} className="w-full">
              <div className="flex items-center justify-center w-full h-[600px]">
                <img src={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <footer className="w-full absolute bottom-0 flex items-center justify-center">
        <div className="w-[800px] mx-auto  overflow-x-hidden h-[120px]">
          <div id="slider-pagination" className="flex relative w-full">
            {images.map((item, index) => (
              <div
                key={`slider-item-${index}`}
                data-index={index}
                className={cn(pagination.itemClassName, "px-2")}
              >
                <div
                  onClick={pagination.handleClick}
                  className={cn(
                    "bg-gray-900 w-full h-full px-8 rounded-xl overflow-hidden py-1",
                    {
                      "border-2 border-green-400": pagination.isActive(index),
                    }
                  )}
                >
                  <div
                    className="bg-cover w-full h-full"
                    style={{ backgroundImage: `url(${item})` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
