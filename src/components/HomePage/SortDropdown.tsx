import { useEffect, useRef, useState } from "react";
import { MOVIE_SORT_OPTIONS, type MovieSort } from "../../constants/movies";
import ArrowIcon from "../icons/ArrowIcon";
import CheckIcon from "../icons/CheckIcon";
import clsx from "clsx";

interface SortDropdownProps {
  sorting: MovieSort;
  setSorting: (value: MovieSort) => void;
}

function SortDropdown({ sorting, setSorting }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: PointerEvent) {
      const dropdown = dropdownRef.current;

      if (
        dropdown &&
        event.target instanceof Node &&
        !dropdown.contains(event.target)
      )
        setIsOpen(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  function handleOptionClick(sortOption: MovieSort) {
    setSorting(sortOption);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="sorting"
        onClick={() => setIsOpen((prev) => !prev)}
        // onChange={(e) => setSorting(e.target.value as MovieSort)}
        className="text-foreground border-border focus:outline-primary-hover bg-background/80 flex w-40 items-center justify-between rounded-lg border px-4 py-1.5 text-start focus:outline-2"
      >
        {sorting}
        {isOpen ? <ArrowIcon direction="down" /> : <ArrowIcon direction="up" />}
      </button>
      {isOpen && (
        <ul className="bg-surface border-border absolute z-10 mt-0.5 flex w-50 flex-col rounded-lg border-2">
          {MOVIE_SORT_OPTIONS.map((sortOption) => (
            <li key={sortOption}>
              <button
                onClick={() => handleOptionClick(sortOption)}
                className={clsx(
                  "text-foreground flex w-full items-center gap-2 px-3 py-2 text-start",
                  sorting === sortOption ||
                    "hover:bg-surface-hover active:bg-surface-active",
                  sorting === sortOption && "text-primary",
                )}
              >
                <span className="w-6">
                  {sorting === sortOption && <CheckIcon />}
                </span>
                {sortOption}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
