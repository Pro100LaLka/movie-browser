import type { Sorting } from "../types";
import type {
  GenreResponse,
  MovieDetails,
  MoviesResponse,
} from "./movies.types";

export async function fetchMovieGenres(): Promise<GenreResponse> {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=de8fff199ac1c1dfcf6c179183c67c67&language=en",
  );
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
}

export async function fetchMovies(
  sorting: Sorting,
  page: number,
): Promise<MoviesResponse> {
  let urlEnding = "";
  if (sorting === "trending") urlEnding = "&sort_by=popularity.desc";
  if (sorting === "most voted") urlEnding = "&sort_by=vote_count.desc";
  if (sorting === "highest rated")
    urlEnding = "&sort_by=vote_average.desc&vote_count.gte=10000";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=de8fff199ac1c1dfcf6c179183c67c67&include_adult=false&include_video=false&language=en-US&page=${page}${urlEnding}`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=de8fff199ac1c1dfcf6c179183c67c67`,
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
