import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import {
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import SearchModalProductDontHavePrice from "@/components/partials/search/SearchModalProductDontHavePrice";
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
const ModalProductPrice = ({ itemEdit }) => {
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
          ? `/${ver}/product-price/${itemEdit.product_price_aid}`
          : `/${ver}/product-price`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["product-price"],
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
    ? { ...itemEdit, searchProductPrice: itemEdit?.product_price_product_id }
    : {
        product_price_scc_percent: 0,
        product_price_scc_whole_sale_percent: 0,
        product_price_percent: 0,
        product_price_whole_sale_percent: 0,
        product_price_remarks: "",
      };

  const yupSchema = Yup.object({
    product_price_scc_percent: Yup.string().required("Require"),
    product_price_scc_whole_sale_percent: Yup.string().required("Require"),
    product_price_percent: Yup.string().required("Require"),
    product_price_whole_sale_percent: Yup.string().required("Require"),
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
            Product Price
          </h3>
          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (productData === null || typeof productData === "undefined") {
              dispatch(setValidate(true));
              dispatch(setMessage("Invalid product data"));
              return;
            } else {
              const product_price_css_price =
                (Number(values?.product_price_scc_percent) / 100) *
                  Number(productData?.receiving_supply_price) +
                Number(productData?.receiving_supply_price);

              const product_price_scc_whole_sale_amount =
                (Number(values?.product_price_scc_whole_sale_percent) / 100) *
                  Number(productData?.receiving_supply_price) +
                Number(productData?.receiving_supply_price);

              const product_price_amount =
                (Number(values?.product_price_percent) / 100) *
                  Number(productData?.receiving_supply_price) +
                Number(productData?.receiving_supply_price);

              const product_price_whole_sale_amount =
                (Number(values?.product_price_whole_sale_percent) / 100) *
                  Number(productData?.receiving_supply_price) +
                Number(productData?.receiving_supply_price);

              mutation.mutate({
                ...values,
                product_price_product_id: productData?.product_aid,
                product_price_supply_id: productData?.receiving_supply_aid,
                product_price_css_price,
                product_price_scc_whole_sale_amount,
                product_price_amount,
                product_price_whole_sale_amount,
                product_price_stock_in: productData?.receiving_supply_quantity,
                product_price_stock_out: 0,
              });
            }
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className=" modal-body  ">
                  <div className="modal-form">
                    {itemEdit ? (
                      <p className="capitalize">
                        product name:{" "}
                        <span className="font-bold">
                          {itemEdit.product_name}
                        </span>
                      </p>
                    ) : (
                      <div className="input-wrap">
                        <SearchModalProductDontHavePrice
                          setData={setProductData}
                          props={props.values}
                          label="Search Product"
                          name="searchProduct"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredProductYup}
                        />
                      </div>
                    )}
                    {!itemEdit &&
                      (productData !== null ||
                        typeof productData?.receiving_supply_price !==
                          "undefined") && (
                        <p className="capitalize pt-2">
                          Supplier price:{" "}
                          <span className="font-bold">
                            {pesoSign}
                            {numberWithCommasToFixed(
                              productData?.receiving_supply_price,
                              2
                            )}
                          </span>
                        </p>
                      )}
                    <div className="input-wrap">
                      <InputText
                        label="SCC percent (%)"
                        type="text"
                        number="number"
                        name="product_price_scc_percent"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputText
                        label="SCC whole sale percent (%)"
                        type="text"
                        number="number"
                        name="product_price_scc_whole_sale_percent"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputText
                        label="Normal price percent(%)"
                        type="text"
                        number="number"
                        name="product_price_percent"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrap">
                      <InputText
                        label="Normal whole sale percent (%)"
                        type="text"
                        number="number"
                        name="product_price_whole_sale_percent"
                        disabled={mutation.isPending}
                      />
                    </div>

                    <div className="input-wrap">
                      <InputTextArea
                        label="Remarks"
                        name="product_price_remarks"
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

export default ModalProductPrice;
