import { useQuery } from "@tanstack/react-query";
import SearchIcon from "../Icons/SearchIcon";
import { useState } from "react";
import { fetchSearchResults } from "../../api/search";
import { selectSearchMediaType } from "../../utils/select";
import { Link } from "react-router";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import LoadingDotsIcon from "../Icons/LoadingDotsIcon";
import EmptySearchIcon from "../Icons/EmptySearchIcon";
import ExclamationIcon from "../Icons/ExclamationIcon";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const [focused, setFocused] = useState(false);

  const searchQuery = useQuery({
    queryKey: [debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length >= 3,

    select: selectSearchMediaType,

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="relative"
    >
      <label className="bg-background/80 text-foreground border-border has-focus:outline-primary flex min-w-100 cursor-text items-center gap-4 rounded-lg border px-4 py-2.5 has-focus:outline-2">
        <SearchIcon />
        <input
          className="placeholder:text-muted w-full focus:outline-none"
          placeholder="Search for movies, TV shows..."
          type="text"
          name="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>
      {focused && debouncedQuery.length >= 3 && (
        <ul className="bg-surface border-border text text-foreground absolute top-12 right-0 min-w-110 rounded-2xl border-2 py-2">
          {searchQuery.isFetching && (
            <li className="text-muted flex items-center gap-4 px-7 py-4">
              <LoadingDotsIcon />
              <p>
                Searching for{" "}
                <span className="text-foreground">"{debouncedQuery}"</span>
              </p>
            </li>
          )}
          {searchQuery.isError && (
            <li className="text-muted flex flex-col items-center py-6">
              <div className="bg-surface-hover flex size-12 items-center justify-center rounded-full">
                <ExclamationIcon />
              </div>
              <p className="text-foreground mt-3 text-lg font-medium">
                Couldn't load results
              </p>
              <p>Check your connection and try again.</p>
              <button
                onClick={() => searchQuery.refetch()}
                className="text-foreground border-border hover:bg-surface-hover/50 active:bg-surface-active/70 mt-4 rounded-lg border px-4 py-1.5"
              >
                Try again
              </button>
            </li>
          )}
          {searchQuery.data &&
            (searchQuery.data.results.length === 0 ? (
              <li className="text-muted flex flex-col items-center py-6">
                <div className="bg-surface-hover flex size-12 items-center justify-center rounded-full">
                  <EmptySearchIcon />
                </div>
                <p className="text-foreground mt-3 text-lg font-medium">
                  No results for "{debouncedQuery}"
                </p>
                <p>Check the spelling or try a different title.</p>
              </li>
            ) : (
              searchQuery.data.results.slice(0, 5).map((result) => (
                <li key={`${result.media_type}-${result.id}`}>
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
                        <p className="text-foreground text-lg text-balance">
                          {result.title}
                        </p>
                        <p className="text-muted flex gap-1.5">
                          <span>Movie</span>
                          <span>&middot;</span>
                          <span>{result.release_date.slice(0, 4)}</span>
                        </p>
                      </div>
                    )}
                    {result.media_type === "tv" && (
                      <div>
                        <p className="text-foreground text-lg text-balance">
                          {result.name}
                        </p>
                        <p className="text-muted flex gap-1.5">
                          <span>TV show</span>
                          <span>&middot;</span>
                          <span>{result.first_air_date.slice(0, 4)}</span>
                        </p>
                      </div>
                    )}
                  </Link>
                </li>
              ))
            ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
