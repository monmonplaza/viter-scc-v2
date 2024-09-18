import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import {
  formatDate,
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
import { PillBottle, Plus, Printer, Trash, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const ModalAddSales = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  const [productData, setProductData] = React.useState(null);
  const [customerData, setCustomerData] = React.useState(null);
  const [isAcceptPayment, setIsAcceptPayment] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(
    itemEdit ? itemEdit.sales_payment_method : ""
  );
  const [quantity, setQuantity] = React.useState("");
  const [isUpdatequantity, setIsUpdateQuantity] = React.useState(false);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  const [isRequiredCustomerYup, setIsRequiredCustomerYup] = React.useState("");
  const [isRequiredAmountYup, setIsRequiredAmountYup] = React.useState("");
  let counter = 1;
  let totalAmount = 0;

  const {
    isLoading: loadingSales,
    isFetching: fetchingSales,
    error: errorSales,
    data: SalesData,
  } = useQueryData(
    `/${ver}/sales-list/read-new-receive`, // endpoint
    "post", // method
    "sales-list-read-new-receive", // key
    { sales_aid: itemEdit ? itemEdit.sales_aid : "0" },
    { sales_aid: itemEdit ? itemEdit.sales_aid : "0" }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        isAcceptPayment === true
          ? `/${ver}/sales-list/accept-payment`
          : `/${ver}/sales-list`,
        isAcceptPayment ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["search-product-price"],
      });
      queryClient.invalidateQueries({
        queryKey: ["search-customer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["sales-list-read-new-receive"],
      });
      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });
      // show error box

      if (!isAcceptPayment) {
        if (!data.success) {
          dispatch(setValidate(true));
          dispatch(setMessage(data.error));
        } else {
          dispatch(setSuccess(true));
          dispatch(setMessage(`Record Successfully updated.`));
        }
      } else {
        if (!data.success) {
          dispatch(setValidate(true));
          dispatch(setMessage(data.error));
        } else {
          dispatch(setIsAdd(false));
          dispatch(setSuccess(true));
          dispatch(setMessage(`Record Successfully updated.`));
        }
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

  const handleClose = async () => {
    queryClient.invalidateQueries({
      queryKey: ["sales"],
    });

    const result = await queryData(
      `/${ver}/sales-list/update-new-data`,
      "put",
      {}
    );

    if (result.data) {
      // increment state to re-render page
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    }

    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 0);
  };

  const handleUpdateQuantity = async (e, val) => {
    setQuantity(e.target.value);
    queryClient.invalidateQueries({ queryKey: ["sales"] });
    const result = await queryData(
      `/${ver}/sales-list/update-quantity`,
      "put",
      {
        sales_list_quantity: e.target.value,
        sales_list_aid: val.sales_list_aid,
      }
    );

    if (result.data) {
      // increment state to re-render page
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    }
  };

  const handleChangeMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitte = () => {
    setIsRequiredAmountYup(Yup.string().required("Required"));
    setIsAcceptPayment(true);
  };

  const handleSearch = () => {
    setIsRequiredAmountYup("");
    setIsAcceptPayment(false);
    if (customerData === null || typeof customerData === "undefined") {
      setIsRequiredCustomerYup(Yup.string().required("Required"));
    }
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => handleEscape(handleClose), []);

  const initVal = {
    ...itemEdit,
    sales_aid: itemEdit ? itemEdit.sales_aid : 0,
    sales_list_date: itemEdit ? itemEdit.sales_date : getDateNow(),
    sales_new_data: itemEdit ? itemEdit.sales_new_data : "",
    sales_list_quantity: "1",
    sales_payment_method: itemEdit ? itemEdit.sales_payment_method : "credit",
    searchCustomer: itemEdit ? itemEdit.customer_name : "",
    searchProduct: "",
    sales_payment_amount: itemEdit ? itemEdit.sales_payment_amount : "0",
    isUpdate: itemEdit ? true : false,
  };

  const yupSchema = Yup.object({
    sales_list_date: Yup.string().required("Required"),
    sales_payment_amount: isRequiredAmountYup,
    searchCustomer: isRequiredCustomerYup,
    searchProduct: isRequiredProductYup,
  });

  console.log("productData", productData);

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
            {itemEdit && SalesData?.count > 0 && (
              <>
                <div className="grid grid-cols-[1fr_5rem] gap-5 items-center">
                  <ul className="grid grid-cols-2 text-sm">
                    <li className="!mb-0 mt-2 font-bold">
                      Date :
                      <span className="font-normal ml-2">
                        {formatDate(itemEdit.sales_date)}
                      </span>
                    </li>
                    <li className="!mb-0 mt-2 font-bold">
                      Reference No. :
                      <span className="font-normal ml-2">
                        {itemEdit.sales_reference_no}
                      </span>
                    </li>
                    <li className="!mb-0 mt-2 font-bold">
                      Customer :
                      <span className="font-normal ml-2">
                        {itemEdit.customer_name}
                      </span>
                    </li>
                  </ul>
                  <div className="">
                    <button
                      className="btn btn-accent md:text-left "
                      type="submit"
                    >
                      <Printer size={16} /> Print
                    </button>
                  </div>
                </div>
              </>
            )}
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                let price = 0;
                let productId = 0;
                let customerId = 0;
                let productPriceId = 0;
                if (customerData !== null) {
                  customerId = customerData?.customer_aid;
                }
                if (productData !== null) {
                  productId = productData?.product_price_product_id;
                  productPriceId = productData?.product_price_aid;
                  if (customerData?.customer_is_member === 1) {
                    price = productData?.product_price_scc_price;
                  } else {
                    price = productData?.product_price_amount;
                  }
                }

                //
                mutation.mutate({
                  ...values,
                  sales_list_price: price,
                  sales_list_product_id: productId,
                  sales_list_customer_id: itemEdit
                    ? itemEdit.sales_customer_id
                    : customerId,
                  sales_customer_id: itemEdit
                    ? itemEdit.sales_customer_id
                    : customerId,
                  sales_list_product_price_id: productPriceId,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    {!itemEdit && (
                      <>
                        {SalesData?.count > 0 && (
                          <div className="flex justify-between">
                            <p className="!mb-0 mt-2 font-bold">
                              Reference No :
                              <span className="font-normal ml-2">
                                {SalesData?.data[0].sales_reference_no}
                              </span>
                            </p>
                            <button
                              className="btn btn-accent ml-auto md:!m-0 !py-2 md:text-left md:mb-2"
                              type="submit"
                            >
                              <Printer size={16} /> Print
                            </button>
                          </div>
                        )}
                        <div className="flex mb-2 gap-2">
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
                                <option value="credit">Credit</option>
                                <option value="cash">Cash</option>
                                <option value="gcash">Gcash</option>
                                <option value="card">
                                  Card (ex. credit, debit )
                                </option>
                              </optgroup>
                            </InputSelect>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="md:grid md:grid-cols-[1fr_1fr]  gap-2 items-end">
                      {itemEdit ? (
                        <>
                          <div className="input-wrap w-[15rem]">
                            <InputSelect
                              label="Payment method"
                              name="sales_payment_method"
                              onChange={(e) => handleChangeMethod(e)}
                            >
                              <optgroup label="Payment method">
                                <option value="credit">Credit</option>
                                <option value="cash">Cash</option>
                                <option value="gcash">Gcash</option>
                                <option value="card">
                                  Card (ex. credit, debit )
                                </option>
                              </optgroup>
                            </InputSelect>
                          </div>
                        </>
                      ) : (
                        <div></div>
                      )}
                      <div className="md:grid md:grid-cols-[1fr_1fr_5rem] gap-2 items-end">
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
                            name="sales_list_quantity"
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
              {!loadingSales && fetchingSales && <SpinnerTable />}
              <div className="table-wrapper w-full max-h-[30dvh] ">
                <table
                  className={`${
                    !loadingSales && SalesData.count > 7 ? "has-sticky" : ""
                  }`}
                >
                  <thead className="">
                    <tr className="">
                      <th>#</th>
                      <th>Product</th>
                      <th>Barcode</th>
                      <th>Unit</th>
                      <th className="text-center w-[10rem]">Qty</th>
                      <th className="text-right ">Price</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody className=" ">
                    {((loadingSales && !fetchingSales) ||
                      SalesData?.data.length === 0) && (
                      <tr>
                        <td colSpan="100%">
                          {loadingSales ? (
                            <LoaderTable count={30} cols={6} />
                          ) : (
                            <SearchNoData />
                          )}
                        </td>
                      </tr>
                    )}
                    {errorSales && (
                      <tr>
                        <td colSpan="100%" className="p-10">
                          <ServerError />
                        </td>
                      </tr>
                    )}
                    {SalesData?.data.map((item, key) => {
                      totalAmount +=
                        Number(item.sales_list_price) *
                        Number(item.sales_list_quantity);
                      return (
                        <tr key={key} className="h-[3rem]">
                          <td className="w-counter">{counter++}.</td>

                          <td>{item.product_name}</td>
                          <td>{item.receiving_supply_barcode}</td>
                          <td>{item.settings_unit_name}</td>
                          <td
                            className="text-center cursor-pointer p-0 "
                            onClick={() => setIsUpdateQuantity(true)}
                          >
                            {/* quantity, setQuantity */}
                            <input
                              onChange={(e) => handleUpdateQuantity(e, item)}
                              className="text-center"
                            />
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(item.sales_list_price, 2)}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommasToFixed(
                              Number(item.sales_list_price) *
                                Number(item.sales_list_quantity),
                              2
                            )}
                          </td>
                          <td className="table-action !top-2">
                            <ul>
                              <li>
                                <button
                                  data-tooltip="Delete"
                                  className="tooltip"
                                  onClick={() =>
                                    handleRemove(item.sales_list_aid, item)
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
                  <tbody className="relative ">
                    <tr className="sticky -bottom-4 opacity-[100] !bg-primary !text-sm text-dark font-bold !border-none !shadow-none">
                      <td colSpan={5} className="py-4 pl-2 text-right text-2xl">
                        Total:
                      </td>
                      <td colSpan={2} className="text-right py-4 pr-2 text-2xl">
                        {pesoSign}
                        {numberWithCommasToFixed(totalAmount, 2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {SalesData?.count > 0 && (
              <div className="">
                <Formik
                  initialValues={initVal}
                  validationSchema={yupSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    //
                    mutation.mutate({
                      ...values,
                      sales_aid: SalesData?.data[0].sales_aid,
                      sales_total_amount: totalAmount,
                      sales_payment_method: paymentMethod,
                    });
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <div className=" ">
                          <div className="flex justify-end">
                            <div className="input-wrap">
                              <InputText
                                label="Amount"
                                type="text"
                                number="number"
                                name="sales_payment_amount"
                                className="text-right text-lg !m-0"
                                disabled={mutation.isPending}
                              />
                            </div>
                          </div>
                          <ul className="flex justify-end my-5">
                            <li>Change :</li>
                            {pesoSign}
                            {numberWithCommasToFixed(
                              Number(props.values.sales_payment_amount) === 0
                                ? 0
                                : Number(props.values.sales_payment_amount) -
                                    Number(totalAmount),
                              2
                            )}
                          </ul>
                        </div>
                        <div className="flex gap-3 mt-5 justify-end">
                          <button
                            className="btn btn-accent "
                            type="submit"
                            disabled={mutation.isPending}
                            onClick={handleSubmitte}
                          >
                            {mutation.isPending ? (
                              <SpinnerButton />
                            ) : (
                              <>Accept</>
                            )}
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            )}
          </div>
        </div>

        {store.isDelete && (
          <ModalAdvanceDelete
            mysqlApiDelete={`/${ver}/sales-list/${aid}`}
            queryKey="sales-list-read-new-receive"
            dataItem={data.product_name}
            item={data}
          />
        )}
      </WrapperModal>
    </>
  );
};

export default ModalAddSales;
