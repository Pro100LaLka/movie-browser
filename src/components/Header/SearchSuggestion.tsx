import { Link } from "react-router";
import type { SearchMovie, SearchTV } from "../../types/shared";

interface SearchSuggestionProps {
  result: SearchTV | SearchMovie;
  setFocused: (isFocused: boolean) => void;
}

function SearchSuggestion({ result, setFocused }: SearchSuggestionProps) {
  return (
    <Link
      onClick={() => setFocused(false)}
      to={`/${result.media_type === "movie" ? "movies" : "tv"}/${result.id}`}
      className="hover:bg-surface-hover hover:border-l-primary line-clamp-2 flex items-center gap-4 rounded-md border-l-6 border-l-transparent px-3 py-1.5"
    >
      <div className="aspect-2/3 w-13 overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
          alt=""
        />
      </div>
      {result.media_type === "movie" && (
        <div>
          <p className="text-foreground text-lg text-balance">{result.title}</p>
          <p className="text-muted flex gap-1.5">
            <span>Movie</span>
            <span>&middot;</span>
            <span>{result.release_date.slice(0, 4)}</span>
          </p>
        </div>
      )}
      {result.media_type === "tv" && (
        <div>
          <p className="text-foreground text-lg text-balance">{result.name}</p>
          <p className="text-muted flex gap-1.5">
            <span>TV show</span>
            <span>&middot;</span>
            <span>{result.first_air_date.slice(0, 4)}</span>
          </p>
        </div>
      )}
    </Link>
  );
}

export default SearchSuggestion;
