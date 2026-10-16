import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import MovieDetails from "../components/MovieDetailsPage/MovieDetails";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const id = Number(movieId);
  const isValid = Number.isInteger(id) && id > 0;

  return isValid ? <MovieDetails id={id} /> : <NotFoundPage />;
}

export default MovieDetailsPage;
