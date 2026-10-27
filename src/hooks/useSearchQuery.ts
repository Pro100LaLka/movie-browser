import { useQuery } from "@tanstack/react-query";
import { selectSearchMediaType } from "../utils/select";
import { fetchSearchResults } from "../api/search";
import { MIN_SEARCH_LENGTH } from "../constants/movies";

function useSearchQuery(query: string) {
  return useQuery({
    queryKey: [query],
    queryFn: ({ signal }) => fetchSearchResults(query, signal),
    enabled: query.length >= MIN_SEARCH_LENGTH,

    select: selectSearchMediaType,

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}

export default useSearchQuery;
