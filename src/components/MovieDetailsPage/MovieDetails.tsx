import useMovieDetailsQuery from "../../hooks/useMovieDetailsQuery";
import CastList from "./CastList";
import { MovieBackground } from "./MovieBackground";
import Breadcrumbs from "./Breadcrumbs";
import Poster from "./Poster";
import RatingCard from "./RatingCard";
import PrimaryActions from "./PrimaryActions";
import MovieHeading from "./MovieHeading";
import { useQuery } from "@tanstack/react-query";
import { fetchCredits, fetchSimilarMovies } from "../../api/movies";
import { selectKeyCredits } from "../../utils/select";
import MovieFacts from "./MovieFacts";
import CollectionCard from "./CollectionCard";
import SimilarList from "./SimilarList";

function MovieDetails({ id }: { id: number }) {
  const movieDetailsQuery = useMovieDetailsQuery(id);

  const creditsQuery = useQuery({
    queryKey: ["credits", id],
    queryFn: () => fetchCredits(id),
    select: selectKeyCredits,

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const similarQuery = useQuery({
    queryKey: ["movies", "similar", id],
    queryFn: () => fetchSimilarMovies(id),

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

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
  const credits = creditsQuery.data;

  const collection = movieDetails.belongs_to_collection;
  const cast = credits?.cast ?? [];
  const similar = similarQuery.data?.results ?? [];

  console.log(movieDetails);

  return (
    <>
      <MovieBackground
        backdropPath={movieDetails.backdrop_path}
        key={movieDetails.backdrop_path}
      />
      <div className="mt-5">
        <Breadcrumbs title={movieDetails.title} />
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-[350px_1fr] gap-x-15">
        <div className="col-span-1 col-start-1 flex flex-col gap-5">
          <Poster poster_path={movieDetails.poster_path} />
          <RatingCard
            voteAverage={movieDetails.vote_average}
            voteCount={movieDetails.vote_count}
          />
        </div>
        <div className="col-span-1 col-start-2">
          <MovieHeading movieDetails={movieDetails} />
          <div className="mt-6">
            <PrimaryActions imdbId={movieDetails.imdb_id} />
          </div>
          <div className="mt-8">
            <MovieFacts credits={credits} movieDetails={movieDetails} />
          </div>
        </div>

        {collection && (
          <div className="col-span-2 col-start-1 mt-10">
            <CollectionCard collection={collection} />
          </div>
        )}
        {cast.length !== 0 && (
          <div className="col-span-2 col-start-1 mt-20">
            <CastList cast={cast} />
          </div>
        )}
        {similar.length !== 0 && (
          <div className="col-span-2 col-start-1 mt-20">
            <SimilarList movies={similar} />
          </div>
        )}
      </div>
      <div className="h-20"></div>
    </>
  );
}

export default MovieDetails;
