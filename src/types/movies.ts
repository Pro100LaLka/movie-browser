export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Collection {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
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
  original_language: string;
  production_companies: Array<{ name: string }>;
  belongs_to_collection: Collection;
}

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
