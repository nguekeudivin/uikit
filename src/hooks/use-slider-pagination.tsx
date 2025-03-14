import { useEffect, useRef, useState } from "react";

export default function useSliderPagination({
  itemsPerView,
  onSelect,
  loop = false,
}: {
  itemsPerView: number;
  onSelect?: any;
  loop: boolean;
}) {
  const [middlePosition, setMiddlePosition] = useState<number>(400);
  const [itemWidth, setItemWidth] = useState<number>(200);
  const [active, setActive] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    init();
    window.onresize = () => {
      init();
    };
  }, []);

  const itemStyle = (index: number) => {
    return {
      width: `${itemWidth}px`,
      left: `${index * itemWidth}px`,
    };
  };

  const init = () => {
    const slider = document.getElementById("slider-pagination");
    if (slider) {
      const width = slider.offsetWidth / itemsPerView;
      setItemWidth(width);
      setMiddlePosition(width * Math.floor(itemsPerView / 2));
      // Init items positions and sizes.
      const items = Array.from(
        document.querySelectorAll(".slider-pagination-item")
      );
      items.forEach((item: any, index) => {
        item.style.left = `${width * index}px`;
        item.style.width = `${width}px`;
      });
      setReady(true);
    }
  };

  const getPosition = (element: any) => {
    const styles = window.getComputedStyle(element);
    return parseFloat(styles.left.split("px")[0]);
  };

  const setPosition = (element: any, position: number) => {
    element.style.left = `${position}px`;
  };

  const sortItems = () => {
    const items = Array.from(
      document.querySelectorAll(".slider-pagination-item")
    );
    return items.sort(
      (a: Element, b: Element) => getPosition(a) - getPosition(b)
    );
  };

  const translate = (modifier: number) => {
    const items = Array.from(
      document.querySelectorAll(".slider-pagination-item")
    );
    items.forEach((item: Element) => {
      (item as any).style.left = `${modifier + getPosition(item)}px`;
    });
  };

  const findItemParent = (parent: any) => {
    if (parent.classList.contains("slider-pagination-item")) {
      return parent;
    } else {
      return findItemParent(parent.parentNode);
    }
  };

  const handleClick = ({ target }: any) => {
    let element = findItemParent(target);
    if (loop) loopSelectItem(element);
    else selectItem(element);

    if (onSelect) {
      onSelect(element.dataset.index);
    }
  };

  const selectItem = (element: any) => {
    const position = getPosition(element);
    const sorted = sortItems();
    const middleIndex = Math.floor(itemsPerView / 2);
    let isLimitLeft = false;
    let isLimitRight = false;

    // Checking limit left.
    for (let i = 0; i < middleIndex; i++) {
      if (getPosition(sorted[i]) == getPosition(element)) {
        isLimitLeft = true;
      }

      if (!isLimitLeft) {
        if (
          getPosition(sorted[sorted.length - 1 - i]) == getPosition(element)
        ) {
          isLimitRight = true;
        }
      }
    }

    if (!isLimitLeft && !isLimitRight) translate(middlePosition - position);

    setActive(parseInt(element.dataset.index));
  };

  const loopSelectItem = (element: any) => {
    const position = getPosition(element);
    const sorted = sortItems();
    const middleIndex = Math.floor(itemsPerView / 2);
    let isLimitLeft = false;
    let isLimitRight = false;
    const last = [];
    const first = [];

    // Checking limit left.
    for (let i = 0; i < middleIndex; i++) {
      if (getPosition(sorted[i]) == getPosition(element)) {
        isLimitLeft = true;
        for (let j = i; j < middleIndex; j++) {
          last.unshift(sorted.pop());
        }
      }

      if (!isLimitLeft) {
        if (
          getPosition(sorted[sorted.length - 1 - i]) == getPosition(element)
        ) {
          isLimitRight = true;
          for (let j = i; j < middleIndex; j++) {
            first.unshift(sorted.shift());
          }
        }
      }
    }

    // Checking limit righht
    translate(middlePosition - position);

    if (isLimitLeft) {
      last.forEach((item, index) => {
        setPosition(item, itemWidth * index);
      });
    }

    if (isLimitRight) {
      first.forEach((item, index) => {
        setPosition(
          item,
          middlePosition +
            itemWidth * Math.ceil(itemsPerView / 2) -
            itemWidth * (index + 1)
        );
      });
    }

    setActive(parseInt(element.dataset.index));
  };

  const setCurrent = (index: number) => {
    const sorted = sortItems();
    const element = sorted.find(
      (item) => parseInt((item as any).dataset.index) == index
    );
    if (element) {
      loopSelectItem(element);
    }
  };

  const isActive = (index: number) => {
    return active == index;
  };

  return {
    ready,
    setReady,
    setCurrent,
    getPosition,
    setPosition,
    translate,
    sortItems,
    middlePosition,
    itemWidth,
    handleClick,
    itemStyle,
    init,
    isActive,
    itemClassName:
      "slider-pagination-item absolute  top-0 h-[100px]  transition-all duration-300 ease-in-out",
  };
}
