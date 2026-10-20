import { useEffect, useRef, useState } from "react";
import { MOVIE_SORT_OPTIONS, type MovieSort } from "../../constants/movies";
import ArrowIcon from "../Icons/ArrowIcon";
import CheckIcon from "../Icons/CheckIcon";
import clsx from "clsx";

interface SortDropdownProps {
  sorting: MovieSort;
  onSortingChange: (value: MovieSort) => void;
}

function SortDropdown({ sorting, onSortingChange }: SortDropdownProps) {
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
    onSortingChange(sortOption);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="sorting"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-foreground border-muted bg-background/80 focus:border-primary focus:ring-primary hover:bg-surface/80 flex w-40 cursor-pointer items-center justify-between rounded-lg border px-4 py-1.5 text-start capitalize focus:ring-2 focus-visible:outline-none"
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
                  "text-foreground focus-visible:outline-primary flex w-full items-center gap-2 rounded-md px-3 py-2 text-start capitalize focus-visible:outline-2",
                  sorting === sortOption ||
                    "hover:bg-surface-hover active:bg-surface-active cursor-pointer",
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
