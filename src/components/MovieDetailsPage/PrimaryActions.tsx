import BookmarkIcon from "../Icons/BookmarkIcon";
import ImdbLogo from "../Icons/ImdbLogo";
import PlayIcon from "../Icons/PlayIcon";
import RedirectIcon from "../Icons/RedirectIcon";
import ShareIcon from "../Icons/ShareIcon";

interface PrimaryActionsProps {
  imdbId: string;
}

function PrimaryActions({ imdbId }: PrimaryActionsProps) {
  return (
    <div className="flex w-full gap-x-3">
      <button className="text-on-primary hover:bg-primary-hover bg-primary active:bg-primary-active outline-primary flex cursor-pointer items-center justify-center gap-4 rounded-lg border border-transparent px-5 py-2.5 font-semibold outline-offset-3 focus-visible:outline-2">
        <PlayIcon />
        Watch trailer
      </button>
      <button className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex cursor-pointer items-center justify-center gap-4 rounded-lg border-2 px-5 py-2.5 font-semibold outline-offset-3 focus-visible:outline-2">
        <BookmarkIcon />
        Add to watchlist
      </button>

      {imdbId && (
        <a
          href={`https://www.imdb.com/title/${imdbId}/`}
          target="_blank"
          className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-2.5 outline-offset-3 focus-visible:outline-2"
        >
          <ImdbLogo />
          View on IMDb
          <RedirectIcon />
        </a>
      )}
      <button className="text-foreground hover:bg-surface border-border hover:border-border-hover active:bg-surface-hover active:border-border-active outline-primary flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-2.5 outline-offset-3 focus-visible:outline-2">
        <ShareIcon />
        Share
      </button>
    </div>
  );
}

export default PrimaryActions;
