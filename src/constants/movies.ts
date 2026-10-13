import type { Genre } from "../types/movies";

export const MOVIE_SORT_OPTIONS = [
  "Trending",
  "Most voted",
  "Highest rated",
] as const;

export type MovieSort = (typeof MOVIE_SORT_OPTIONS)[number];

export const unselectedGenre: Genre = {
  id: 0,
  name: "All",
};
