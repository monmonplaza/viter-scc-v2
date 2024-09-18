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
import ModalAdvanceDelete from "@/components/partials/modal/ModalAdvanceDelete";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import Pill from "@/components/partials/Pill.jsx";
import PillStatus from "@/components/partials/PillStatus";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setIsSearch } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Archive, ArchiveRestore, SquarePen, Trash } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const ReturnProductList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const search = React.useRef({ value: "" });
  let counter = 1;

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
      "return-product",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/return-product/search`, // search endpoint
        `/${ver}/return-product/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          return_product_is_resolved: filterData,
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

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

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
            <option value="1">Resolved</option>
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
                <th className="w-[200px]">Name</th>
                <th className="w-[200px]">Date</th>
                <th className="text-center">Qyt</th>
                <th className="w-[200px]">Resolved Date</th>
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
                        <td className="w-counter">{counter++}</td>
                        <td>
                          {
                            <PillStatus
                              isActive={item.return_product_is_resolved}
                              text="Resolve"
                            />
                          }
                        </td>

                        <td>{item.product_name}</td>
                        <td>{formatDate(item.return_product_date)}</td>
                        <td className="text-center">
                          {item.return_product_qty}
                        </td>
                        <td>
                          {formatDate(item.return_product_resolved_date, "--")}
                        </td>

                        <td className="table-action">
                          <ul>
                            {item.return_product_is_resolved === 1 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                    onClick={() =>
                                      handleEdit(
                                        item.return_return_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <SquarePen size={14} />
                                  </button>
                                </li>

                                <li>
                                  <button
                                    data-tooltip="Archive"
                                    className="tooltip"
                                    onClick={() =>
                                      handleArchive(
                                        item.return_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <Archive size={14} />
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
                                      handleRestore(
                                        item.return_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <ArchiveRestore size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-tooltip="Delete"
                                    className="tooltip"
                                    onClick={() =>
                                      handleRemove(
                                        item.return_product_aid,
                                        item
                                      )
                                    }
                                  >
                                    <Trash size={14} />
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

      {store.isDelete && (
        <ModalAdvanceDelete
          mysqlApiDelete={`/${ver}/return-product/${aid}`}
          queryKey="return-product"
          dataItem={data.product_name}
          item={data}
        />
      )}
      {store.isConfirm && (
        <ModalAdvanceConfirm
          mysqlApiArchive={`/${ver}/return-product/active/${aid}`}
          queryKey="return-product"
          item={`${data.product_name} (${formatDate(
            data.return_product_date
          )})`}
          active={isActive}
          text={isActive ? "resolved" : "restore"}
          itemData={data}
        />
      )}
    </>
  );
};

export default ReturnProductList;
