import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import {
  getDateNow,
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general";
import { queryData } from "@/components/helpers/queryData";
import SearchNoData from "@/components/partials/icons/SearchNoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import ModalAdvanceDelete from "@/components/partials/modal/ModalAdvanceDelete";
import SearchModalProduct from "@/components/partials/search/SearchModalProduct";
import SearchModalSupplier from "@/components/partials/search/SearchModalSupplier";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import {
  setIsAdd,
  setIsAnimating,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { PillBottle, Plus, SquarePen, Trash, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import ModalEditPurchase from "./ModalEditPurchase";

const ModalAddPurchasePrice = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [supplierData, setSupplierData] = React.useState(null);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  const [editSupplier, setEditSupplier] = React.useState(false);
  const [itemEditSupplier, setItemEditSupplier] = React.useState(null);
  const [isRequiredSupplierYup, setIsRequiredSupplierYup] = React.useState("");
  const [productData, setProductData] = React.useState(null);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  let counter = 1;
  let totalAmount = 0;
  let totalPrice = 0;

  const {
    isLoading: loadingUnit,
    error: errorUnit,
    data: unitData,
  } = useQueryData(
    `/${ver}/receiving/read-all-unit`, // endpoint
    "get", // method
    "receiving-read-all-unit" // key
  );

  const {
    isLoading: loadingReceiving,
    isFetching: fetchingReceiving,
    error: errorReceiving,
    data: receivingData,
  } = useQueryData(
    `/${ver}/purchase/read-new-data`, // endpoint
    "post", // method
    "purchase-read-new-data", // key
    { purchase_reference_no: itemEdit ? itemEdit.purchase_reference_no : "0" },
    { purchase_reference_no: itemEdit ? itemEdit.purchase_reference_no : "0" }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/${ver}/purchase`, "post", values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase"],
      });
      queryClient.invalidateQueries({
        queryKey: ["purchase-read-new-data"],
      });
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully save.`));
      }
    },
  });

  const [
    handleReset,
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleSuspend,
    aid,
    data,
    isActive,
  ] = useTableActions({
    setItemEdit,
  });

  const handleClose = () => {
    queryClient.invalidateQueries({
      queryKey: ["purchase"],
    });

    dispatch(setIsAnimating(false));
    setSupplierData(null);
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 0);
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
    purchase_date: itemEdit ? itemEdit.purchase_date : getDateNow(),
    purchase_delivery_date: itemEdit
      ? itemEdit.purchase_delivery_date
      : getDateNow(),
    purchase_quantity: itemEdit ? itemEdit.purchase_quantity : "",
    purchase_unit_id: itemEdit ? itemEdit.purchase_unit_id : "",
    purchase_price: itemEdit ? itemEdit.purchase_price : "",
    searchSupplier: "",
    searchProduct: "",
  };

  const yupSchema = Yup.object({
    purchase_date: Yup.string().required("Require"),
    purchase_delivery_date: Yup.string().required("Require"),
    purchase_quantity: Yup.string().required("Require"),
    purchase_unit_id: Yup.string().required("Require"),
    purchase_price: Yup.string().required("Require"),
    searchSupplier: isRequiredSupplierYup,
    searchProduct: isRequiredProductYup,
  });

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2 !animate-none">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              {itemEdit ? "Update " : "New "} Purchase List
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const purchase_supplier_id =
                  supplierData !== null ? supplierData?.supplier_aid : 0;
                const purchase_product_id =
                  productData !== null ? productData?.product_aid : 0;

                mutation.mutate({
                  ...values,
                  purchase_reference_no:
                    receivingData?.count > 0
                      ? receivingData?.purchase_reference_no
                      : 0,
                  purchase_supplier_id,
                  purchase_product_id,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="flex gap-5 mb-5">
                      <div className="input-wrap">
                        <InputText
                          label="Purchase Date"
                          type="date"
                          name="purchase_date"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Delivery Date"
                          type="date"
                          name="purchase_delivery_date"
                          disabled={mutation.isPending}
                        />
                      </div>
                    </div>

                    <div className="md:grid md:grid-cols-[1fr_1fr_8rem_8rem_8rem_5rem] gap-2 mb-5 items-end">
                      <div className="input-wrap">
                        <SearchModalSupplier
                          setData={setSupplierData}
                          props={props}
                          label="Search Supplier"
                          name="searchSupplier"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredSupplierYup}
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
                        />
                      </div>
                      <div className="input-wrap">
                        <InputText
                          label="Quantity"
                          type="text"
                          number="number"
                          name="purchase_quantity"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <InputSelect
                          label="Unit"
                          name="purchase_unit_id"
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
                          name="purchase_price"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <button
                        className="btn btn-accent ml-auto md:mt-0 mt-5 !py-1 md:text-left md:mb-2"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={handleSearch}
                      >
                        {mutation.isPending ? (
                          <SpinnerButton />
                        ) : (
                          <>
                            <Plus /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            <div className="relative">
              {!loadingReceiving && fetchingReceiving && <SpinnerTable />}
              <div className="table-wrapper w-full max-h-[30dvh] ">
                <table
                  className={`${
                    !loadingReceiving && receivingData.count > 7
                      ? "has-sticky"
                      : ""
                  }`}
                >
                  <thead className="">
                    <tr className="">
                      <th>#</th>
                      <th>Supplier</th>
                      <th>Product</th>
                      <th>Unit</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right ">Price</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody className=" ">
                    {((loadingReceiving && !fetchingReceiving) ||
                      receivingData?.data.length === 0) && (
                      <tr>
                        <td colSpan="100%">
                          {loadingReceiving ? (
                            <LoaderTable count={30} cols={6} />
                          ) : (
                            <SearchNoData />
                          )}
                        </td>
                      </tr>
                    )}
                    {errorReceiving && (
                      <tr>
                        <td colSpan="100%" className="p-10">
                          <ServerError />
                        </td>
                      </tr>
                    )}
                    {receivingData?.data.map((item, key) => {
                      totalAmount +=
                        Number(item.purchase_price) *
                        Number(item.purchase_quantity);
                      totalPrice += Number(item.purchase_price);
                      return (
                        <tr key={key} className="">
                          <td className="w-counter">{counter++}.</td>

                          <td>{item.supplier_name}</td>

                          <td>{item.product_name}</td>
                          <td>{item.settings_unit_name}</td>
                          <td className="text-center">
                            {item.purchase_quantity}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(item.purchase_price, 2)}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(
                              Number(item.purchase_price) *
                                Number(item.purchase_quantity),
                              2
                            )}
                          </td>
                          <td className="table-action !top-1">
                            <ul>
                              <li>
                                <button
                                  data-tooltip="Delete"
                                  className="tooltip"
                                  onClick={() =>
                                    handleRemove(item.purchase_aid, item)
                                  }
                                >
                                  <Trash size={14} />
                                </button>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody>
                    <tr className=" !bg-primary !text-sm text-dark font-bold !border-none !shadow-none">
                      <td colSpan={5} className="py-4 pl-2 text-right">
                        Total:
                      </td>
                      <td className="text-right py-4 pr-2">
                        {pesoSign}
                        {numberWithCommasToFixed(totalPrice, 2)}
                      </td>
                      <td className="text-right py-4 pr-2">
                        {pesoSign}
                        {numberWithCommasToFixed(totalAmount, 2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-3 mt-5 justify-end">
              <button className="btn btn-accent" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>

        {store.isDelete && (
          <ModalAdvanceDelete
            mysqlApiDelete={`/${ver}/purchase/${aid}`}
            queryKey="purchase-read-new-data"
            dataItem={data.product_name}
            item={data}
          />
        )}
      </WrapperModal>
    </>
  );
};

export default ModalAddPurchasePrice;
