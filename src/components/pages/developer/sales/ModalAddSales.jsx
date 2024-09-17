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
import SearchModalCustomer from "@/components/partials/search/SearchModalCustomer";
import SearchModalProductPrice from "@/components/partials/search/SearchModalProductPrice";
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
import ModalEditSales from "./ModalEditSales";

const ModalAddSales = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  const [editSupplier, setEditSupplier] = React.useState(false);
  const [itemEditSupplier, setItemEditSupplier] = React.useState(null);
  const [productData, setProductData] = React.useState(null);
  const [customerData, setCustomerData] = React.useState(null);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  const [isRequiredCustomerYup, setIsRequiredCustomerYup] = React.useState("");
  let counter = 1;
  let totalQty = 0;
  let totalPrice = 0;
  let totalDefects = 0;

  const {
    isLoading: loadingReceiving,
    isFetching: fetchingReceiving,
    error: errorReceiving,
    data: receivingData,
  } = useQueryData(
    `/${ver}/receiving-supply/read-new-receive`, // endpoint
    "post", // method
    "receiving-supply-read-new-receive", // key
    { receiving_supply_received_id: itemEdit ? itemEdit.receiving_aid : "0" },
    { receiving_supply_received_id: itemEdit ? itemEdit.receiving_aid : "0" }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/${ver}/receiving-supply/update-received-supply/${itemEdit.receiving_aid}`
          : `/${ver}/receiving-supply`,
        itemEdit ? "put" : "post",
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
        dispatch(setSuccess(true));
        dispatch(setMessage(`Record Successfully updated.`));
      }
    },
  });

  const [
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    aid,
    data,
    isActive,
  ] = useTableActions({
    setItemEdit,
  });

  const handleEditSupplier = (item) => {
    setEditSupplier(true);
    setItemEditSupplier(item);
  };

  const handleClose = () => {
    queryClient.invalidateQueries({
      queryKey: ["receiving"],
    });

    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 0);
  };

  const handleSearch = () => {
    if (customerData === null || typeof customerData === "undefined") {
      setIsRequiredCustomerYup(Yup.string().required("Required"));
    }
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = {
    sales_list_date: getDateNow(),
    sales_customer_id: "",
    sales_list_quantity: "",
    sales_payment_method: "cash",
    searchCustomer: "",
    searchProduct: "",
  };

  const yupSchema = Yup.object({
    sales_list_date: Yup.string().required("Required"),
    searchCustomer: isRequiredCustomerYup,
    searchProduct: isRequiredProductYup,
  });

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2 ">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              Sales List
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
                let price = 0;
                let productId = 0;
                let customerId = 0;
                if (customerData !== null) {
                  customerId = customerData?.customer_aid;
                  if (productData !== null) {
                    productId = productData?.product_price_amount;
                    if (customerData?.customer_is_member === 1) {
                      price = productData?.product_price_scc_price;
                    } else {
                      price = productData?.product_price_amount;
                    }
                  }
                }

                mutation.mutate({
                  ...values,
                  sales_list_price: price,
                  sales_list_product_id: productId,
                  sales_list_customer_id: customerId,
                  sales_customer_id: customerId,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="flex my-2 gap-2">
                      <div className="input-wrap">
                        <InputText
                          label="Receiving Date"
                          type="date"
                          name="sales_list_date"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrap">
                        <SearchModalCustomer
                          setData={setCustomerData}
                          props={props.values}
                          label="Search Customer"
                          name="searchCustomer"
                          mutation={mutation}
                          setIsRequiredYup={setIsRequiredCustomerYup}
                        />
                      </div>

                      <div className="input-wrap">
                        <InputSelect
                          label="Payment method"
                          name="sales_payment_method"
                        >
                          <optgroup label="Payment method">
                            <option value="cash">Cash</option>
                            <option value="gcash">Gcash</option>
                            <option value="credit">Credit</option>
                            <option value="card">
                              Card (ex. credit, debit )
                            </option>
                          </optgroup>
                        </InputSelect>
                      </div>
                    </div>

                    <div className="md:grid md:grid-cols-[1fr_1fr]  gap-2 mb-5 items-end">
                      <div></div>
                      <div className="md:grid md:grid-cols-[1fr_1fr_5rem] gap-2 mb-5 items-end">
                        <div className="input-wrap">
                          <SearchModalProductPrice
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
                            label="Qty"
                            type="text"
                            number="number"
                            name="receiving_supply_quantity"
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
                      <th>Product</th>
                      <th>Barcode</th>
                      <th>Unit</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right ">Price</th>
                      <th className="text-right">Amount</th>
                      <th className="text-right">Remarks</th>
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
                      totalQty += Number(item.receiving_supply_quantity);
                      totalPrice += Number(item.receiving_supply_price);
                      totalDefects += Number(
                        item.receiving_supply_defective_product_qty
                      );
                      return (
                        <tr
                          key={key}
                          className={
                            Number(
                              item.receiving_supply_defective_product_qty
                            ) !== 0
                              ? "status-alert "
                              : ""
                          }
                        >
                          <td className="w-counter">{counter++}.</td>

                          <td>{item.supplier_name}</td>

                          <td>{item.product_name}</td>
                          <td>{item.receiving_supply_barcode}</td>
                          <td>{item.settings_unit_name}</td>
                          <td className="text-center">
                            {item.receiving_supply_quantity}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(
                              item.receiving_supply_price,
                              2
                            )}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(
                              item.receiving_supply_amount,
                              2
                            )}
                          </td>
                          <td className="text-right">
                            {Number(
                              item.receiving_supply_defective_product_qty
                            )}
                          </td>
                          <td className="table-action ">
                            <ul>
                              <li className="">
                                <button
                                  data-tooltip="Edit"
                                  className="tooltip after:!z-50"
                                  onClick={() =>
                                    handleEditSupplier({
                                      ...item,
                                      amount:
                                        receivingData?.count > 0
                                          ? receivingData?.amount
                                          : 0,
                                    })
                                  }
                                >
                                  <SquarePen size={14} />
                                </button>
                              </li>
                              <li>
                                <button
                                  data-tooltip="Delete"
                                  className="tooltip"
                                  onClick={() =>
                                    handleRemove(
                                      item.receiving_supply_aid,
                                      item
                                    )
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
                      <td colSpan={6} className="py-4 pl-2 text-right ">
                        Total:
                      </td>
                      <td className="text-right py-4 pr-2">
                        {pesoSign}
                        {numberWithCommasToFixed(totalPrice, 2)}
                      </td>
                      <td className="text-right py-4 pr-2"></td>
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

        {editSupplier && (
          <ModalEditSales
            itemEdit={itemEditSupplier}
            setEditSupplier={setEditSupplier}
          />
        )}

        {store.isDelete && (
          <ModalAdvanceDelete
            mysqlApiDelete={`/${ver}/receiving-supply/${aid}`}
            queryKey="receiving-supply-read-new-receive"
            dataItem={data.product_name}
            item={data}
          />
        )}
      </WrapperModal>
    </>
  );
};

export default ModalAddSales;
