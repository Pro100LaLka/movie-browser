interface PosterProps {
  poster_path: string;
}

function Poster({ poster_path }: PosterProps) {
  return (
    <div className="border-border/50 overflow-hidden rounded-2xl border">
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
    </div>
  );
}

export default Poster;
