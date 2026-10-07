export const MOVIE_SORT_OPTIONS = [
  "Trending",
  "Most voted",
  "Highest rated",
] as const;

export type MovieSort = (typeof MOVIE_SORT_OPTIONS)[number];
