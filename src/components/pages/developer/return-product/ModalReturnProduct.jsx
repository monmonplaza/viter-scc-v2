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
import SearchModalProduct from "@/components/partials/search/SearchModalProduct";
import SearchModalSalesProduct from "@/components/partials/search/SearchModalSalesProduct";
import SearchModalSalesReferenceNo from "@/components/partials/search/SearchModalSalesReferenceNo";
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
  const [salesProductData, setSalesProductData] = React.useState(itemEdit);
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

  const initVal = itemEdit
    ? {
        ...itemEdit,
        searchProduct: itemEdit.product_name,
        return_product_is_refund:
          itemEdit.return_product_is_refund === 1 ? true : false,
      }
    : {
        return_product_id: "",
        return_product_date: getDateNow(),
        return_product_qty: "",
        return_product_remarks: "",
        return_product_is_refund: false,
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
            if (productData == null) {
              dispatch(setValidate(true));
              dispatch(setMessage("Invalid Quantity"));
              return;
            }

            if (
              Number(values.return_product_qty) >
              Number(productData?.sales_list_total_qty)
            ) {
              dispatch(setValidate(true));
              dispatch(setMessage("Invalid Quantity"));
              return;
            }

            mutation.mutate({
              ...values,
              return_product_id:
                typeof productData?.product_aid !== "undefined"
                  ? productData?.product_aid
                  : "",
              return_product_sales_list_id:
                typeof salesProductData?.sales_aid !== "undefined"
                  ? salesProductData?.sales_aid
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
                      <SearchModalSalesReferenceNo
                        setData={setSalesProductData}
                        props={props.values}
                        label="Search Sales Reference / customer"
                        name="searchSalesReference"
                        mutation={mutation}
                        setIsRequiredYup={setIsRequiredProductYup}
                        itemEdit={itemEdit}
                      />
                    </div>
                    <div className="input-wrap">
                      <SearchModalSalesProduct
                        setData={setProductData}
                        props={props.values}
                        label="Search product"
                        name="searchSalesProduct"
                        mutation={mutation}
                        setIsRequiredYup={setIsRequiredProductYup}
                        itemEdit={itemEdit}
                        salesData={salesProductData}
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
                    <div className="flex my-5">
                      <InputCheckbox
                        label="Is Refund?"
                        type="checkbox"
                        disabled={mutation.isLoading}
                        name="return_product_is_refund"
                        id="select_all"
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
