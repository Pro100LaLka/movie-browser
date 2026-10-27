import type { MovieSummary } from "./movies";
import type { TvSummary } from "./tv";

// -------------------- Collections --------------------
export interface Collection {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
}

// -------------------- People --------------------
export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  profile_path: string;
  job: string;
  department: string;
  popularity: number;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// -------------------- Search --------------------
export interface SearchMovie extends MovieSummary {
  media_type: "movie";
}

export interface SearchTV extends TvSummary {
  media_type: "tv";
}

export interface SearchPerson {
  media_type: "person";
}

export type SearchResult = SearchMovie | SearchTV | SearchPerson;

export interface SearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: SearchResult[];
}
