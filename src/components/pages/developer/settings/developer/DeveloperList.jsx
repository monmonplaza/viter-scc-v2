import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { ver } from "@/components/helpers/functions-general.jsx";
import NoData from "@/components/partials/icons/NoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import ModalConfirm from "@/components/partials/modal/ModalConfirm.jsx";
import ModalDelete from "@/components/partials/modal/ModalDelete.jsx";
import ModalReset from "@/components/partials/modal/ModalReset.jsx";
import ModalSuspend from "@/components/partials/modal/ModalSuspend.jsx";
import Pill from "@/components/partials/Pill.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import {
  ArchiveRestore,
  KeySquare,
  SquarePen,
  Trash,
  UserRoundX,
} from "lucide-react";
import React from "react";

const DeveloperList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  let counter = 1;

  const {
    handleRemove,
    handleEdit,
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
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/settings-developer`, // endpoint
    "get", // method
    "settings-developer" // key
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
                <th className="w-[120px]">First Name</th>
                <th className="w-[120px]">Last Name</th>
                <th className="w-[100px] ">Email</th>
                <th></th>
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
                    <td>{<Pill isActive={item.developer_is_active} />}</td>

                    <td>{item.developer_fname}</td>
                    <td>{item.developer_lname}</td>
                    <td>
                      <span className=" block truncate w-[240px]">
                        {item.developer_email}
                      </span>
                    </td>

                    <td className="table-action">
                      <ul>
                        {item.developer_is_active === 1 ? (
                          <>
                            <li>
                              <button
                                data-tooltip="Edit"
                                className="tooltip"
                                onClick={() =>
                                  handleEdit(item.developer_aid, item)
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
                                  handleReset(item.developer_aid, item)
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
                                  handleSuspend(item.developer_aid, item)
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
                                  handleRestore(item.developer_aid, item)
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
                                  handleRemove(item.developer_aid, item)
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
          mysqlApiDelete={`/${ver}/settings-developer/${aid}`}
          queryKey="settings-developer"
          item={data.developer_fname}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/${ver}/settings-developer/active/${aid}`}
          queryKey="settings-developer"
          item={data.developer_fname}
          active={isActive}
        />
      )}

      {store.isReset && (
        <ModalReset
          mysqlApiReset={`/${ver}/settings-developer/reset`}
          msg={"Are you sure you want to reset the password of this user?"}
          successMsg={"Reset succesfully. Check your Email."}
          queryKey={"settings-developer"}
          email={data.developer_email}
        />
      )}

      {store.isSuspend && (
        <ModalSuspend
          mysqlApiSuspend={`/${ver}/settings-developer/active/${aid}`}
          msg={"Are you sure you want to suspend this user?"}
          successMsg={"Suspended succesfully."}
          queryKey={"settings-developer"}
          email={data.developer_email}
        />
      )}
    </>
  );
};

export default DeveloperList;
