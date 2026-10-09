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
import { GenreList } from "../components/HomePage/GenreList";
import MovieList from "../components/HomePage/MovieList";

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
      <div className="flex min-h-100 max-w-full flex-col items-start justify-center">
        <HeroMovie
          heroMovieSum={heroMovieSum}
          heroMovieDet={heroMovieDet}
          error={moviesQuery.error}
          isPending={moviesQuery.isPending}
        />
      </div>
      <div className="flex justify-between">
        <h2 className="text-foreground text-4xl font-medium">
          {sorting === "Trending" && "What's trending right now"}
          {sorting === "Most voted" && "Movies everyone knows"}
          {sorting === "Highest rated" && "The highest-rated picks"}
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sorting" className="text-muted">
            Sort by
          </label>
          <SortDropdown sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
      <div className="mt-4 flex min-h-12 items-center">
        <HorizontalScroller>
          <GenreList
            genres={genresQuery.data?.genres}
            isPending={genresQuery.isPending}
            error={genresQuery.error}
          />
        </HorizontalScroller>
      </div>
      <div className="mt-4 pb-30">
        <MovieList
          movies={moviesQuery.data?.results}
          isPending={moviesQuery.isPending}
          error={moviesQuery.error}
        />
      </div>
    </>
  );
}

export default HomePage;
