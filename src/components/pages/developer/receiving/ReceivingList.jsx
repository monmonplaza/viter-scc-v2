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
import { Archive, SquarePen } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import ModalSupplierProduct from "./ModalSupplierProduct.jsx";

const ReceivingList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
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
    queryKey: ["product", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/product/search`, // search endpoint
        `/${ver}/product/page/${pageParam}`, // list endpoint
        store.isSearch || isFilter, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          product_is_active: filterData,
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
        />
      </div>
      <div className="relative">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper  ">
          <table>
            <thead>
              <tr>
                <th className="w-[40px]">#</th>
                <th className="">Date</th>
                <th className="">Reference No.</th>
                <th className="">Total Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>10/20/24</td>
                <td>222-222-2212</td>
                <td>4000</td>
                <td className="table-action">
                  <ul>
                    <li>
                      <button
                        data-tooltip="Edit"
                        className="tooltip"
                        onClick={() => handleEdit(item.supplier_aid, item)}
                      >
                        <SquarePen size={14} />
                      </button>
                    </li>

                    <li>
                      <button
                        data-tooltip="Archive"
                        className="tooltip"
                        onClick={() => handleArchive(item.supplier_aid, item)}
                      >
                        <Archive size={14} />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ModalSupplierProduct />

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/product/${aid}`}
          queryKey="product"
          item={data.product_name}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/product/active/${aid}`}
          queryKey="product"
          item={data.product_name}
          active={isActive}
        />
      )}
    </>
  );
};

export default ReceivingList;
