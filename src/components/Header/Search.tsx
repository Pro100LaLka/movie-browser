import SearchIcon from "../Icons/SearchIcon";
import { useState } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { MIN_SEARCH_LENGTH } from "../../constants/movies";
import useSearchQuery from "../../hooks/useSearchQuery";
import SearchSuggestionsList from "./SearchSuggestionsList";
import { useNavigate, useSearchParams } from "react-router";

function Search() {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebouncedValue(query.trim());

  const [focused, setFocused] = useState<boolean>(false);

  const searchQuery = useSearchQuery(debouncedQuery);

  const navigate = useNavigate();
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    navigate(`/search?${new URLSearchParams({ q: query.trim() })}`);
  }

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
          onKeyDown={handleEnter}
          autoComplete="off"
        />
      </label>
      {focused && debouncedQuery.length >= MIN_SEARCH_LENGTH && (
        <SearchSuggestionsList
          query={debouncedQuery}
          isPending={searchQuery.isPending}
          isError={searchQuery.isError}
          results={searchQuery.data?.results}
          setFocused={setFocused}
          refetch={searchQuery.refetch}
        />
      )}
    </div>
  );
}

export default Search;
