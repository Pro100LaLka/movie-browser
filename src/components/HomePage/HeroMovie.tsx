import type { MovieDetails, MovieSummary } from "../../types/movies";
import { formatRating } from "../../utils/format";
import BookmarkIcon from "../icons/BookmarkIcon";
import InfoIcon from "../icons/InfoIcon";
import PlayIcon from "../icons/PlayIcon";
import StarIcon from "../icons/StarIcon";

interface HeroMovieProps {
  heroMovieSum: MovieSummary;
  heroMovieDet: MovieDetails | undefined;
}

function HeroMovie({ heroMovieSum, heroMovieDet }: HeroMovieProps) {
  return (
    <>
      <p className="text-muted h-5 text-sm tracking-wider uppercase">
        {heroMovieDet?.tagline}
      </p>
      {/* <h1 className="text-foreground font-barlow origin-left scale-x-75 text-8xl font-bold tracking-tight text-balance uppercase">
              {heroMovieSum.title}
            </h1> */}
      <h1 className="text-foreground font-barlow tracking origin-left scale-x-60 text-8xl font-bold text-balance uppercase">
        {heroMovieSum.title}
      </h1>
      <div className="text-foreground mt-2 flex gap-5">
        <p className="">{heroMovieSum.release_date.slice(0, 4)}</p>
        <span className="font-serif">|</span>
        {heroMovieDet && (
          <>
            <ul className="flex gap-5">
              {heroMovieDet.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <span className="font-serif">|</span>
          </>
        )}
        <p className="flex items-center gap-1.5">
          <StarIcon />
          <span>{formatRating(heroMovieSum.vote_average)}</span>
          <span className="text-muted"> / 10</span>
        </p>
      </div>
      <p className="text-muted mt-3 line-clamp-2 max-w-1/3">
        {heroMovieSum.overview}
      </p>
      <div className="mt-4 flex gap-6">
        <button className="text-on-primary hover:bg-primary-hover bg-primary active:bg-primary-active flex items-center gap-4 rounded-lg px-7 py-3 font-semibold">
          <InfoIcon />
          View details
        </button>
        <button className="text-foreground hover:bg-surface ring-border hover:ring-border-hover active:bg-surface-hover active:ring-border-active flex items-center gap-4 rounded-lg px-7 py-3 font-semibold ring-2 ring-inset">
          <BookmarkIcon />
          Add to watchlist
        </button>
        <button className="text-foreground hover:text-primary-hover active:text-primary-active flex items-center gap-4 self-stretch px-2 font-semibold">
          <PlayIcon />
          Watch trailer
        </button>
      </div>
    </>
  );
}

export default HeroMovie;
