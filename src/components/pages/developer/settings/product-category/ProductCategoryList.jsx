import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import { ver } from "@/components/helpers/functions-general";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import NoData from "@/components/partials/icons/NoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import Loadmore from "@/components/partials/Loadmore";
import ModalConfirm from "@/components/partials/modal/ModalConfirm";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import Pill from "@/components/partials/Pill";
import SearchBar from "@/components/partials/SearchBar";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import { setIsSearch } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Archive, ArchiveRestore, SquarePen, Trash } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const ProductCategoryList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const search = React.useRef({ value: "" });
  let counter = 1;
  console.log(store.isSearch);

  const {
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
    queryKey: ["category", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/settings-category/search`, // search endpoint
        `/${ver}/settings-category/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          category_is_active: filterData,
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
          isFilter={isFilter}
        />
      </div>
      <div className="relative">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper  !max-w-[685px]">
          <table>
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[90px]">Status</th>
                <th className="w-[200px]">Name</th>

                <th>Description</th>
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
                        <td>{<Pill isActive={item.category_is_active} />}</td>

                        <td>{item.category_name}</td>

                        <td>
                          <p className="max-w-[500px] truncate mb-0">
                            {item.category_description}
                          </p>
                        </td>
                        <td className="table-action">
                          <ul>
                            {item.category_is_active === 1 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                    onClick={() =>
                                      handleEdit(item.category_aid, item)
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
                                      handleArchive(item.category_aid, item)
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
                                      handleRestore(item.category_aid, item)
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
                                      handleRemove(item.category_aid, item)
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
        <ModalDelete
          mysqlApiDelete={`/${ver}/settings-category/${aid}`}
          queryKey="category"
          item={data.category_name}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/settings-category/active/${aid}`}
          queryKey="category"
          item={data.category_name}
          active={isActive}
        />
      )}
    </>
  );
};

export default ProductCategoryList;
