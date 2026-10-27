import type { SearchResponse } from "../types/shared";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchSearchResults(
  query: string,
  signal?: AbortSignal,
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
    page: "1",
    query: query.trim(),
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?${params}`,
    { signal },
  );
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}
