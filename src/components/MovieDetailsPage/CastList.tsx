import { useEffect } from "react";
import type { Cast } from "../../types/movies";

function CastList({ cast }: { cast: Cast[] | undefined }) {
  useEffect(() => {
    console.log(cast);
  }, [cast]);

  return <h3>Cast</h3>;
}

export default CastList;
