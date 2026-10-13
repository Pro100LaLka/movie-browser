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
      <ul className="flex gap-2">
        {isPending && <li>Loading genres...</li>}
        {error && <li>Error while loading genres</li>}
        {genres &&
          [unselectedGenre, ...genres].map((genre) => (
            <li key={genre.id}>
              <button
                onClick={() => onGenreChange(genre)}
                className={clsx(
                  "snap-start rounded-full border px-5 py-1.5 whitespace-nowrap",
                  genre.id === selectedGenre.id
                    ? "text-on-primary bg-primary border-transparent font-medium"
                    : "text-foreground bg-surface border-border hover:bg-surface-hover active:bg-surface-active",
                )}
              >
                {genre.name}
              </button>
            </li>
          ))}
      </ul>
    </HorizontalScroller>
  );
}
