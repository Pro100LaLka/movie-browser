import BookmarkIcon from "../icons/BookmarkIcon";
import PlayIcon from "../icons/PlayIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ShareIcon from "../icons/ShareIcon";

interface PrimaryActionsProps {
  imdbId: string;
}

function PrimaryActions({ imdbId }: PrimaryActionsProps) {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <button className="text-on-primary hover:bg-primary-hover bg-primary active:bg-primary-active outline-primary flex cursor-pointer items-center justify-center gap-4 rounded-lg border border-transparent py-3 font-semibold outline-offset-3 focus-visible:outline-2">
        <PlayIcon />
        Watch trailer
      </button>
      <button className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex cursor-pointer items-center justify-center gap-4 rounded-lg border-2 py-2.5 font-semibold outline-offset-3 focus-visible:outline-2">
        <BookmarkIcon />
        Add to watchlist
      </button>
      <div className="flex w-full gap-3">
        <a
          href={`https://www.imdb.com/title/${imdbId}/`}
          target="_blank"
          className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-sm outline-offset-3 focus-visible:outline-2"
        >
          View on IMDb
          <RedirectIcon />
        </a>
        <button className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-sm outline-offset-3 focus-visible:outline-2">
          Share
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}

export default PrimaryActions;
