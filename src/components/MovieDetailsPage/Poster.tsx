interface PosterProps {
  poster_path: string;
}

function Poster({ poster_path }: PosterProps) {
  return (
    <div className="border-border/50 aspect-2/3 overflow-hidden rounded-2xl border">
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
    </div>
  );
}

export default Poster;
