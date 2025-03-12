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
import BottomSwiper from "./BottomSwiper";

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
  const bottomSwiperRef = useRef<any>(null);

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

  useEffect(() => {
    const body = document.body;
    if (body) {
      if (show) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
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

  const [active, setActive] = useState<number>(0);

  if (!show) return null;
  return (
    <div
      id="image-carousel"
      className="fixed top-0 left-0 w-full h-full bg-gray-900/90 flex flex-col justify-center items-center justify-center"
    >
      <button
        onClick={handlePrev}
        className=" absolute left-4 top-[45%] z-20 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <ChevronLeft className="w-6 h-6 " />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-[45%] text-white p-2 rounded-full hover;bg-gray-700"
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

      <div className="w-[60%]  border">
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
          pagination={{
            clickable: true, // Allow clicking on dots to navigate
            dynamicBullets: true, // Dynamic bullets for better visibility
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={`carousselitem${index}`} className="w-full">
              <div className="flex items-center justify-center w-full h-[600px]">
                <img src={item} />
              </div>
            </SwiperSlide>
          ))}
          {/* Add pagination container */}
          {/* <div className="swiper-pagination"></div> */}
        </Swiper>
      </div>
      <div id="bottomSlide" className="mt-4">
        <BottomSwiper images={images} />
        {/* <Swiper
          initialSlide={initialSlide}
          spaceBetween={10}
          slidesPerView={5}
          loop={true}
          onSwiper={(swiper) => {
            bottomSwiperRef.current = swiper;
            console.log(bottomSwiperRef.current);
            //  bottomSwiperRef.current.slideTo(3);
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.snapIndex);
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide
              onClick={(e: any) => {
                bottomSwiperRef.current.slideTo();
                // const direction = e.clientX - window.innerWidth / 2 > 0;
                // console.log(bottomSwiperRef.current);
                // if (direction) {
                //   bottomSwiperRef.current.slideNext(2);
                // } else {
                //   bottomSwiperRef.current.slidePrev(2);
                // }
                // setTimeout(() => {
                //   if (direction) {
                //     bottomSwiperRef.current.slideNext();
                //   } else {
                //     bottomSwiperRef.current.slidePrev();
                //   }
                // }, 100);
              }}
              key={`carousselbottomtem${index}`}
              className="w-full"
            >
              <div className="flex items-center justify-center w-full h-[150px]">
                <img src={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </div>
  );
}
