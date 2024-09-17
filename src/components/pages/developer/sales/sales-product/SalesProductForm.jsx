import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { ver } from "@/components/helpers/functions-general";
import { queryData } from "@/components/helpers/queryData";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton";
import { setMessage, setValidate } from "@/components/store/StoreAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const SalesProductForm = ({ itemEdit, setIsAdd, row }) => {
  const [quantity, setQuantity] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [supplierOption, setSupplierOption] = React.useState(null);
  const [productOption, setSupplierProduct] = React.useState(null);

  const {
    isLoading: loadingSupplier,
    error: errorSupplier,
    data: supplier,
  } = useQueryData(
    `/${ver}/receiving/read-all-supplier`, // endpoint
    "get", // method
    "read-all-supplier" // key
  );

  const {
    isLoading: loadingProduct,
    error: errorProduct,
    data: product,
  } = useQueryData(
    `/${ver}/receiving/read-all-product`, // endpoint
    "get", // method
    "read-all-product" // key
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/receiving-supply/${itemEdit.receiving_supply_aid}`
          : `/${ver}/receiving-supply`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["receiving-supply"],
      });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        setIsAdd(false);
      }
    },
  });

  const initVal = itemEdit
    ? { ...itemEdit }
    : {
        receiving_supply_aid: "",
        receiving_supply_received_id: row.receiving_aid,
        receiving_supply_supplier_id: "",
        receiving_supply_product_id: "",
        receiving_supply_unit_id: "",
        receiving_supply_quantity: 0,
        receiving_supply_price: 0,
        receiving_supply_amount: "",
      };

  const yupSchema = Yup.object({
    receiving_supply_product_id: Yup.string().required("Require"),
    receiving_supply_supplier_id: Yup.string().required("Require"),
    receiving_supply_unit_id: Yup.string().required("Require"),
    receiving_supply_quantity: Yup.string().required("Require"),
    receiving_supply_price: Yup.string().required("Require"),
  });

  const handleChangeSupplier = (e) => setSupplierOption(e.target.value);
  const handleChangeProduct = (e) => setSupplierProduct(e.target.value);
  const handleChangeQuantity = (e) => setQuantity(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);

  let amount = quantity * price;

  return (
    <>
      <h4>Add Record</h4>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          mutation.mutate({
            ...values,
            receiving_supply_amount: amount,
            receiving_supply_price: price,
            receiving_supply_quantity: quantity,
          });
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5 ">
                <div>
                  <div className="input-wrap">
                    <InputSelect
                      label="Supplier"
                      name="receiving_supply_supplier_id"
                      onChange={(e) => handleChangeSupplier(e)}
                      disabled={mutation.isPending || loadingSupplier}
                    >
                      {loadingSupplier ? (
                        <option value="" hidden>
                          Loading...
                        </option>
                      ) : errorSupplier ? (
                        <option value="" disabled>
                          Error
                        </option>
                      ) : (
                        <optgroup label="Select Supplier">
                          <option value="" hidden></option>
                          {supplier?.data.length > 0 ? (
                            <>
                              {supplier?.data.map((cItem, key) => {
                                return (
                                  (cItem.supplier_is_active === 1 ||
                                    (itemEdit &&
                                      Number(cItem.supplier_aid) ===
                                        Number(
                                          itemEdit.receiving_supply_supplier_id
                                        ))) && (
                                    <option
                                      value={cItem.supplier_aid}
                                      key={key}
                                    >
                                      {cItem.supplier_name}
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
                    <InputSelect
                      label="Product"
                      name="receiving_supply_product_id"
                      onChange={(e) => handleChangeProduct(e)}
                      disabled={mutation.isPending || loadingProduct}
                    >
                      {loadingProduct ? (
                        <option value="" hidden>
                          Loading...
                        </option>
                      ) : errorProduct ? (
                        <option value="" disabled>
                          Error
                        </option>
                      ) : (
                        <optgroup label="Select Product">
                          <option value="" hidden></option>
                          {product?.data.length > 0 ? (
                            <>
                              {product?.data.map((cItem, key) => {
                                return (
                                  (cItem.product_is_active === 1 ||
                                    (itemEdit &&
                                      Number(cItem.product_aid) ===
                                        Number(
                                          itemEdit.receiving_supply_product_id
                                        ))) && (
                                    <option value={cItem.product_aid} key={key}>
                                      {cItem.product_name}
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
                    <InputSelect label="Unit" name="receiving_supply_unit_id">
                      <optgroup label="Select Unit">
                        <option value="" hidden></option>
                        <option value="per piece">Per Piece</option>
                        <option value="per box">Per Box</option>
                        <option value="per pack">Per Pack</option>
                      </optgroup>
                    </InputSelect>
                  </div>
                </div>
                <div>
                  <div className="input-wrap">
                    <InputText
                      label="Quantity"
                      name="receiving_supply_quantity"
                      type="text"
                      onChange={(e) => handleChangeQuantity(e)}
                      value={quantity}
                    />
                  </div>
                  <div className="input-wrap">
                    <InputText
                      label="Price"
                      type="text"
                      name="receiving_supply_price"
                      onChange={(e) => handleChangePrice(e)}
                      value={price}
                    />
                  </div>

                  <div className="input-wrap">
                    <InputText
                      type="text"
                      label="Amount"
                      name="receiving_supply_amount"
                      readOnly="readonly"
                      value={amount}
                    />
                  </div>
                </div>
              </div>

              <div className="table-action flex justify-end gap-3 mt-5">
                <button
                  className="btn btn-accent"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? <SpinnerButton /> : "Save"}
                </button>

                <button
                  className="btn btn-discard"
                  onClick={() => setIsAdd(false)}
                  type="reset"
                >
                  Discard
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SalesProductForm;
