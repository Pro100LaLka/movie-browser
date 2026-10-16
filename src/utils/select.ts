import type { Cast, CreditsResponse, Crew } from "../types/movies";

export interface Credits {
  id: number;
  cast: Cast[];
  directors: Crew[];
  writers: Crew[];
}

export function selectKeyCredits(data: CreditsResponse): Credits {
  const id = data.id;

  const cast = [...data.cast].sort((a, b) => a.order - b.order).slice(0, 10);

  const directors = data.crew
    .filter((member) => member.job === "Director")
    .sort((a, b) => b.popularity - a.popularity)
    .filter(
      (member, index, array) =>
        array.findIndex((m) => member.id === m.id) === index,
    )
    .slice(0, 2);
  const writers = data.crew
    .filter((member) => member.department === "Writing")
    .sort((a, b) => b.popularity - a.popularity)
    .filter(
      (member, index, array) =>
        array.findIndex((m) => member.id === m.id) === index,
    )
    .slice(0, 2);

  return { id, cast, directors, writers };
}
