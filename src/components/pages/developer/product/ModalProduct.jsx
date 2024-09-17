import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { handleEscape, ver } from "@/components/helpers/functions-general.jsx";
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
const ModalProduct = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/product/${itemEdit.product_aid}`
          : `/${ver}/product`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["product"],
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
    ? { ...itemEdit, product_name_old: itemEdit.product_name }
    : {
        product_aid: "",
        product_name: "",
        product_description: "",
        product_category_id: "",
        product_name_old: "",
      };

  const yupSchema = Yup.object({
    product_name: Yup.string().required("Require"),
    product_category_id: Yup.string().required("Require"),
    product_description: Yup.string().required("Require"),
  });

  const {
    isLoading: loadingCategory,
    error: errorCategory,
    data: category,
  } = useQueryData(
    `/${ver}/product/read-all-category`, // endpoint
    "get", // method
    "read-all-category" // key
  );

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Product
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
                    {itemEdit && (
                      <p>
                        <span className="font-bold">SKU:</span>{" "}
                        {itemEdit?.product_sku}
                      </p>
                    )}
                    <div className="input-wrap">
                      <InputText
                        label="Name"
                        type="text"
                        name="product_name"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputTextArea
                        label="Description"
                        name="product_description"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputSelect
                        label="Category"
                        name="product_category_id"
                        disabled={mutation.isLoading || loadingCategory}
                      >
                        {loadingCategory ? (
                          <option value="" hidden>
                            Loading...
                          </option>
                        ) : errorCategory ? (
                          <option value="" disabled>
                            Error
                          </option>
                        ) : (
                          <optgroup label="Select Category">
                            <option value="" hidden></option>
                            {category?.data.length > 0 ? (
                              <>
                                {category?.data.map((cItem, key) => {
                                  return (
                                    (cItem.category_is_active === 1 ||
                                      (itemEdit &&
                                        Number(cItem.category_aid) ===
                                          Number(
                                            itemEdit.product_category_id
                                          ))) && (
                                      <option
                                        value={cItem.category_aid}
                                        key={key}
                                      >
                                        {cItem.category_name} -{" "}
                                        {cItem.category_description}
                                      </option>
                                    )
                                  );
                                })}
                              </>
                            ) : (
                              <option value="" disabled>
                                No data
                              </option>
                            )}
                          </optgroup>
                        )}
                      </InputSelect>
                    </div>
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

export default ModalProduct;
