import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../api/movies";

function useMovieDetailsQuery(id: number | undefined) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => {
      if (id === undefined) throw new Error("Missing movie ID");

      return fetchMovieDetails(id);
    },
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}

export default useMovieDetailsQuery;
