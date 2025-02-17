import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import { ver } from "@/components/helpers/functions-general";
import NoData from "@/components/partials/icons/NoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import ModalConfirm from "@/components/partials/modal/ModalConfirm";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import Pill from "@/components/partials/Pill";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import { StoreContext } from "@/components/store/StoreContext";
import { Archive, ArchiveRestore, SquarePen, Trash } from "lucide-react";
import React from "react";

const UnitList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let counter = 1;

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
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/settings-unit`, // endpoint
    "get", // method
    "settings-unit" // key
  );
  return (
    <>
      <div className="relative ">
        {!isLoading && isFetching && <SpinnerTable />}

        <div className="table-wrapper  w-full">
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
                    <td>{<Pill isActive={item.settings_unit_is_active} />}</td>

                    <td>{item.settings_unit_name}</td>

                    <td className="table-action">
                      <ul>
                        {item.settings_unit_is_active === 1 ? (
                          <>
                            <li>
                              <button
                                data-tooltip="Edit"
                                className="tooltip"
                                onClick={() =>
                                  handleEdit(item.settings_unit_aid, item)
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
                                  handleArchive(item.settings_unit_aid, item)
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
                                  handleRestore(item.settings_unit_aid, item)
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
                                  handleRemove(item.settings_unit_aid, item)
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
          mysqlApiDelete={`/${ver}/settings-unit/${aid}`}
          queryKey="settings-unit"
          item={data.settings_unit_name}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/settings-unit/active/${aid}`}
          queryKey="settings-unit"
          item={data.settings_unit_name}
          active={isActive}
        />
      )}
    </>
  );
};

export default UnitList;
