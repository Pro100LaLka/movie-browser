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
  });
}

export default useMovieDetailsQuery;
