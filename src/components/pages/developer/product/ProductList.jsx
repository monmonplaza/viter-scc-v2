import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { ver } from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/Nodata.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import Pill from "@/components/partials/Pill.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  Search,
  SquarePen,
  Trash,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const ProductList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
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
    queryKey: ["product", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/product/search`, // search endpoint
        `/${ver}/product/page/${pageParam}`, // list endpoint
        store.isSearch || isFilter, // search boolean, // search boolean
        {
          isFilter,
          // company_is_active: campanyStatus,
          searchValue: search?.current?.value,
          id: "",
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

  const [
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    id,
    data,
    isActive,
  ] = useTableActions({
    setItemEdit,
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
        <div className="input-wrap filter w-full md:w-auto">
          <select name="" id="">
            <option value="">All</option>
            <option value="">Active</option>
            <option value="">Inactive</option>
          </select>
        </div>

        <div className="input-wrap search relative w-full md:w-auto">
          <Search size={20} className="absolute" />
          <input type="search" placeholder="Search..." className="pl-10" />
        </div>
      </div>
      <div className="relative">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper  ">
          <table>
            <thead>
              <tr>
                <td className="w-[30px]">#</td>
                <td className="w-[200px]">Name</td>
                <td>SKU</td>
                <td>Description</td>
                <td>Barcode</td>
                <td>Status</td>
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
                        <td>{item.product_name}</td>
                        <td>{item.product_SKU}</td>
                        <td>
                          <p className="max-w-[500px] truncate mb-0">
                            {item.product_description}
                          </p>
                        </td>
                        <td>{item.product_barcode}</td>
                        <td>{<Pill isActive={item.product_is_active} />}</td>
                        <td className="table-action">
                          <ul>
                            {item.product_is_active === 1 ? (
                              <>
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
                                    data-tooltip="Archive"
                                    className="tooltip"
                                    onClick={() =>
                                      handleArchive(item.product_aid, item)
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
                                      handleRestore(item.product_aid, item)
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
                                      handleRemove(item.product_aid, item)
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
          mysqlApiDelete={`/${ver}/product/${id}`}
          queryKey="product"
          item={data.product_name}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/product/active/${id}`}
          queryKey="product"
          item={data.product_name}
          active={isActive}
        />
      )}
    </>
  );
};

export default ProductList;
