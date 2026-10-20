import type { Genre } from "../types/movies";

export const MOVIE_SORT_OPTIONS = [
  "trending",
  "most voted",
  "highest rated",
] as const;

export type MovieSort = (typeof MOVIE_SORT_OPTIONS)[number];

export const DEFAULT_MOVIE_SORT_OPTION = MOVIE_SORT_OPTIONS[0];

export function isMovieSort(value: string | null): value is MovieSort {
  return MOVIE_SORT_OPTIONS.some((sort) => sort === value);
}

export const unselectedGenre: Genre = {
  id: 0,
  name: "All",
};
