import { handleEscape } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import {
  setError,
  setIsReset,
  setMessage,
  setSuccess,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KeySquare, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalReset = ({ mysqlApiReset, msg, successMsg, queryKey, email }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiReset, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      dispatch(setIsReset(false));

      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(successMsg));
      }
    },
  });

  const handleYes = async () => {
    mutation.mutate({
      email: email,
    });
  };

  const handleClose = () => {
    dispatch(setIsReset(false));
  };

  handleEscape(() => handleClose());

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary ">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-warning mb-0">
              <KeySquare size={16} />
              Reset
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-3">
            <p className=" mb-2">{msg}</p>
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

export default ModalReset;
