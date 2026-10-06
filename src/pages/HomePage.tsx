import { useQuery } from "@tanstack/react-query";
import { HomeBackground } from "../components/HomePage/HeroBackground";
import {
  fetchMovieDetails,
  fetchMovieGenres,
  fetchMovies,
} from "../api/movies";
import { useEffect, useState } from "react";
import HeroMovie from "../components/HomePage/HeroMovie";
import { MOVIE_SORT_OPTIONS, type MovieSort } from "../constants/movies";

const heroMovieNumber = 0;

function HomePage() {
  const genresQuery = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  const [sorting, setSorting] = useState<MovieSort>("trending");
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
      <div className="flex h-120 max-w-full flex-col items-start justify-center">
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
      <select
        name="sorting"
        value={sorting}
        onChange={(e) => setSorting(e.target.value as MovieSort)}
      >
        {MOVIE_SORT_OPTIONS.map((sortOption) => (
          <option value={sortOption}>{sortOption}</option>
        ))}
      </select>
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
