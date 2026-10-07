import { useEffect, useRef, useState, type ReactNode } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import clsx from "clsx";

function HorizontalScroller({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function handleScroll(element: HTMLDivElement) {
    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  }

  function scroll(direction: -1 | 1) {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: direction * element.clientWidth * 0.5,
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
          "col-start-1 row-start-1 snap-x snap-mandatory scrollbar-none overflow-x-auto scroll-smooth motion-reduce:scroll-auto",
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
        onClick={() => scroll(-1)}
        className={clsx(
          "bg-surface-elevated hover:bg-surface-hover border-border text-foreground active:bg-surface-active z-1 col-start-1 row-start-1 flex size-12 shrink-0 items-center justify-center rounded-full border text-2xl",
          canScrollLeft || "hidden",
        )}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        onClick={() => scroll(1)}
        className={clsx(
          "bg-surface-elevated hover:bg-surface-hover border-border text-foreground active:bg-surface-active z-1 col-start-1 row-start-1 flex size-12 shrink-0 items-center justify-center justify-self-end rounded-full border text-2xl",
          canScrollRight || "hidden",
        )}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

export default HorizontalScroller;
