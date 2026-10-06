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
}
