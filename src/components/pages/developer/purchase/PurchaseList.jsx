import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import {
  formatDate,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/NoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import ModalAdvanceConfirm from "@/components/partials/modal/ModalAdvanceConfirm";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import PillStatus from "@/components/partials/PillStatus";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setIsSearch } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArchiveRestore,
  ClipboardCheck,
  ScrollText,
  SquarePen,
  Trash,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const PurchaseList = ({ setItemEdit, setIsView }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [filterDate, setFilterDate] = React.useState("");
  const [isFilter, setIsFilter] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const search = React.useRef({ value: "" });
  let counter = 1;
  let totalAmount = 0;

  const {
    handleReset,
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleSuspend,
    aid,
    data,
    isActive,
  } = useTableActions({
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
    queryKey: ["purchase", search.current.value, store.isSearch, filterDate],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/purchase/search`, // search endpoint
        `/${ver}/purchase/page-group-reference-no/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          filterDate,
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

  const handleFilterDate = (e) => {
    setFilterDate(e.target.value);
    setIsFilter(true);
    dispatch(setIsSearch(true));
    search.current.value = "";
    if (e.target.value === "") {
      setFilterDate("");
      setIsFilter(false);
      dispatch(setIsSearch(false));
    }
    setPage(1);
  };

  const handleView = (item) => {
    setIsView(true);
    setItemEdit(item);
  };
  const handleClear = () => {
    setFilterDate("");
    setIsFilter(false);
    dispatch(setIsSearch(false));
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
      <div className="table-filter flex flex-col md:flex-row items-end gap-4 mb-1 ">
        <div className="input-wrap filter w-full md:w-auto">
          <label>Filter</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => handleFilterDate(e)}
          />
        </div>
        {filterDate !== "" && (
          <p
            className="hover:underline text-accent cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </p>
        )}
      </div>
      <div className="relative">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper  ">
          <table>
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[90px]">Status</th>
                <th className="">Purchase Date</th>
                <th className="">Delivery Date</th>
                <th className="">PO No.</th>
                <th className="text-right">Total Amount</th>
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
                    totalAmount += Number(item.total_amount);
                    return (
                      <tr key={key}>
                        <td className="w-counter">{counter++}.</td>
                        <td>
                          {
                            <PillStatus
                              isActive={item.purchase_is_ongoing}
                              text={`${
                                item.purchase_is_ongoing
                                  ? "approved"
                                  : "requested"
                              }`}
                            />
                          }
                        </td>
                        <td>{formatDate(item.purchase_date)}</td>
                        <td>{formatDate(item.purchase_delivery_start_date)}</td>
                        <td>{item.purchase_reference_no}</td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.purchase_total_amount,
                            2
                          )}
                        </td>
                        <td className="table-action">
                          <ul>
                            <li>
                              <button
                                data-tooltip="View"
                                className="tooltip"
                                onClick={() => handleView(item)}
                              >
                                <ScrollText size={14} />
                              </button>
                            </li>
                            {item.purchase_is_ongoing === 0 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                    onClick={() =>
                                      handleEdit(item.purchase_aid, item)
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
                                      handleRemove(
                                        item.purchase_reference_no,
                                        item
                                      )
                                    }
                                  >
                                    <Trash size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-tooltip="Approved"
                                    className="tooltip"
                                    onClick={() =>
                                      handleRestore(
                                        item.purchase_reference_no,
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
                                        item.purchase_reference_no,
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
                <td colSpan={5} className="text-right">
                  Total :
                </td>
                <td className="text-right">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </td>
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

      {!store.isAdd && store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/purchase/${aid}`}
          queryKey="purchase"
          item={formatDate(data.purchase_date)}
        />
      )}
      {!store.isAdd && store.isConfirm && (
        <ModalAdvanceConfirm
          mysqlApiArchive={`/${ver}/purchase/active`}
          queryKey="purchase"
          item={`${formatDate(data.purchase_date)} PO `}
          active={isActive}
          text={isActive ? "approved" : "restore"}
          itemData={data}
        />
      )}
    </>
  );
};

export default PurchaseList;
