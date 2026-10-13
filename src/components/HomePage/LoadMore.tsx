interface LoadMoreProps {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function LoadMore({ isFetchingNextPage, fetchNextPage }: LoadMoreProps) {
  return (
    <>
      {isFetchingNextPage ? (
        <p className="text-foreground text-xl">Loading more movies...</p>
      ) : (
        <button
          onClick={() => fetchNextPage()}
          className="bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active rounded-lg px-5 py-2 text-xl font-medium"
        >
          Load more
        </button>
      )}
    </>
  );
}

export default LoadMore;
