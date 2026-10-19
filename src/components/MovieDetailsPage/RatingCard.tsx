import { formatRating } from "../../utils/format";
import StarIcon from "../Icons/StarIcon";

interface RatingCardProps {
  voteAverage: number;
  voteCount: number;
}

function RatingCard({ voteAverage, voteCount }: RatingCardProps) {
  return (
    <div className="bg-surface border-border flex items-center justify-between rounded-xl border p-4">
      <div>
        {voteAverage === 0 || voteCount === 0 ? (
          <span>Not rated</span>
        ) : (
          <p className="flex items-center gap-3 text-xl">
            <StarIcon />
            <span className="flex items-center gap-1">
              <span className="text-foreground text-[1.625rem] font-medium tracking-wide">
                {formatRating(voteAverage)}
              </span>
              <span className="text-muted mt-1.5 text-base">/ 10</span>
            </span>
          </p>
        )}
      </div>
      <p className="text-muted">{voteCount.toLocaleString("en-US")} votes</p>
    </div>
  );
}

export default RatingCard;
