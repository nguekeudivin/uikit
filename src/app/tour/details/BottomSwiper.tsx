import { useEffect, useRef, useState } from "react";

interface BottomSwiperProps {
  images: string[];
  itemsPerView?: number;
}

export default function BottomSwiper({
  images,
  itemsPerView = 5,
}: BottomSwiperProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<any[]>(
    Array.from({ length: 10 }).map((_, index) => index)
  );
  const [middlePosition, setMiddlePosition] = useState<number>(400);
  const [itemWidth, setItemWidth] = useState<number>(200);

  useEffect(() => {
    const slider = document.getElementById("slider");
    if (slider) {
      const width = slider.offsetWidth / itemsPerView;
      setItemWidth(width);
      setMiddlePosition(width * Math.floor(itemsPerView / 2));
    }
  }, []);

  const getPosition = (element: any) => {
    const styles = window.getComputedStyle(element);
    return parseFloat(styles.left.split("px")[0]);
  };

  const setPosition = (element: any, position: number) => {
    element.style.left = `${position}px`;
  };

  const sortItems = () => {
    const items = Array.from(document.querySelectorAll(".slider-item"));
    return items.sort(
      (a: Element, b: Element) => getPosition(a) - getPosition(b)
    );
  };

  const translate = (modifier: number) => {
    const items = Array.from(document.querySelectorAll(".slider-item"));
    items.forEach((item: Element) => {
      (item as any).style.left = `${modifier + getPosition(item)}px`;
    });
  };

  return (
    <div className="border-2 border-green-600">
      <div
        ref={sliderRef}
        id="slider"
        className="flex relative border-red-500 w-full border h-[100px]  w-[1000px]"
      >
        {items.map((item, index) => (
          <div
            key={`slider-item-${index}`}
            style={{ width: `${itemWidth}px`, left: `${index * itemWidth}px` }}
            onClick={(e: any) => {
              const position = getPosition(e.target);
              const sorted = sortItems();
              const first = sorted[0];
              const last = sorted[sorted.length - 1];
              const isLimitLeft =
                getPosition(sorted[1]) == getPosition(e.target);
              const isLimitRight =
                getPosition(sorted[items.length - 2]) == getPosition(e.target);

              translate(middlePosition - position);

              if (isLimitLeft) {
                // Move the last item to the first position.
                setPosition(last, middlePosition - middlePosition);
              }

              if (isLimitRight) {
                setPosition(first, middlePosition + middlePosition);
              }
            }}
            className="absolute text-white bg-gray-900 slider-item  top-0 h-[100px] border-2 border-white flex items-center justify-center transition-all duration-300 ease-in-out"
          >
            Item {item}
          </div>
        ))}
      </div>
    </div>
  );
}
