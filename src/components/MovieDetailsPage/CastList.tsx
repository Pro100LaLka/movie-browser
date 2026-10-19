import { useEffect } from "react";
import type { Cast } from "../../types/movies";
import HorizontalScroller from "../HorizontalScroller";
import UserIcon from "../icons/UserIcon";

function CastList({ cast }: { cast: Cast[] | undefined }) {
  useEffect(() => {
    console.log(cast);
  }, [cast]);

  return (
    cast && (
      <>
        <h2 className="text-foreground text-4xl font-medium">Cast</h2>
        <HorizontalScroller>
          <ul className="mt-6 flex gap-10 px-2">
            {cast.map((actor) => (
              <li className="flex flex-col items-center">
                <div className="text-border-hover bg-surface-hover ring-border-hover flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full ring ring-inset">
                  <UserIcon />
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt=""
                  />
                </div>
                <h3 className="text-foreground mt-3 text-center text-lg">
                  {actor.name}
                </h3>
                <p className="text-muted text-center text-balance">
                  {actor.character}
                </p>
              </li>
            ))}
          </ul>
        </HorizontalScroller>
      </>
    )
  );
}

export default CastList;
