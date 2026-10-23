import { useQuery } from "@tanstack/react-query";
import SearchIcon from "../Icons/SearchIcon";
import { useEffect, useState } from "react";
import { fetchSearchResults } from "../../api/search";
import { selectSearchMediaType } from "../../utils/select";
import { Link, useLocation, useNavigation } from "react-router";
import useDebouncedValue from "../../hooks/useDebouncedValue";

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

  useEffect(() => {
    console.log(searchQuery.data);
  }, [searchQuery.data]);

  const location = useLocation();

  useEffect(() => {
    setQuery("");
  }, [location]);

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="relative"
    >
      <label className="bg-background/75 text-foreground border-border has-focus:outline-primary flex min-w-100 cursor-text items-center gap-4 rounded-lg border px-4 py-2.5 has-focus:outline-2">
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
      {focused && query.length >= 3 && (
        <ul className="bg-surface border-border text text-foreground absolute top-12 right-0 min-w-110 rounded-2xl border-2 py-2">
          {searchQuery.data?.results.slice(0, 5).map((result) => (
            <li key={`${result.media_type}-${result.id}`}>
              <Link
                onClick={() => setFocused(false)}
                to={`/${result.media_type === "movie" ? "movies" : "tv"}/${result.id}`}
                className="hover:bg-surface-hover hover:border-l-primary line-clamp-2 flex items-center gap-4 rounded-md border-l-6 border-l-transparent px-3 py-1.5"
              >
                <div className="w-13 overflow-hidden rounded-lg">
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
                      <span className="capitalize">{result.media_type}</span>
                      <span>&middot;</span>
                      <span>{result.release_date.slice(0, 4)}</span>
                    </p>
                  </div>
                )}
                {result.media_type === "tv" && <div></div>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
