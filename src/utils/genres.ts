import type { Genre } from "../types";

export function getGenreNamesByIds(ids: number[], genres: Genre[]): string[] {
  return ids.map((id) => genres.find((genre) => genre.id === id)?.name || "");
}
