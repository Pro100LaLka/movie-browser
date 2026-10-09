import type { MovieSummary } from "../../types/movies";
import { formatRating } from "../../utils/format";
import StarIcon from "../icons/StarIcon";

interface MovieCardProps {
  movie: MovieSummary;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        <img
          className="pointer-events-none"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div>
        <h3 className="text-foreground mt-2 font-medium">{movie.title}</h3>
        <div className="text-muted mt-2 flex gap-3">
          <p>{movie.release_date.slice(0, 4)}</p>
          <span className="font-serif">|</span>
          <p className="flex items-center gap-1.5">
            <StarIcon />
            <span>{formatRating(movie.vote_average)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
