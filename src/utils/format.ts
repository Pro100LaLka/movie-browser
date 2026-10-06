export function formatRating(vote_average: number): number {
  return Math.round(vote_average * 10) / 10;
}
