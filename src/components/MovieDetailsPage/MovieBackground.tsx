import { useState } from "react";
import clsx from "clsx";

export function MovieBackground({ backdropPath }: { backdropPath: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img
        onLoad={() => setIsLoaded(true)}
        src={`https://image.tmdb.org/t/p/w300${backdropPath}`}
        alt=""
        className={clsx(
          "absolute top-0 right-0 -z-20 w-full -translate-y-1/3 transition-opacity duration-2000 select-none",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-to-t from-45% to-transparent to-55%"></div>
      <div className="bg-background/60 absolute top-0 left-0 -z-5 h-dvh w-full backdrop-blur-lg"></div>
    </>
  );
}
