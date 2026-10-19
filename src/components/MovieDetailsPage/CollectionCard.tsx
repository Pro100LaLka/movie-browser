import type { Collection } from "../../types/movies";
import ArrowIcon from "../icons/ArrowIcon";

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="bg-surface border-border relative overflow-hidden rounded-xl border">
      <img
        className="absolute top-1/2 right-0 w-2/3 -translate-y-1/2 select-none"
        src={`https://image.tmdb.org/t/p/w780${collection.backdrop_path}`}
        alt=""
      />
      <div className="from-surface absolute h-full w-full bg-linear-to-r from-35% to-transparent to-100%"></div>
      <div className="from-surface to-surface/60 absolute h-full w-full bg-linear-to-r from-35% to-50%"></div>

      <div className="relative z-1 flex items-center gap-6 px-6 py-4">
        <div className="border-border aspect-2/3 w-18 overflow-hidden rounded-md border">
          <img
            src={`https://image.tmdb.org/t/p/w185${collection.poster_path}`}
            alt=""
          />
        </div>
        <div>
          <h2 className="text-muted text-sm tracking-wider uppercase">
            part of a collection
          </h2>
          <p className="text-foreground mt-1 text-2xl font-semibold">
            {collection.name}
          </p>
        </div>
        <div className="ml-auto">
          <button className="text-foreground border-border-hover bg-surface/70 hover:bg-surface-hover/70 hover:border-border-active active:bg-surface-active/70 flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-medium">
            View collection
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
