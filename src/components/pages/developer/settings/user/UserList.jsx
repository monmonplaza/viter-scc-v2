import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { ver } from "@/components/helpers/functions-general.jsx";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite.jsx";
import NoData from "@/components/partials/icons/NoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import Loadmore from "@/components/partials/Loadmore.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import ModalReset from "@/components/partials/modal/ModalReset.jsx";
import ModalSuspend from "@/components/partials/modal/ModalSuspend.jsx";
import Pill from "@/components/partials/Pill.jsx";
import SearchBar from "@/components/partials/SearchBar.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { setIsSearch } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArchiveRestore,
  KeySquare,
  SquarePen,
  Trash,
  UserRoundX,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const UserList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const search = React.useRef({ value: "" });
  let counter = 1;

  const {
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleReset,
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
    queryKey: [
      "settings-user",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/${ver}/settings-user/search`, // search endpoint
        `/${ver}/settings-user/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          user_is_active: filterData,
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

      <div className="relative ">
        {status !== "loading" && isFetching && <SpinnerTable />}

        <div className="table-wrapper  !max-w-[685px]">
          <table
            className={`${result?.pages[0].count > 22 ? "has-sticky" : ""}`}
          >
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[90px]">Status</th>
                <th className="w-[120px]">First Name</th>
                <th className="w-[120px]">Last Name</th>
                <th className="w-[100px] ">Email</th>
                <th></th>
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
                        <td>{<Pill isActive={item.user_is_active} />}</td>

                        <td>{item.user_fname}</td>
                        <td>{item.user_lname}</td>
                        <td>
                          <span className=" block truncate w-[240px]">
                            {item.user_email}
                          </span>
                        </td>

                        <td className="table-action">
                          <ul>
                            {item.user_is_active === 1 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                    onClick={() =>
                                      handleEdit(item.user_aid, item)
                                    }
                                  >
                                    <SquarePen size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Reset"
                                    onClick={() =>
                                      handleReset(item.user_aid, item)
                                    }
                                  >
                                    <KeySquare size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-tooltip="Suspend"
                                    className="tooltip"
                                    onClick={() =>
                                      handleSuspend(item.user_aid, item)
                                    }
                                  >
                                    <UserRoundX size={14} />
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
                                      handleRestore(item.user_aid, item)
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
                                      handleRemove(item.user_aid, item)
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
          mysqlApiDelete={`/${ver}/settings-user/${aid}`}
          queryKey="settings-user"
          item={`${data.user_fname} ${data.user_lname}`}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/settings-user/active/${aid}`}
          queryKey="settings-user"
          item={`${data.user_fname} ${data.user_lname}`}
          active={isActive}
        />
      )}
      {store.isReset && (
        <ModalReset
          mysqlApiReset={`/${ver}/settings-user/reset`}
          msg={"Are you sure you want to reset the password of this user?"}
          successMsg={"Reset succesfully. Check your Email."}
          queryKey={"settings-user"}
          email={data.user_email}
        />
      )}
      {store.isSuspend && (
        <ModalSuspend
          mysqlApiSuspend={`/${ver}/settings-user/active/${aid}`}
          msg={"Are you sure you want to suspend this user?"}
          successMsg={"Suspended succesfully."}
          queryKey={"settings-user"}
          email={data.user_email}
        />
      )}
    </>
  );
};

export default UserList;
