import type { SearchResponse } from "../types/shared";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchSearchResults(
  query: string,
  signal?: AbortSignal,
): Promise<SearchResponse> {
  const formatedQuery = query.trim().replaceAll(" ", "%20");
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${formatedQuery}&language=en-US&page=1`,
    { signal },
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
