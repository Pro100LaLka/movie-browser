import type { MovieDetails } from "../../types/movies";
import { formatMovieLength } from "../../utils/format";

interface MovieHeadingProps {
  movieDetails: MovieDetails;
}

function MovieHeading({ movieDetails }: MovieHeadingProps) {
  return (
    <>
      {movieDetails.tagline && (
        <p className="text-muted h-5 tracking-wider uppercase">
          {movieDetails.tagline}
        </p>
      )}
      <h1 className="text-foreground font-barlow mt-2 origin-left text-8xl font-bold tracking-tight text-balance uppercase">
        {movieDetails.title}
      </h1>
      <div className="text-foreground mt-6 flex items-center gap-5">
        {movieDetails.release_date && (
          <p className="text-xl">{movieDetails.release_date.slice(0, 4)}</p>
        )}
        {movieDetails.release_date && movieDetails.runtime !== 0 && (
          <span className="text-muted font-sans text-xs font-light">|</span>
        )}
        {movieDetails.runtime !== 0 && (
          <p className="text-xl">{formatMovieLength(movieDetails.runtime)}</p>
        )}
        <ul className="ml-4 flex gap-2">
          {movieDetails.genres.map((genre) => (
            <li
              key={genre.id}
              className="border-border bg-surface text-foreground rounded-full border px-3 py-1 text-sm"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-foreground mt-6 text-lg leading-7 font-light">
        {movieDetails.overview}
      </p>
    </>
  );
}

export default MovieHeading;
