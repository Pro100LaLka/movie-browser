import type { Collection } from "./shared";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

interface MovieBase {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
}

export interface MovieSummary extends MovieBase {
  genre_ids: number[];
}

export interface MoviesResponse {
  page: number;
  results: MovieSummary[];
  total_pages: number;
}

export interface MovieDetails extends MovieBase {
  genres: Genre[];
  imdb_id: string;
  tagline: string | null;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  production_companies: Array<{ name: string }>;
  belongs_to_collection: Collection;
}
