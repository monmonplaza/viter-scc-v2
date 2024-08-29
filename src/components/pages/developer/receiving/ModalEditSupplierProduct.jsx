import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import {
  formatDate,
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general";
import { queryData } from "@/components/helpers/queryData";
import SearchModalProduct from "@/components/partials/search/SearchModalProduct";
import SearchModalSupplier from "@/components/partials/search/SearchModalSupplier";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setIsAnimating,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { PillBottle, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const ModalEditSupplierProduct = ({ itemEdit, setEditSupplier }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [supplierData, setSupplierData] = React.useState(null);
  const [isRequiredSupplierYup, setIsRequiredSupplierYup] = React.useState("");
  const [productData, setProductData] = React.useState(null);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");

  const {
    isLoading: loadingUnit,
    error: errorUnit,
    data: unitData,
  } = useQueryData(
    `/${ver}/receiving/read-all-unit`, // endpoint
    "get", // method
    "receiving-read-all-unit" // key
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `/${ver}/receiving-supply/${itemEdit.receiving_supply_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["receiving-supply-read-new-receive"],
      });
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        setEditSupplier(false);
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully updated.`));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      setEditSupplier(false);
    }, 300);
  };

  const handleSearch = () => {
    if (supplierData === null || typeof supplierData === "undefined") {
      setIsRequiredSupplierYup(Yup.string().required("Required"));
    }
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = {
    receiving_supply_received_id: itemEdit.receiving_supply_received_id,
    receiving_supply_unit_id: itemEdit.receiving_supply_unit_id,
    receiving_supply_quantity: itemEdit.receiving_supply_quantity,
    receiving_supply_price: itemEdit.receiving_supply_price,
    receiving_supply_expiration_date: itemEdit
      ? itemEdit.receiving_supply_expiration_date
      : "",
    receiving_supply_barcode: itemEdit ? itemEdit.receiving_supply_barcode : "",
    receiving_date: itemEdit.receiving_date,
    searchSupplier: itemEdit.supplier_name,
    searchProduct: itemEdit.product_name,

    // defective details
    receiving_supply_defective_product_qty:
      itemEdit.receiving_supply_defective_product_qty,
  };

  const yupSchema = Yup.object({
    receiving_supply_unit_id: Yup.string().required("Require"),
    receiving_supply_quantity: Yup.string().required("Require"),
    receiving_supply_price: Yup.string().required("Require"),
    searchSupplier: isRequiredSupplierYup,
    searchProduct: isRequiredProductYup,
  });

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[350px] border border-line mx-2 ">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              Update Recieved Supply
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="space-y-6">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const receiving_supply_supplier_id =
                  supplierData !== null
                    ? supplierData?.supplier_aid
                    : itemEdit.receiving_supply_supplier_id;
                const receiving_supply_product_id =
                  productData !== null
                    ? productData?.product_aid
                    : itemEdit.receiving_supply_product_id;

                const receiving_supply_amount =
                  Number(values.receiving_supply_price) *
                  Number(values.receiving_supply_quantity);

                const defective_product_amount =
                  Number(values.receiving_supply_price) *
                  Number(values.receiving_supply_defective_product_qty);

                mutation.mutate({
                  ...values,
                  receiving_total_amount:
                    Number(itemEdit.amount) -
                    Number(itemEdit.receiving_supply_amount),
                  receiving_supply_amount,
                  receiving_supply_supplier_id,
                  receiving_supply_product_id,
                  defective_product_amount,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="modal-form !pb-0">
                      {/* <div className="grid grid-cols-2 mb-5 gap-5"> */}
                      <div className="input-wrap">
                        <SearchModalSupplier
                          setData={setSupplierData}
                          props={props.values}
                          label="Search Supplier"
                          name="searchSupplier"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredSupplierYup}
                          itemEdit={itemEdit}
                        />
                      </div>
                      <div className="input-wrap">
                        <SearchModalProduct
                          setData={setProductData}
                          props={props.values}
                          label="Search Product"
                          name="searchProduct"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredProductYup}
                          itemEdit={itemEdit}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Qty"
                          type="text"
                          number="number"
                          name="receiving_supply_quantity"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Unit"
                          name="receiving_supply_unit_id"
                          disabled={mutation.isLoading || loadingUnit}
                        >
                          {loadingUnit ? (
                            <option value="" hidden>
                              Loading...
                            </option>
                          ) : errorUnit ? (
                            <option value="" disabled>
                              Error
                            </option>
                          ) : (
                            <optgroup label="Select unit">
                              <option value="" hidden></option>
                              {unitData?.data.length > 0 ? (
                                <>
                                  {unitData?.data.map((cItem, key) => {
                                    return (
                                      (cItem.settings_unit_is_active === 1 ||
                                        (itemEdit &&
                                          Number(
                                            itemEdit.receiving_supply_unit_id
                                          ) ===
                                            Number(
                                              cItem.settings_unit_aid
                                            ))) && (
                                        <option
                                          value={cItem.settings_unit_aid}
                                          key={key}
                                        >
                                          {cItem.settings_unit_name}
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
                      <div className="input-wrap">
                        <InputText
                          label="Price"
                          type="text"
                          number="number"
                          name="receiving_supply_price"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Expiration Date"
                          type="date"
                          name="receiving_supply_expiration_date"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Barcode"
                          type="text"
                          number="number"
                          name="receiving_supply_barcode"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <p className="text-right mt-4">
                        Total:
                        <span className="font-semibold">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            Number(props.values.receiving_supply_price) *
                              Number(props.values.receiving_supply_quantity),
                            2
                          )}
                        </span>
                      </p>
                      <div className="input-wrap">
                        <InputText
                          label="Defective Qty"
                          type="text"
                          number="number"
                          name="receiving_supply_defective_product_qty"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <p className="text-right mt-4">
                        Defective Amount:
                        <span className="font-semibold">
                          {pesoSign}
                          {numberWithCommasToFixed(
                            Number(props.values.receiving_supply_price) *
                              Number(
                                props.values
                                  .receiving_supply_defective_product_qty
                              ),
                            2
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-end bg-inherit p-4">
                      <button
                        className="btn btn-accent"
                        disabled={mutation.isPending}
                        onClick={handleSearch}
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-discard "
                        type="button"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalEditSupplierProduct;
