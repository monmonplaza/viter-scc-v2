import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { ver } from "@/components/helpers/functions-general.jsx";
import NoData from "@/components/partials/icons/NoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import Pill from "@/components/partials/Pill.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { Archive, ArchiveRestore, SquarePen, Trash } from "lucide-react";
import React from "react";

const RolesList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
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
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/settings-role`, // endpoint
    "get", // method
    "settings-role" // key
  );

  return (
    <>
      <div className="relative ">
        {!isLoading && isFetching && <SpinnerTable />}

        <div className="table-wrapper  !max-w-[685px]">
          <table>
            <thead>
              <tr>
                <th className="w-counter">#</th>
                <th className="w-[90px]">Status</th>
                <th className="">Name</th>
              </tr>
            </thead>

            <tbody>
              {((isLoading && !isFetching) || result?.data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {isLoading ? (
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

              {result?.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td className="w-counter">{counter++}.</td>
                    <td>{<Pill isActive={item.role_is_active} />}</td>

                    <td>{item.role_name}</td>

                    <td className="table-action">
                      <ul>
                        {item.role_is_active === 1 ? (
                          <>
                            <li>
                              <button
                                data-tooltip="Edit"
                                className="tooltip"
                                onClick={() => handleEdit(item.role_aid, item)}
                              >
                                <SquarePen size={14} />
                              </button>
                            </li>

                            <li>
                              <button
                                data-tooltip="Archive"
                                className="tooltip"
                                onClick={() =>
                                  handleArchive(item.role_aid, item)
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
                                  handleRestore(item.role_aid, item)
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
                                  handleRemove(item.role_aid, item)
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
            </tbody>
          </table>
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/${ver}/settings-role/${aid}`}
          queryKey="settings-role"
          item={data.role_name}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/settings-role/active/${aid}`}
          queryKey="settings-role"
          item={data.role_name}
          active={isActive}
        />
      )}
    </>
  );
};

export default RolesList;
