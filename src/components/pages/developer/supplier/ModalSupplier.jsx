import { InputText, InputTextArea } from "@/components/helpers/FormInputs";
import { handleEscape, ver } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setError,
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
const ModalSupplier = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/supplier/${itemEdit.supplier_aid}`
          : `/${ver}/supplier`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["supplier"],
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
    ? { ...itemEdit, supplier_name_old: itemEdit.supplier_name }
    : {
        supplier_aid: "",
        supplier_name: "",
        supplier_representative: "",
        supplier_representative_phone: "",
        supplier_phone: "",
        supplier_email: "",
        supplier_address: "",
        supplier_name_old: "",
      };

  const yupSchema = Yup.object({
    supplier_name: Yup.string().required("Require"),
    supplier_representative: Yup.string().required("Require"),
    supplier_representative_phone: Yup.string().required("Require"),
    supplier_phone: Yup.string().required("Require"),
    supplier_email: Yup.string().required("Require").email("Invalid Email"),
    supplier_address: Yup.string().required("Require"),
  });

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Supplier
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
            return (
              <Form>
                <div className=" modal-body  ">
                  <div className="modal-form">
                    <div className="input-wrap">
                      <InputText
                        label="Name"
                        type="text"
                        name="supplier_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Phone"
                        type="text"
                        name="supplier_phone"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Email"
                        type="text"
                        name="supplier_email"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputTextArea
                        label="Address"
                        type="text"
                        name="supplier_address"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Representative"
                        type="text"
                        name="supplier_representative"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Representative Phone"
                        type="text"
                        name="supplier_representative_phone"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>

                  <div className="modal-action ">
                    <button
                      className="btn btn-accent"
                      type="submit"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? <SpinnerButton /> : "Add"}
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

export default ModalSupplier;
