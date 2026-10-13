import clsx from "clsx";
import type { Genre } from "../../types/movies";
import HorizontalScroller from "../HorizontalScroller";
import { unselectedGenre } from "../../constants/movies";

interface GenreListProps {
  genres: Genre[] | undefined;
  isPending: boolean;
  error: Error | null;
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

export function GenreList({
  genres,
  isPending,
  error,
  selectedGenre,
  onGenreChange,
}: GenreListProps) {
  return (
    <HorizontalScroller>
      <ul className="flex h-full w-max items-center gap-2 px-2">
        {isPending && <li>Loading genres...</li>}
        {error && <li>Error while loading genres</li>}
        {genres &&
          [unselectedGenre, ...genres].map((genre) => (
            <li key={genre.id} className="relative flex">
              <input
                type="radio"
                className="peer sr-only"
                id={String(genre.id)}
                name="genre"
                onChange={() => onGenreChange(genre)}
                checked={genre.id === selectedGenre.id}
              />
              <label
                htmlFor={String(genre.id)}
                className={clsx(
                  "outline-primary snap-start rounded-full border px-5 py-1.5 whitespace-nowrap outline-offset-3 peer-focus-visible:outline-2",
                  genre.id === selectedGenre.id
                    ? "text-on-primary bg-primary border-transparent font-medium"
                    : "text-foreground bg-surface border-border hover:bg-surface-hover active:bg-surface-active cursor-pointer",
                )}
              >
                {genre.name}
              </label>
            </li>
          ))}
      </ul>
    </HorizontalScroller>
  );
}
