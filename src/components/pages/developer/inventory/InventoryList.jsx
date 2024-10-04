import {
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/Nodata.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";

const InventoryList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["inventory", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/inventory/search`, // search endpoint
        `/${ver}/inventory/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          searchValue: search?.current?.value,
        }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="table-filter flex flex-col md:flex-row justify-between items-center gap-4 mb-1">
        <div></div>
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>
      <div className="relative">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper">
          <table
            className={`${result?.pages[0].count > 22 ? "has-sticky" : ""}`}
          >
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[200px]">SKU</th>
                <th className="w-[200px]">Product</th>
                <th className="w-[200px] text-right">Stock In</th>
                <th className="w-[200px] text-right">Stock Out</th>
                <th className="w-[200px] text-right">Defective</th>
                <th className="w-[200px] text-right">Stock Available</th>
              </tr>
            </thead>

            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {status === "loading" ? (
                      <LoaderTable count={30} cols={6} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              )}

              {result?.pages.map((page, key) => (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td className="w-counter">{counter++}.</td>

                        <td>{item.product_sku}</td>
                        <td>{item.product_name}</td>
                        <td className="text-right">
                          {Number(item.inventory_log_stock_in)}
                        </td>
                        <td className="text-right">
                          {Number(item.inventory_log_stock_out) -
                            Number(item.inventory_log_return_product)}
                        </td>
                        <td className="text-right">
                          {Number(item.inventory_log_defective_product) +
                            Number(item.inventory_log_refund_product)}
                        </td>
                        <td className="text-right">
                          {Number(item.inventory_log_stock_in) +
                            Number(item.inventory_log_return_product) -
                            Number(item.inventory_log_stock_out) -
                            Number(item.inventory_log_refund_product) -
                            Number(item.inventory_log_defective_product)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="loadmore flex justify-center flex-col items-center ">
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
              isSearchOrFilter={store.isSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryList;
