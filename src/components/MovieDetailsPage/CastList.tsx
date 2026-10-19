import { useEffect } from "react";
import type { Cast } from "../../types/movies";

function CastList({ cast }: { cast: Cast[] | undefined }) {
  useEffect(() => {
    console.log(cast);
  }, [cast]);

  return (
    <>
      <h2 className="text-foreground text-4xl font-medium">Cast</h2>
    </>
  );
}

export default CastList;
