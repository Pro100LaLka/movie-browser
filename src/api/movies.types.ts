interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export interface MovieDetailsResponse extends Movie {
  genres: Genre[];
  imdb_id: string;
  tagline: string;
}
