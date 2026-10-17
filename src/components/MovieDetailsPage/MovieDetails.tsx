import { useEffect } from "react";
import useMovieDetailsQuery from "../../hooks/useMovieDetailsQuery";
import CastList from "./CastList";
import { MovieBackground } from "./MovieBackground";
import Breadcrumbs from "./Breadcrumbs";
import Poster from "./Poster";
import RatingCard from "./RatingCard";
import PrimaryActions from "./PrimaryActions";

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

  const movieDetails = movieDetailsQuery.data;

  return (
    <>
      <MovieBackground
        backdropPath={movieDetails.backdrop_path}
        key={movieDetails.backdrop_path}
      />
      <div className="mt-5">
        <Breadcrumbs title={movieDetails.title} />
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-[350px_1fr]">
        <div className="col-span-1 col-start-1 flex flex-col gap-5">
          <Poster poster_path={movieDetails.poster_path} />
          <RatingCard
            voteAverage={movieDetails.vote_average}
            voteCount={movieDetails.vote_count}
          />
          <PrimaryActions imdbId={movieDetails.imdb_id} />
        </div>
      </div>
      {/* <CastList id={id} /> */}
      <div className="h-300"></div>
    </>
  );
}

export default MovieDetails;
