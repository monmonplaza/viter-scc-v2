import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { ver } from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setIsSearch } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  Package,
  SquarePen,
  Trash,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import ModalSupplierProduct from "./ModalSupplierProduct.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import NoData from "@/components/partials/icons/NoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import Pill from "@/components/partials/Pill.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";

const ReceivingList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [row, setRow] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const [showManageSupplierProduct, setShowManageSupplierProduct] =
    React.useState(false);
  const search = React.useRef({ value: "" });
  let counter = 1;
  const [
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
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
    queryKey: ["receiving", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/receiving/search`, // search endpoint
        `/${ver}/receiving/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          receiving_is_active: filterData,
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

  const handleManageSupplierProduct = (item) => {
    setShowManageSupplierProduct(true);
    setRow(item);
  };

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
            <option value="1">Active</option>
            <option value="0">Inactive</option>
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

        <div className="table-wrapper  ">
          <table>
            <thead>
              <tr>
                <th className="w-[40px]">#</th>
                <th className="w-[90px]">Status</th>
                <th className="">Date</th>
                <th className="">Reference No.</th>
                <th className="">Total Amount</th>
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
                        <td>{counter++}</td>
                        <td>{<Pill isActive={item.receiving_is_active} />}</td>
                        <td>{item.receiving_date}</td>
                        <td>{item.receiving_reference_no}</td>
                        <td></td>
                        <td className="table-action">
                          <ul>
                            {item.receiving_is_active === 1 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="View"
                                    className="tooltip"
                                    onClick={() =>
                                      handleManageSupplierProduct(item)
                                    }
                                  >
                                    <Package size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                    onClick={() =>
                                      handleEdit(item.receiving_aid, item)
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
                                      handleArchive(item.receiving_aid, item)
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
                                      handleRestore(item.receiving_aid, item)
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
                                      handleRemove(item.receiving_aid, item)
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
      {showManageSupplierProduct && (
        <ModalSupplierProduct
          setShowManageSupplierProduct={setShowManageSupplierProduct}
          row={row}
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/receiving/${aid}`}
          queryKey="receiving"
          item={data.receiving_date}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/receiving/active/${aid}`}
          queryKey="receiving"
          item={data.receiving_date}
          active={isActive}
        />
      )}
    </>
  );
};

export default ReceivingList;
