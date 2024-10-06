import {
  InputCheckbox,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { handleEscape, ver } from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SearchAllModalReceivedProduct from "@/components/partials/search/SearchAllModalReceivedProduct";
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
const ModalAddDefectiveProduct = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [productData, setProductData] = React.useState(
    itemEdit ? itemEdit : null
  );
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/defective-product/${itemEdit.defective_product_aid}`
          : `/${ver}/defective-product`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["defectiveProduct"],
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
        searchReceiveProduct: `${itemEdit.product_name} ${
          itemEdit.receiving_supply_barcode !== ""
            ? `(${itemEdit.receiving_supply_barcode})`
            : ""
        }`,
      }
    : {
        defective_product_qty: "",
        defective_product_remarks: "",
        defective_product_is_refund: false,
        searchReceiveProduct: "",
      };

  const yupSchema = Yup.object({
    searchReceiveProduct: isRequiredProductYup,
  });

  const handleSearch = () => {
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };
  React.useEffect(() => handleEscape(handleClose), []);

  console.log("productData", productData);

  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            {itemEdit ? "Edit " : "Add "}
            Defective Product
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (productData === null) {
              dispatch(setValidate(true));
              dispatch(setMessage("Invalid Product"));
              return;
            }
            mutation.mutate({
              ...values,
              defective_product_receiving_supply_id:
                productData?.receiving_supply_aid,
              defective_product_amount: productData?.receiving_supply_price,
              receiving_supply_product_id:
                productData?.receiving_supply_product_id,
            });
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className=" modal-body  ">
                  <div className="modal-form">
                    <div className="input-wrap">
                      <SearchAllModalReceivedProduct
                        setData={setProductData}
                        props={props.values}
                        label="Search Product"
                        name="searchReceiveProduct"
                        mutation={mutation}
                        setIsRequiredYup={setIsRequiredProductYup}
                        itemEdit={itemEdit}
                      />
                    </div>

                    <div className="flex my-5">
                      <InputCheckbox
                        label="Is Refund?"
                        type="checkbox"
                        disabled={mutation.isLoading}
                        name="defective_product_is_refund"
                        id="select_all"
                      />
                    </div>

                    <div className="input-wrap">
                      <InputText
                        label="Defective Qty"
                        type="text"
                        number="number"
                        name="defective_product_qty"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputTextArea
                        label="Defective Remarks"
                        type="text"
                        name="defective_product_remarks"
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

export default ModalAddDefectiveProduct;
