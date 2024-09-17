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
import ModalAdvanceDelete from "@/components/partials/modal/ModalAdvanceDelete";
import Pill from "@/components/partials/Pill.jsx";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SquarePen, Trash } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const ProductPriceList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
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
    queryKey: ["product-price", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/product-price/search`, // search endpoint
        `/${ver}/product-price/page/${pageParam}`, // list endpoint
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
        <div className="input-wrap filter w-full md:w-auto"></div>

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
                <th className="w-[200px]">Product</th>
                <th className="w-[200px]">Expired</th>
                <th className="min-w-[8rem] text-right">Suplier price</th>
                <th className="min-w-[8rem] text-right">SCC Price</th>
                <th className="min-w-[10rem] text-right">
                  SCC Whole Sale Price
                </th>
                <th className="min-w-[8rem] text-right">Price</th>
                <th className="min-w-[10rem] text-right">Whole Sale Price</th>
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
                    return (
                      <tr key={key}>
                        <td className="w-counter">{counter++}</td>

                        <td>
                          {item.product_name} ({item.receiving_supply_barcode})
                        </td>
                        <td>
                          {formatDate(item.receiving_supply_expiration_date)}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.receiving_supply_price,
                            2
                          )}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.product_price_scc_price,
                            2
                          )}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.product_price_scc_whole_sale_amount,
                            2
                          )}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.product_price_amount,
                            2
                          )}
                        </td>
                        <td className="text-right">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            item.product_price_whole_sale_amount,
                            2
                          )}
                        </td>
                        <td>{item.product_price_remarks}</td>

                        <td className="table-action">
                          <ul>
                            <li>
                              <button
                                data-tooltip="Edit"
                                className="tooltip"
                                onClick={() =>
                                  handleEdit(item.product_price_aid, item)
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
                                  handleRemove(item.product_price_aid, item)
                                }
                              >
                                <Trash size={14} />
                              </button>
                            </li>
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
              isSearchOrFilter={store.isSearch}
            />
          </div>
        </div>
      </div>

      {store.isDelete && (
        <ModalAdvanceDelete
          mysqlApiDelete={`/${ver}/product-price/${aid}`}
          queryKey="product-price"
          dataItem={data.product_name}
          item={data}
        />
      )}
    </>
  );
};

export default ProductPriceList;
