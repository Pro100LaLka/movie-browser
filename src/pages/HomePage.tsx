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

  const heroMovieSum = moviesQuery.data?.results[0];

  const heroMovieQuery = useQuery({
    queryKey: ["movie", heroMovieSum?.id],
    queryFn: () => {
      if (heroMovieSum?.id === undefined)
        throw new Error("Missing hero movie ID");

      return fetchMovieDetails(heroMovieSum.id);
    },
    enabled: heroMovieSum?.id !== undefined,
  });

  const heroMovieDet = heroMovieQuery.data;

  useEffect(() => {
    console.log(genresQuery.data);
  }, [genresQuery.data]);

  useEffect(() => {
    console.log(moviesQuery.data);
  }, [moviesQuery.data]);

  useEffect(() => {
    console.log(heroMovieQuery.data);
  }, [heroMovieQuery.data]);

  return (
    <>
      {heroMovieSum?.backdrop_path && (
        <HomeBackground src={heroMovieSum?.backdrop_path} />
      )}
      <div className="flex h-120 max-w-2/3 flex-col items-start justify-center">
        {heroMovieSum && (
          <>
            <p className="text-muted h-5 text-sm uppercase">
              {heroMovieDet?.tagline}
            </p>
            <h1 className="text-foreground font-barlow origin-left scale-x-75 text-8xl font-bold tracking-tight text-balance uppercase">
              {heroMovieSum.title}
            </h1>
            <div className="text-foreground mt-2 flex gap-5">
              <p className="">{heroMovieSum.release_date.slice(0, 4)}</p>
              <span className="font-serif">|</span>
              {heroMovieDet && (
                <>
                  <ul className="flex gap-5">
                    {heroMovieDet.genres.map((genre) => (
                      <li>{genre.name}</li>
                    ))}
                  </ul>
                  <span className="font-serif">|</span>
                </>
              )}
            </div>
          </>
        )}
        {moviesQuery.error && (
          <h1 className="text-foreground flex h-full items-center justify-center text-7xl">
            Error occured while fetching the movies
          </h1>
        )}
        {moviesQuery.isLoading && (
          <h1 className="text-foreground flex h-full items-center justify-center text-7xl">
            Loading...
          </h1>
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
