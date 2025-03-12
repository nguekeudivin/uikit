import React, { useRef, useState } from "react";

const CustomCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [items] = useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ]);

  const handleItemClick = (index: number) => {
    if (carouselRef.current) {
      const item = carouselRef.current.children[index] as HTMLElement;
      const itemWidth = item.offsetWidth;
      const containerWidth = carouselRef.current.offsetWidth;
      const scrollPosition =
        item.offsetLeft - containerWidth / 2 + itemWidth / 2;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <div
        ref={carouselRef}
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          transition: "transform 0.3s ease",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto",
              width: "100px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
