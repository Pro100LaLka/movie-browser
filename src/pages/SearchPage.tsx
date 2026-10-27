import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useSearchQuery from "../hooks/useSearchQuery";
import MovieList from "../components/HomePage/MovieList";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const navigate = useNavigate();

  const searchQuery = useSearchQuery(query, 1);
  const movies = searchQuery.data?.results.filter(
    (result) => result.media_type === "movie",
  );

  useEffect(() => {
    if (query.length === 0) {
      navigate("/movies", { replace: true });
    }
  });

  return (
    <>
      <h1 className="text-foreground mt-5 text-4xl font-medium">
        Results for "{query}"
      </h1>
      <p className="text-muted mt-2.5">{movies?.length ?? 0} results</p>
      <div className="border-border mt-10 border-t pt-6">
        <MovieList
          movies={movies}
          isPending={searchQuery.isPending}
          error={searchQuery.isError}
        />
      </div>
      <div className="h-10"></div>
    </>
  );
}

export default SearchPage;
