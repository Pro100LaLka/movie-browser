import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { HomeBackground } from "../components/HomePage/HeroBackground";
import { fetchMovieGenres, fetchMovies } from "../api/movies";
import { useState } from "react";
import HeroMovie from "../components/HomePage/HeroMovie";
import { unselectedGenre, type MovieSort } from "../constants/movies";
import SortDropdown from "../components/HomePage/SortDropdown";
import { GenreList } from "../components/HomePage/GenreList";
import MovieList from "../components/HomePage/MovieList";
import type { Genre } from "../types/movies";
import SelectedGenre from "../components/HomePage/SelectedGenre";
import LoadMore from "../components/HomePage/LoadMore";
import useMovieDetailsQuery from "../hooks/useMovieDetailsQuery";

const heroMovieNumber = 0;

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(unselectedGenre);
  const [sorting, setSorting] = useState<MovieSort>("Trending");

  const moviesQuery = useInfiniteQuery({
    queryKey: ["movies", "infinite", selectedGenre.id, sorting],
    queryFn: ({ pageParam }) =>
      fetchMovies(selectedGenre.id, sorting, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  const movies = moviesQuery.data?.pages.flatMap((page) => page.results);

  const heroMovieSum = moviesQuery.data?.pages[0]?.results[heroMovieNumber];

  const heroMovieQuery = useMovieDetailsQuery(heroMovieSum?.id);

  const heroMovieDet = heroMovieQuery.data;

  const genresQuery = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  return (
    <>
      <HomeBackground
        key={heroMovieSum?.backdrop_path}
        backdropPath={heroMovieSum?.backdrop_path}
      />
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
      <div className="mt-4 flex min-h-12 items-center pb-2">
        <GenreList
          genres={genresQuery.data?.genres}
          isPending={genresQuery.isPending}
          error={genresQuery.error}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>
      <SelectedGenre
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />
      <div className="mt-3">
        <MovieList
          movies={movies}
          isPending={moviesQuery.isPending}
          error={moviesQuery.error}
        />
      </div>
      <div className="flex h-30 items-center justify-center">
        <LoadMore
          isFetchingNextPage={moviesQuery.isFetchingNextPage}
          fetchNextPage={moviesQuery.fetchNextPage}
        />
      </div>
      <div className="h-30"></div>
    </>
  );
}

export default HomePage;
