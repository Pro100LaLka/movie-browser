import type { MovieSort } from "../constants/movies";
import type {
  GenreResponse,
  MovieDetails,
  MoviesResponse,
} from "../types/movies";
import type { CreditsResponse } from "../types/shared";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovieGenres(): Promise<GenreResponse> {
  const params = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
  });
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?${params}`,
  );
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
}

export async function fetchMovies(
  genre: number,
  sorting: MovieSort,
  page: number,
): Promise<MoviesResponse> {
  let sortBy = "";
  if (sorting === "trending") sortBy = "popularity.desc";
  if (sorting === "most voted") sortBy = "vote_count.desc";
  if (sorting === "highest rated") sortBy = "vote_average.desc";

  const params = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
    page: String(page),
    sort_by: sortBy,
    "vote_count.gte": sorting === "highest rated" ? "1000" : "",
    with_genres: genre === 0 ? "" : String(genre),
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchMovieDetails(
  movieId: number,
): Promise<MovieDetails> {
  const params = new URLSearchParams({
    api_key: apiKey,
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?${params}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchCredits(movieId: number): Promise<CreditsResponse> {
  const params = new URLSearchParams({
    api_key: apiKey,
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?${params}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchSimilarMovies(
  movieId: number,
): Promise<MoviesResponse> {
  const params = new URLSearchParams({
    api_key: apiKey,
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?${params}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
