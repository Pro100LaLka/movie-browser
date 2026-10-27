interface TvBase {
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
}

export interface TvSummary extends TvBase {
  genre_ids: number[];
}
