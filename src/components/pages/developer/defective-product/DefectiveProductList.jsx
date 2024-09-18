import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import {
  formatDate,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/Nodata.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import ModalAdvanceConfirm from "@/components/partials/modal/ModalAdvanceConfirm";
import PillStatus from "@/components/partials/PillStatus";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setIsSearch } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ArchiveRestore, ClipboardCheck } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const DefectiveProductList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const search = React.useRef({ value: "" });
  let counter = 1;
  let totalAmount = 0;

  const [
    handleReset,
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleSuspend,
    aid,
    data,
    isActive,
  ] = useTableActions({
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
    queryKey: [
      "defectiveProduct",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/defective-product/search`, // search endpoint
        `/${ver}/defective-product/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          defective_product_is_resolve: filterData,
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

  const handleChangefilterData = (e) => {
    setFilterData(e.target.value);
    setIsFilter(false);
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
      dispatch(setIsSearch(true));
    }
    setPage(1);
  };

  return (
    <>
      <div className="table-filter flex flex-col md:flex-row justify-between items-center gap-4 mb-1">
        <div className="input-wrap filter w-full md:w-auto">
          <select
            name=""
            id=""
            value={filterData}
            onChange={(e) => handleChangefilterData(e)}
          >
            <option value="all">All</option>
            <option value="1">Resolve</option>
            <option value="0">Ongoing</option>
          </select>
        </div>

        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
          isFilter={isFilter}
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
                <th className="w-[90px]">Status</th>
                <th className="min-w-[200px]">Date Received</th>
                <th className="min-w-[200px]">Date Resolved</th>
                <th className="w-[200px]">Supplier</th>
                <th className="w-[200px]">Product</th>
                <th className="w-[200px]">Unit</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Amount</th>
                <th>Remarks</th>
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
                    totalAmount += Number(item.defective_product_amount);
                    return (
                      <tr key={key}>
                        <td className="w-counter">{counter++}.</td>
                        <td>
                          {
                            <PillStatus
                              isActive={item.defective_product_is_resolve}
                              text="Resolve"
                            />
                          }
                        </td>

                        <td>{formatDate(item.receiving_date)}</td>
                        <td>
                          {formatDate(
                            item.defective_product_resolved_date,
                            "--"
                          )}
                        </td>
                        <td>{item.supplier_name}</td>
                        <td>{item.product_name}</td>
                        <td>{item.settings_unit_name}</td>
                        <td className="text-center">
                          {item.defective_product_qty}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.defective_product_amount,
                            2
                          )}
                        </td>
                        <td>{item.defective_product_remarks}</td>

                        <td className="table-action">
                          <ul>
                            {item.defective_product_is_resolve === 0 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Resolve"
                                    className="tooltip"
                                    onClick={() =>
                                      handleRestore(
                                        item.defective_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <ClipboardCheck size={14} />
                                  </button>
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Restore"
                                    className="tooltip"
                                    onClick={() =>
                                      handleArchive(
                                        item.defective_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <ArchiveRestore size={14} />
                                  </button>
                                </li>
                              </>
                            )}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
            <tbody>
              <tr className="!shadow-none font-bold">
                <td className="text-right" colSpan={8}>
                  Total :
                </td>
                <td className="text-right">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </td>
                <td></td>
              </tr>
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
              isSearchOrFilter={store.isSearch || isFilter}
            />
          </div>
        </div>
      </div>
      {store.isConfirm && (
        <ModalAdvanceConfirm
          mysqlApiArchive={`/${ver}/defective-product/active/${aid}`}
          queryKey="defectiveProduct"
          item={`${data.product_name} (${formatDate(data.receiving_date)})`}
          active={isActive}
          text={isActive ? "resolved" : "restore"}
          itemData={data}
        />
      )}
    </>
  );
};

export default DefectiveProductList;
