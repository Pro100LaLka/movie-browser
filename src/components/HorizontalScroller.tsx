import { useEffect, useRef, useState, type ReactNode } from "react";
import ArrowIcon from "./Icons/ArrowIcon";
import clsx from "clsx";

interface HorizontalScrollerProps {
  children: ReactNode;
  type: "pill" | "rect";
}

function HorizontalScroller({ children, type }: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function handleScroll(element: HTMLDivElement) {
    setCanScrollLeft(element.scrollLeft > 10);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  }

  function scroll(direction: -1 | 1) {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: direction * element.clientWidth * 0.75,
      behavior: "auto",
    });
  }

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    handleScroll(element);
  }, [children]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleResize = () => handleScroll(element);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 grid-rows-1 items-center">
      <div
        ref={scrollRef}
        onScroll={(e) => handleScroll(e.currentTarget)}
        className={clsx(
          "col-start-1 row-start-1 -ml-2 snap-x snap-mandatory scroll-px-2 scrollbar-none self-stretch overflow-x-auto scroll-smooth motion-reduce:scroll-auto",
          canScrollRight
            ? canScrollLeft
              ? "mask-[linear-gradient(to_right,transparent_calc(0%+3rem),black_calc(0%+8rem),black_calc(100%-8rem),transparent_calc(100%-3rem))]"
              : "mask-[linear-gradient(to_right,black_calc(100%-8rem),transparent_calc(100%-3rem))]"
            : canScrollLeft
              ? "mask-[linear-gradient(to_right,transparent_calc(0%+3rem),black_calc(0%+8rem))]"
              : "mask-none",
        )}
      >
        {children}
      </div>
      <button
        tabIndex={-1}
        onClick={() => scroll(-1)}
        className={clsx(
          "bg-surface-elevated hover:bg-surface-hover border-border text-foreground active:bg-surface-active z-1 col-start-1 row-start-1 flex shrink-0 cursor-pointer items-center justify-center border text-2xl",
          canScrollLeft || "hidden",
          type === "pill" && "size-12 rounded-full",
          type === "rect" && "h-25 w-12 rounded-md",
        )}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        tabIndex={-1}
        onClick={() => scroll(1)}
        className={clsx(
          "bg-surface-elevated hover:bg-surface-hover border-border text-foreground active:bg-surface-active z-1 col-start-1 row-start-1 flex shrink-0 cursor-pointer items-center justify-center justify-self-end border text-2xl",
          canScrollRight || "hidden",
          type === "pill" && "size-12 rounded-full",
          type === "rect" && "h-25 w-12 rounded-md",
        )}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

export default HorizontalScroller;
