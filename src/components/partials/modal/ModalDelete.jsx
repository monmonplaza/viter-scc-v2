import { queryData } from "@/components/helpers/queryData.jsx";
import {
  setIsAnimating,
  setIsDelete,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash, X } from "lucide-react";
import React from "react";
import SpinnerButton from "../spinners/SpinnerButton.jsx";
import WrapperModal from "../wrapper/WrapperModal.jsx";

const ModalDelete = ({ mysqlApiDelete, queryKey, item }) => {
  const { dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiDelete, "delete", values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage("Record Successfully Deleted"));
      }
    },
  });

  const handleYes = async () => {
    mutation.mutate({
      item: item,
    });
  };

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsDelete(false));
    });
  };

  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-primary">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h4 className="flex items-center gap-2 !font-medium text-alert mb-0">
            <Trash size={16} />
            Delete
          </h4>
          <button type="button" onClick={handleClose}>
            <X />
          </button>
        </div>

        <div className="p-3">
          <p className="mb-2 ">
            You are about to delete
            <span className="font-semibold mx-1">"{item}"</span>record. This
            action will permanently delete this record.
          </p>
          <p>Are you sure you want to confinue?</p>
        </div>

        <div className="flex px-3 pb-3 gap-2 justify-end w-[50%] ml-auto">
          <button
            className="btn btn-alert center-all w-full"
            disabled={mutation.isPending}
            onClick={handleYes}
          >
            {mutation.isPending ? <SpinnerButton /> : "Delete"}
          </button>
          <button
            className="btn btn-discard center-all w-full"
            disabled={mutation.isPending}
            type="reset"
            onClick={handleClose}
          >
            Discard
          </button>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalDelete;
