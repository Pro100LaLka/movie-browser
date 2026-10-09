import type { MovieSummary } from "../../types/movies";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: MovieSummary[] | undefined;
  isPending: boolean;
  error: Error | null;
}

function MovieList({ movies, isPending, error }: MovieListProps) {
  return (
    <>
      {movies && (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
      {isPending && (
        <p className="text-foreground mt-10 flex h-full items-center justify-center text-7xl">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-foreground mt-10 flex h-full items-center justify-center text-7xl">
          Error occured while fetching the movies
        </p>
      )}
    </>
  );
}

export default MovieList;
