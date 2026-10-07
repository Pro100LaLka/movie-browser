import { useState } from "react";
import clsx from "clsx";

export function HomeBackground({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img
        onLoad={() => setIsLoaded(true)}
        src={`https://image.tmdb.org/t/p/original${src}`}
        alt=""
        className={clsx(
          "absolute top-0 right-0 -z-20 w-4/5 -translate-y-1/10 transition-opacity duration-2000 select-none",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-to-t from-35% to-transparent to-70%"></div>
      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-30 from-35% to-transparent to-50%"></div>
      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-60 from-25% to-transparent to-50%"></div>
      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-90 from-22% to-transparent to-40%"></div>
      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-110 from-20% to-transparent to-40%"></div>
      <div className="from-background absolute top-0 left-0 -z-10 h-dvh w-full bg-linear-170 from-10% to-transparent to-25%"></div>
    </>
  );
}
