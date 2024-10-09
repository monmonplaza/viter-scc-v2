import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  InputCheckbox,
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import {
  getDateNow,
  handleEscape,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setIsAdd,
  setIsAnimating,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { File, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
const ModalPettyCash = ({ itemEdit, totalCount }) => {
  const { dispatch, store } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/petty-cash/${itemEdit.petty_cash_aid}`
          : `/${ver}/petty-cash`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["petty-cash"],
      });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully updated.`));
        dispatch(setIsAdd(false));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 300);
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = itemEdit
    ? {
        ...itemEdit,
      }
    : {
        petty_cash_date: getDateNow(),
        petty_cash_in: 0,
        petty_cash_out: 0,
        is_cash_out: false,
      };

  const yupSchema = Yup.object({
    petty_cash_date: Yup.string().required("Require"),
    petty_cash_in: Yup.string().required("Require"),
    petty_cash_out: Yup.string().required("Require"),
  });

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Update " : " "}
            Petty Cash
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            mutation.mutate(values);
          }}
        >
          {(props) => {
            if (props.values.is_cash_out === false) {
              props.values.petty_cash_out = 0;
            } else {
              props.values.petty_cash_in = 0;
            }
            return (
              <Form>
                <div className=" modal-body  ">
                  <div className="modal-form">
                    {itemEdit && (
                      <p>
                        <span className="font-bold">Reference no.:</span>{" "}
                        {itemEdit?.petty_cash_reference_no}
                      </p>
                    )}
                    <div className="input-wrap">
                      <InputText
                        label="Date"
                        type="date"
                        name="petty_cash_date"
                        disabled={mutation.isPending}
                      />
                    </div>
                    {Number(totalCount) > 0 ? (
                      <>
                        <div className="flex my-5">
                          <InputCheckbox
                            label="Is cash out?"
                            type="checkbox"
                            disabled={mutation.isLoading}
                            name="is_cash_out"
                            id="select_all"
                          />
                        </div>
                        {props.values.is_cash_out === false ? (
                          <div className="input-wrap">
                            <InputText
                              label="Cash in"
                              type="text"
                              name="petty_cash_in"
                              disabled={mutation.isPending}
                            />
                          </div>
                        ) : (
                          <div className="input-wrap">
                            <InputText
                              label="Cash out"
                              type="text"
                              name="petty_cash_out"
                              disabled={mutation.isPending}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="input-wrap">
                        <InputText
                          label="Cash in"
                          type="text"
                          name="petty_cash_in"
                          disabled={mutation.isPending}
                        />
                      </div>
                    )}
                  </div>

                  <div className="modal-action ">
                    <button
                      className="btn btn-accent"
                      type="submit"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <SpinnerButton />
                      ) : itemEdit ? (
                        "Save"
                      ) : (
                        "Add"
                      )}
                    </button>
                    <button
                      className="btn btn-discard"
                      type="reset"
                      onClick={handleClose}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </WrapperModal>
  );
};

export default ModalPettyCash;
