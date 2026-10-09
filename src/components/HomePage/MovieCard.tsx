import type { MovieSummary } from "../../types/movies";
import { formatRating } from "../../utils/format";
import StarIcon from "../icons/StarIcon";

interface MovieCardProps {
  movie: MovieSummary;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
      <div className="group-hover:outline-primary aspect-2/3 overflow-hidden rounded-lg outline-2 outline-transparent transition-colors duration-300">
        <img
          className="pointer-events-none transition-transform duration-300 group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div>
        <h3 className="text-foreground group-hover:text-primary-hover mt-2 font-medium transition-colors duration-300">
          {movie.title}
        </h3>
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
