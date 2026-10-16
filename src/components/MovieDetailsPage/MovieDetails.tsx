import { useEffect } from "react";
import useMovieDetailsQuery from "../../hooks/useMovieDetailsQuery";
import CastList from "./CastList";

function MovieDetails({ id }: { id: number }) {
  const movieDetailsQuery = useMovieDetailsQuery(id);

  useEffect(() => {
    console.log(movieDetailsQuery.data);
  }, [movieDetailsQuery.data]);

  if (movieDetailsQuery.isPending)
    return (
      <h1 className="text-foreground text-xl">Loading movie details...</h1>
    );

  if (movieDetailsQuery.isError)
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-foreground text-center text-3xl">
          Couldn't load movie details.
        </h1>
        <button
          onClick={() => movieDetailsQuery.refetch()}
          className="bg-primary hover:bg-primary-hover active:bg-primary-active text-on-primary rounded-full px-3 py-1 text-lg"
        >
          Try again
        </button>
      </div>
    );
  return <CastList id={id} />;
}

export default MovieDetails;
