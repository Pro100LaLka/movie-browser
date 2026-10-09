import type { Genre } from "../../types/movies";

interface GenreListProps {
  genres: Genre[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export function GenreList({ genres, isPending, error }: GenreListProps) {
  return (
    <ul className="text-foreground flex gap-2">
      {isPending && <li>Loading genres...</li>}
      {error && <li>Error while loading genres</li>}
      {genres &&
        genres.map((genre) => (
          <li key={genre.id}>
            <button className="text-foreground bg-surface border-border hover:bg-surface-hover active:bg-surface-active snap-start rounded-full border px-5 py-1.5 whitespace-nowrap">
              {genre.name}
            </button>
          </li>
        ))}
    </ul>
  );
}
