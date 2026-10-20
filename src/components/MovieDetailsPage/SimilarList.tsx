import type { MovieSummary } from "../../types/movies";
import MovieCard from "../HomePage/MovieCard";
import HorizontalScroller from "../HorizontalScroller";

interface SimilarListProps {
  movies: MovieSummary[];
}

function SimilarList({ movies }: SimilarListProps) {
  return (
    <>
      <h2 className="text-foreground text-4xl font-medium">More like this</h2>
      <HorizontalScroller type="rect">
        <ul className="mt-6 flex gap-5 px-2">
          {movies.map((movie) => (
            <li key={movie.id} className="w-60 shrink-0">
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      </HorizontalScroller>
    </>
  );
}

export default SimilarList;
