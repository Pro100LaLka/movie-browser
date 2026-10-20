export function formatRating(vote_average: number) {
  return (Math.round(vote_average * 10) / 10).toFixed(1);
}

export function formatMovieLength(runtime: number) {
  const minutes = runtime % 60;
  const hours = (runtime - minutes) / 60;
  return `${hours}h ${minutes}m`;
}
