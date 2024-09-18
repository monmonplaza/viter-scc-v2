import { handleEscape } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import {
  setError,
  setIsAccountUpdated,
  setIsSuspend,
  setMessage,
  setSuccess,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoundX, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalSuspend = ({
  mysqlApiSuspend,
  msg,
  successMsg,
  queryKey,
  email,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const isOwnAccount = store.credentials.data.developer_email === email;

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiSuspend, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      dispatch(setIsSuspend(false));

      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            isOwnAccount
              ? "Suspended succesfully. You will be automatically logged out."
              : successMsg
          )
        );
        isOwnAccount && dispatch(setIsAccountUpdated(true));
      }
    },
  });

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      isActive: 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsSuspend(false));
  };

  handleEscape(() => handleClose());

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary ">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-warning mb-0">
              <UserRoundX size={16} />
              Suspend
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-3">
            <p className=" mb-2">
              {isOwnAccount
                ? "Suspending your own account will make you unable to login and use the system. Do you still want to proceed?"
                : msg}
            </p>
          </div>

          <div className="flex p-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
            <button
              className="btn btn-warning center-all w-full whitespace-nowrap"
              onClick={handleYes}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <SpinnerButton />} Yes, Confirm
            </button>
            <button
              className="btn btn-discard center-all w-full whitespace-nowrap"
              type="reset"
              onClick={handleClose}
              disabled={mutation.isPending}
            >
              No, cancel
            </button>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalSuspend;
