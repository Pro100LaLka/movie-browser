import { useQuery } from "@tanstack/react-query";
import { HomeBackground } from "../components/HomePage/HeroBackground";
import {
  fetchMovieDetails,
  fetchMovieGenres,
  fetchMovies,
} from "../api/movies";
import { useEffect, useState } from "react";
import HeroMovie from "../components/HomePage/HeroMovie";
import { type MovieSort } from "../constants/movies";
import HorizontalScroller from "../components/HorizontalScroller";
import SortDropdown from "../components/HomePage/SortDropdown";

const heroMovieNumber = 0;

function HomePage() {
  const [sorting, setSorting] = useState<MovieSort>("Trending");
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", sorting, page],
    queryFn: () => fetchMovies(sorting, page),
  });

  const heroMovieSum = moviesQuery.data?.results[heroMovieNumber];

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

  const genresQuery = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

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
        <HomeBackground
          key={heroMovieSum?.backdrop_path}
          src={heroMovieSum?.backdrop_path}
        />
      )}
      <div className="flex h-100 max-w-full flex-col items-start justify-center">
        {heroMovieSum && (
          <HeroMovie heroMovieSum={heroMovieSum} heroMovieDet={heroMovieDet} />
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
      <div className="flex justify-between">
        <h2 className="text-foreground text-4xl font-medium">
          What's trending right now
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sorting" className="text-muted">
            Sort by
          </label>
          <SortDropdown sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
      <div className="mt-4">
        <HorizontalScroller>
          <ul className="text-foreground flex gap-2">
            {genresQuery.isPending && <li>Loading genres...</li>}
            {genresQuery.error && <li>Error while loading genres</li>}
            {genresQuery.data &&
              genresQuery.data?.genres.map((genre) => (
                <li key={genre.id}>
                  <button className="text-foreground bg-surface border-border hover:bg-surface-hover active:bg-surface-active snap-start rounded-full border px-5 py-1.5 whitespace-nowrap">
                    {genre.name}
                  </button>
                </li>
              ))}
          </ul>
        </HorizontalScroller>
      </div>
    </>
  );
}

export default HomePage;
