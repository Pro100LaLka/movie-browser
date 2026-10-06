export const MOVIE_SORT_OPTIONS = [
  "trending",
  "most voted",
  "highest rated",
] as const;

export type MovieSort = (typeof MOVIE_SORT_OPTIONS)[number];
