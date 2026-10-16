import { useQuery } from "@tanstack/react-query";
import { fetchCredits } from "../../api/movies";
import { selectKeyCredits } from "../../utils/select";
import { useEffect } from "react";

function CastList({ id }: { id: number }) {
  const creditsQuery = useQuery({
    queryKey: ["credits", id],
    queryFn: () => fetchCredits(id),
    select: selectKeyCredits,
  });

  useEffect(() => {
    console.log(creditsQuery.data);
  }, [creditsQuery.data]);

  return <h3>Cast</h3>;
}

export default CastList;
