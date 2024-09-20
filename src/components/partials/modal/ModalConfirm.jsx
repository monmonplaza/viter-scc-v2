import { queryData } from "@/components/helpers/queryData.jsx";
import {
  setIsAnimating,
  setIsConfirm,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalConfirm = ({ mysqlApiArchive, queryKey, item, active }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage("Record updated"));
      }
    },
  });

  const handleYes = async () => {
    mutation.mutate({
      isActive: active ? 1 : 0,
    });
  };

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsConfirm(false));
    }, 500);
  };

  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-primary ">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h4 className="flex items-center gap-2 !font-medium text-warning mb-0">
            <Archive size={16} />
            {active ? "Restore" : "Archive"}
          </h4>
          <button type="button" onClick={handleClose}>
            <X />
          </button>
        </div>

        <div className="p-3">
          <p className=" mb-2">
            You are about to {active ? "restore" : "archive"}{" "}
            <span className="font-bold">"{item}"</span>.
          </p>
          <p>Are you sure you want to continue?</p>
        </div>

        <div className="flex p-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
          <button
            className="btn btn-warning center-all w-full"
            onClick={handleYes}
          >
            {mutation.isPending ? (
              <SpinnerButton />
            ) : active ? (
              "Restore"
            ) : (
              "Archive"
            )}
          </button>
          <button
            className="btn btn-discard center-all w-full"
            onClick={handleClose}
          >
            Discard
          </button>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalConfirm;
