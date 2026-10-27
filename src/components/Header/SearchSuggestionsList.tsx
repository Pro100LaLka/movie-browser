import EmptySearchIcon from "../Icons/EmptySearchIcon";
import ExclamationIcon from "../Icons/ExclamationIcon";
import LoadingDotsIcon from "../Icons/LoadingDotsIcon";
import type { SearchMovie, SearchTV } from "../../types/shared";
import SearchSuggestion from "./SearchSuggestion";
import SearchIcon from "../Icons/SearchIcon";
import { Link } from "react-router";

interface SearchSuggestionsListProps {
  query: string;
  isPending: boolean;
  isError: boolean;
  results: (SearchMovie | SearchTV)[] | undefined;
  setFocused: (isFocused: boolean) => void;
  refetch: () => void;
}

function SearchSuggestionsList({
  query,
  isPending,
  isError,
  results,
  setFocused,
  refetch,
}: SearchSuggestionsListProps) {
  return (
    <ul
      onMouseDown={(e) => e.preventDefault()}
      className="bg-surface border-border text text-foreground absolute top-12 right-0 min-w-110 rounded-2xl border-2 pt-2"
    >
      {isPending && (
        <li className="text-muted flex items-center gap-4 px-7 py-4">
          <LoadingDotsIcon />
          <p>
            Searching for <span className="text-foreground">"{query}"</span>
          </p>
        </li>
      )}
      {isError && (
        <li className="text-muted flex flex-col items-center py-6">
          <div className="bg-surface-hover flex size-12 items-center justify-center rounded-full">
            <ExclamationIcon />
          </div>
          <p className="text-foreground mt-3 text-lg font-medium">
            Couldn't load results
          </p>
          <p>Check your connection and try again.</p>
          <button
            onClick={() => refetch()}
            className="text-foreground border-border hover:bg-surface-hover/50 active:bg-surface-active/70 mt-4 rounded-lg border px-4 py-1.5"
          >
            Try again
          </button>
        </li>
      )}
      {results &&
        (results.length === 0 ? (
          <li className="text-muted flex flex-col items-center py-6">
            <div className="bg-surface-hover flex size-12 items-center justify-center rounded-full">
              <EmptySearchIcon />
            </div>
            <p className="text-foreground mt-3 text-lg font-medium">
              No results for "{query}"
            </p>
            <p>Check the spelling or try a different title.</p>
          </li>
        ) : (
          <>
            {results.slice(0, 5).map((result) => (
              <li key={`${result.media_type}-${result.id}`}>
                <SearchSuggestion result={result} setFocused={setFocused} />
              </li>
            ))}
            <li className="border-border mx-4 mt-2 flex items-center justify-between border-t-2 py-2.5">
              <p className="flex items-center gap-3 text-lg">
                <SearchIcon />
                <span className="text-base">See all results for "{query}"</span>
              </p>
              <Link
                to={`/search?q=${query.trim().replaceAll(" ", "%20")}`}
                className="bg-surface-hover/50 hover:bg-surface-hover active:bg-surface-active border-border rounded-lg border-2 px-3 py-1"
              >
                Enter
              </Link>
            </li>
          </>
        ))}
    </ul>
  );
}

export default SearchSuggestionsList;
