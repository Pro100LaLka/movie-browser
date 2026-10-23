import type { MovieSort } from "../constants/movies";
import type {
  GenreResponse,
  MovieDetails,
  MoviesResponse,
} from "../types/movies";
import type { CreditsResponse } from "../types/shared";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovieGenres(): Promise<GenreResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`,
  );
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
}

export async function fetchMovies(
  genre: number,
  sorting: MovieSort,
  page: number,
): Promise<MoviesResponse> {
  let urlSorting = "";
  if (sorting === "trending") urlSorting = "&sort_by=popularity.desc";
  if (sorting === "most voted") urlSorting = "&sort_by=vote_count.desc";
  if (sorting === "highest rated")
    urlSorting = "&sort_by=vote_average.desc&vote_count.gte=1000";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}${urlSorting}&with_genres=${genre || ""}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchMovieDetails(
  movieId: number,
): Promise<MovieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchCredits(movieId: number): Promise<CreditsResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchSimilarMovies(
  movieId: number,
): Promise<MoviesResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
