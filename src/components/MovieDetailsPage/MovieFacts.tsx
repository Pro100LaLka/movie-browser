import type { MovieDetails } from "../../types/movies";
import type { Credits } from "../../utils/select";

interface MovieFactsProps {
  credits: Credits | undefined;
  movieDetails: MovieDetails;
}

function MovieFacts({ credits, movieDetails }: MovieFactsProps) {
  return (
    <ul className="border-border grid grid-cols-3 items-center gap-y-5 border-y py-5">
      {credits && credits?.directors.length !== 0 && (
        <li>
          <p className="text-muted text-sm">
            Director
            {credits?.directors && credits?.directors.length > 1 && "s"}
          </p>
          <p className="text-foreground">
            {credits?.directors.map((director) => director.name).join(", ")}
          </p>
        </li>
      )}
      {credits && credits?.writers.length !== 0 && (
        <li>
          <p className="text-muted text-sm">
            Writer
            {credits?.writers && credits?.writers.length > 1 && "s"}
          </p>
          <p className="text-foreground">
            {credits?.writers.map((writer) => writer.name).join(", ")}
          </p>
        </li>
      )}
      <li>
        <p className="text-muted text-sm">Release date</p>
        <p className="text-foreground">
          {new Date(movieDetails.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </li>
      <li>
        <p className="text-muted text-sm">Status</p>
        <p className="text-foreground">{movieDetails.status}</p>
      </li>
      <li>
        <p className="text-muted text-sm">Language</p>
        <p className="text-foreground">
          {new Intl.DisplayNames(["en"], { type: "language" }).of(
            movieDetails.original_language,
          )}
        </p>
      </li>
      <li>
        <p className="text-muted text-sm">Production</p>
        <p className="text-foreground">
          {movieDetails.production_companies[0]?.name}
        </p>
      </li>
      {movieDetails.budget !== 0 && (
        <li>
          <p className="text-muted text-sm">Budget</p>
          <p className="text-foreground">
            {new Intl.NumberFormat(["en"], {
              currency: "usd",
              notation: "compact",
              maximumFractionDigits: 1,
              style: "currency",
            }).format(movieDetails.budget)}
          </p>
        </li>
      )}
      {movieDetails.revenue !== 0 && (
        <li>
          <p className="text-muted text-sm">Revenue</p>
          <p className="text-foreground">
            {new Intl.NumberFormat(["en"], {
              currency: "usd",
              notation: "compact",
              maximumFractionDigits: 1,
              style: "currency",
            }).format(movieDetails.revenue)}
            {movieDetails.budget !== 0 && (
              <span className="text-muted text-sm">
                {" "}
                &middot;{" "}
                {(movieDetails.revenue / movieDetails.budget).toFixed(1)}
                &times; budget
              </span>
            )}
          </p>
        </li>
      )}
    </ul>
  );
}

export default MovieFacts;
