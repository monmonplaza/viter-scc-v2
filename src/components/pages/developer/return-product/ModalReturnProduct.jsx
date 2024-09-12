import useQueryData from "@/components/custom-hooks/useQueryData";
import {
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
import SearchModalProduct from "@/components/partials/search/SearchModalProduct";
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
const ModalReturnProduct = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [productData, setProductData] = React.useState(itemEdit);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/return-product/${itemEdit.return_product_aid}`
          : `/${ver}/return-product`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["return-product"],
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

  console.log("itemEdit", itemEdit);

  const initVal = itemEdit
    ? { ...itemEdit, searchProduct: itemEdit.product_name }
    : {
        return_product_id: "",
        return_product_date: getDateNow(),
        return_product_qty: "",
        return_product_remarks: "",
        searchProduct: "",
      };

  const yupSchema = Yup.object({
    return_product_date: Yup.string().required("Require"),
    return_product_qty: Yup.string().required("Require"),
    return_product_remarks: Yup.string().required("Require"),
    searchProduct: isRequiredProductYup,
  });

  const handleSearch = () => {
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Return Product
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            mutation.mutate({
              ...values,
              return_product_id:
                typeof productData?.product_aid !== "undefined"
                  ? productData?.product_aid
                  : "",
            });
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className=" modal-body ">
                  <div className="modal-form">
                    <div className="input-wrap">
                      <InputText
                        label="Date"
                        type="date"
                        name="return_product_date"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <SearchModalProduct
                        setData={setProductData}
                        props={props}
                        label="Search Product"
                        name="searchProduct"
                        mutation={mutation}
                        setIsRequiredYup={setIsRequiredProductYup}
                        itemEdit={itemEdit}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputText
                        label="Quatity"
                        type="text"
                        number="number"
                        name="return_product_qty"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputTextArea
                        label="Remarks"
                        name="return_product_remarks"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>

                  <div className="modal-action ">
                    <button
                      className="btn btn-accent"
                      type="submit"
                      onClick={handleSearch}
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

export default ModalReturnProduct;
