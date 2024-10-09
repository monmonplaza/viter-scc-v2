import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import {
  formatDate,
  formatInPeso,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/Nodata.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import Pill from "@/components/partials/Pill.jsx";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SquarePen, Trash } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import ModalPettyCash from "./ModalPettyCash";

const PettyCashList = ({ setItemEdit, itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  let counter = 1;
  let totalCashIn = 0;
  let totalCashOut = 0;
  let totalAmount = 0;

  const { handleRemove, handleEdit, aid, data } = useTableActions({
    setItemEdit,
  });

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["petty-cash", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/petty-cash/search`, // search endpoint
        `/${ver}/petty-cash/page/${pageParam}`, // list endpoint
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
    refetchOnWindowFocus: false,
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
        {isFetching && <SpinnerTable />}

        <div className="table-wrapper">
          <table
            className={`${result?.pages[0].count > 22 ? "has-sticky" : ""}`}
          >
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[200px]">Date</th>
                <th className="w-[200px]">Reference no.</th>
                <th className="w-[200px] text-right">Cash In</th>
                <th className="w-[200px] text-right">Cash Out</th>
                <th className="min-w-[200px] text-right">Total Petty Cash</th>
              </tr>
            </thead>

            <tbody>
              {((!isFetching && status === "loading") ||
                result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {!isFetching && status === "loading" ? (
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
                    totalCashIn += Number(item.petty_cash_in);
                    totalCashOut += Number(item.petty_cash_out);
                    totalAmount +=
                      Number(item.petty_cash_in) - Number(item.petty_cash_out);
                    return (
                      <tr key={key}>
                        <td className="w-counter">{counter++}.</td>

                        <td>{formatDate(item.petty_cash_date)}</td>
                        <td>{item.petty_cash_reference_no}</td>
                        <td className="text-right">
                          {formatInPeso(item.petty_cash_in)}
                        </td>
                        <td className="text-right">
                          {formatInPeso(item.petty_cash_out)}
                        </td>
                        <td className="text-right">
                          {formatInPeso(item.petty_cash_total)}
                        </td>

                        {item.petty_cash_last_insert === 1 && (
                          <td className="table-action">
                            <ul>
                              <li>
                                <button
                                  data-tooltip="Edit"
                                  className="tooltip"
                                  onClick={() =>
                                    handleEdit(item.product_aid, item)
                                  }
                                >
                                  <SquarePen size={14} />
                                </button>
                              </li>
                              <li>
                                <button
                                  data-tooltip="Delete"
                                  className="tooltip"
                                  onClick={() =>
                                    handleRemove(item.petty_cash_aid, item)
                                  }
                                >
                                  <Trash size={14} />
                                </button>
                              </li>
                            </ul>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}

              {result?.pages[0].data.length > 0 && (
                <tr className="hover:shadow-none font-bold">
                  <td colSpan={4} className="text-right">
                    {formatInPeso(totalCashIn)}
                  </td>
                  <td className="text-right">{formatInPeso(totalCashOut)}</td>
                  <td className="text-right">{formatInPeso(totalAmount)}</td>
                </tr>
              )}
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

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/petty-cash/${aid}`}
          queryKey="petty-cash"
          item={formatDate(data.petty_cash_date)}
        />
      )}
      {store.isAdd && (
        <ModalPettyCash
          itemEdit={itemEdit}
          totalCount={result?.pages[0].data.length}
        />
      )}
    </>
  );
};

export default PettyCashList;
