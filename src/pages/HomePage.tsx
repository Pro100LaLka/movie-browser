import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { HomeBackground } from "../components/HomePage/HeroBackground";
import { fetchMovieGenres, fetchMovies } from "../api/movies";
import HeroMovie from "../components/HomePage/HeroMovie";
import {
  DEFAULT_MOVIE_SORT_OPTION,
  isMovieSort,
  unselectedGenre,
  type MovieSort,
} from "../constants/movies";
import SortDropdown from "../components/HomePage/SortDropdown";
import { GenreList } from "../components/HomePage/GenreList";
import MovieList from "../components/HomePage/MovieList";
import type { Genre } from "../types/movies";
import SelectedGenre from "../components/HomePage/SelectedGenre";
import LoadMore from "../components/HomePage/LoadMore";
import useMovieDetailsQuery from "../hooks/useMovieDetailsQuery";
import { useSearchParams } from "react-router";

const heroMovieNumber = 0;

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get("sort");
  const sorting: MovieSort = isMovieSort(sortParam)
    ? sortParam
    : DEFAULT_MOVIE_SORT_OPTION;

  function changeSorting(sorting: MovieSort) {
    setSearchParams((prev) => {
      if (sorting === DEFAULT_MOVIE_SORT_OPTION) {
        prev.delete("sort");
      } else {
        prev.set("sort", sorting);
      }
      return prev;
    });
  }

  const genresQuery = useQuery({
    queryKey: ["genres", "movies"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const genreParam = searchParams.get("genre");
  const genreId =
    genreParam !== null && Number.isInteger(Number(genreParam))
      ? Number(genreParam)
      : null;

  const waitingForGenres = genreId !== null && genresQuery.isPending;
  const selectedGenre =
    genreId === null
      ? unselectedGenre
      : (genresQuery.data?.genres.find((genre) => genre.id === genreId) ??
        unselectedGenre);

  function changeGenre(genre: Genre) {
    setSearchParams((prev) => {
      if (genre.id === 0) {
        prev.delete("genre");
      } else {
        prev.set("genre", String(genre.id));
      }
      return prev;
    });
  }

  const moviesQuery = useInfiniteQuery({
    queryKey: ["movies", "infinite", selectedGenre?.id, sorting],
    queryFn: ({ pageParam }) =>
      fetchMovies(selectedGenre?.id, sorting, pageParam),

    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,

    enabled: !waitingForGenres,

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const movies = moviesQuery.data?.pages.flatMap((page) => page.results);
  const heroMovieSum = moviesQuery.data?.pages[0]?.results[heroMovieNumber];

  const heroMovieQuery = useMovieDetailsQuery(heroMovieSum?.id);
  const heroMovieDet = heroMovieQuery.data;

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
          {sorting === "trending" && "What's trending right now"}
          {sorting === "most voted" && "Movies everyone knows"}
          {sorting === "highest rated" && "The highest-rated picks"}
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sorting" className="text-muted">
            Sort by
          </label>
          <SortDropdown sorting={sorting} onSortingChange={changeSorting} />
        </div>
      </div>
      <div className="mt-4 flex min-h-14 items-center pb-2">
        <GenreList
          genres={genresQuery.data?.genres}
          isPending={genresQuery.isPending}
          error={genresQuery.error}
          selectedGenre={selectedGenre}
          onGenreChange={changeGenre}
        />
      </div>
      <SelectedGenre
        selectedGenre={selectedGenre}
        onGenreChange={changeGenre}
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
