import SpinnerButton from "./spinners/SpinnerButton.jsx";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
  isSearchOrFilter,
}) => {
  if (page === result?.total_pages && !isSearchOrFilter) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            className="h-full relative my-3 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-not-allowed"
          >
            <SpinnerButton />
          </button>
        ) : (
          <div className="my-3 mb-1 p-1.5 text-xs opacity-60">End of list.</div>
        )}
      </>
    );
  }
  if (!hasNextPage && !isSearchOrFilter) {
    return (
      <div className="my-3 mb-1 p-1.5 text-xs opacity-60">End of list.</div>
    );
  }
  if (hasNextPage && !isSearchOrFilter) {
    return (
      <button
        ref={refView}
        type="button"
        disabled={isFetchingNextPage}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className="h-full relative my-3 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-not-allowed"
      >
        {isFetchingNextPage ? <SpinnerButton /> : <span>Load more</span>}
      </button>
    );
  }
};

export default Loadmore;
