function MovieDetails({ id }: { id: number }) {
  return (
    <h1 className="text-foreground">This is a movie page of the movie {id}</h1>
  );
}

export default MovieDetails;
