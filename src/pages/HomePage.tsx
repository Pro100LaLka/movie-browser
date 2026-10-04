import { useQuery } from "@tanstack/react-query";
import { HomeBackground } from "../components/HomeBackground";
import {
  fetchMovieDetails,
  fetchMovieGenres,
  fetchMovies,
} from "../api/movies";
import type { Sorting } from "../types";
import { useEffect, useState } from "react";

function HomePage() {
  const genresQuery = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  const [sorting, setSorting] = useState<Sorting>("trending");
  const [pages, setPages] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", sorting, pages],
    queryFn: () => fetchMovies(sorting, pages),
  });

  const heroMovie = moviesQuery.data?.results[1];

  const heroMovieQuery = useQuery({
    queryKey: ["movie", heroMovie?.id],
    queryFn: () => {
      if (heroMovie?.id === undefined) throw new Error("Missing hero movie ID");

      return fetchMovieDetails(heroMovie.id);
    },
    enabled: heroMovie?.id !== undefined,
  });

  useEffect(() => {
    console.log(moviesQuery.data);
  }, [moviesQuery.data]);

  useEffect(() => {
    console.log(heroMovieQuery.data);
  }, [heroMovieQuery.data]);

  return (
    <>
      {heroMovie?.backdrop_path && (
        <HomeBackground src={heroMovie?.backdrop_path} />
      )}
      <div className="flex h-120 max-w-2/3 flex-col items-start justify-center">
        {moviesQuery.data && (
          <>
            <p className="text-muted h-7 text-sm uppercase">
              {heroMovieQuery.data?.tagline}
            </p>
            <h1 className="text-foreground font-barlow origin-left scale-x-75 text-8xl font-bold tracking-tight text-balance uppercase">
              {heroMovie?.title}
            </h1>
          </>
        )}
      </div>
      <ul className="text-foreground flex gap-2">
        {genresQuery.isPending && <li>Loading genres...</li>}
        {genresQuery.error && <li>Error while loading genres</li>}
        {genresQuery.data &&
          genresQuery.data?.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
      </ul>
    </>
  );
}

export default HomePage;
