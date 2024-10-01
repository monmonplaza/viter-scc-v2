import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import {
  InputCheckbox,
  InputSelect,
  InputText,
} from "@/components/helpers/FormInputs";
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
import ModalSalesPrint from "./ModalSalesPrint.jsx";

const ModalAddSales = ({ itemEdit }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  const [productData, setProductData] = React.useState(null);
  const [customerData, setCustomerData] = React.useState(
    itemEdit ? itemEdit : null
  );
  const [isAcceptPayment, setIsAcceptPayment] = React.useState(false);
  const [editAmount, setEditAmount] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(
    itemEdit ? itemEdit.sales_payment_method : "credit"
  );
  const [quantity, setQuantity] = React.useState("");
  const [isUpdatequantity, setIsUpdateQuantity] = React.useState(0);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  const [isRequiredCustomerYup, setIsRequiredCustomerYup] = React.useState("");
  const [isRequiredAmountYup, setIsRequiredAmountYup] = React.useState("");
  const [isPrint, setIsPrint] = React.useState(false);
  let counter = 1;
  let totalAmount = 0;

  const { data: customerGuest } = useQueryData(
    `/${ver}/search-customer`,
    "post",
    "search-customer",
    {
      search: "guest",
    }
  );

  let guestData = customerGuest?.data.filter(
    (gItem) => gItem.customer_name === "Guest"
  );
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

  const {
    handleReset,
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleSuspend,
    aid,
    data,
    isActive,
  } = useTableActions({
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
    queryClient.invalidateQueries({
      queryKey: ["sales-list-read-new-receive"],
    });

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
        product_price_available_stock: val.product_price_available_stock,
        sales_list_quantity_old: val.sales_list_quantity,
        totalSalesAmount: val.sales_total_amount,
        sales_list_sales_id: val.sales_list_sales_id,
        sales_list_price: val.sales_list_price,
      }
    );

    if (result?.data) {
      // increment state to re-render page
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({
        queryKey: ["sales-list-read-new-receive"],
      });
    }
    if (!result?.success) {
      setQuantity(val.sales_list_quantity);
      dispatch(setValidate(true));
      dispatch(setMessage(result.error));
    }
  };

  const handleSubmitte = () => {
    setIsRequiredAmountYup(Yup.string().required("Required"));
    setIsAcceptPayment(true);
  };

  const handleSearch = (props) => {
    props.values.sales_list_quantity = "1";
    setIsRequiredAmountYup("");
    setIsAcceptPayment(false);

    if (customerData === null || typeof customerData === "undefined") {
      setIsRequiredCustomerYup(Yup.string().required("Required"));
    }
    if (productData === null || typeof productData === "undefined") {
      setIsRequiredProductYup(Yup.string().required("Required"));
    }
  };

  React.useEffect(() => {
    if (customerData === null && customerGuest?.count > 0) {
      setCustomerData(guestData[0]);
    }

    handleEscape(handleClose);
  }, [customerData]);

  const initVal = {
    ...itemEdit,
    sales_aid: itemEdit ? itemEdit.sales_aid : 0,
    sales_list_date: itemEdit ? itemEdit.sales_date : getDateNow(),
    sales_new_data: itemEdit ? itemEdit.sales_new_data : "",
    sales_list_quantity: "1",
    sales_payment_method: itemEdit ? itemEdit.sales_payment_method : "credit",
    searchCustomer: itemEdit ? itemEdit.customer_name : "",
    sales_list_price: itemEdit ? itemEdit.sales_list_price : "",
    searchProduct: "",
    sales_payment_amount: itemEdit
      ? Number(itemEdit.sales_payment_amount)
      : "0",
    isUpdate: itemEdit ? true : false,
  };

  const yupSchema = Yup.object({
    sales_list_date: Yup.string().required("Required"),
    sales_list_price: !isAcceptPayment && Yup.string().required("Required"),
    sales_payment_amount: isRequiredAmountYup,
    searchCustomer: isRequiredCustomerYup,
    searchProduct: isRequiredProductYup,
  });

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2 max-h-[80dvh] overflow-auto">
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
            {itemEdit && (
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
                      onClick={() => setIsPrint(true)}
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
                let productId = 0;
                let customerId = 0;
                let productPriceId = 0;
                if (customerData !== null) {
                  customerId = customerData?.customer_aid;
                }
                if (productData !== null) {
                  productId = productData?.product_price_product_id;
                  productPriceId = productData?.product_price_aid;
                }

                let totalSalesAmount =
                  SalesData?.count > 0
                    ? SalesData?.data[0].sales_total_amount
                    : 0;

                mutation.mutate({
                  ...values,
                  sales_list_product_id: productId,
                  sales_list_customer_id: itemEdit
                    ? itemEdit.sales_customer_id
                    : customerId,
                  sales_customer_id: itemEdit
                    ? itemEdit.sales_customer_id
                    : customerId,
                  sales_list_product_price_id: productPriceId,
                  product_price_available_stock:
                    productData?.product_price_available_stock,
                  sales_payment_method: paymentMethod,
                  totalSalesAmount,
                });
              }}
            >
              {(props) => {
                props.values.sales_list_price = !editAmount
                  ? productData !== null
                    ? customerData?.customer_is_member === 1
                      ? productData?.product_price_scc_price
                      : productData?.product_price_amount
                    : props.values.sales_list_price
                  : props.values.sales_list_price;
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
                              label="Sales Date"
                              type="date"
                              name="sales_list_date"
                              disabled={mutation.isPending}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="lg:grid lg:grid-cols-[1fr_10rem] gap-2 items-end">
                      <div
                        className={`${
                          itemEdit
                            ? "lg:grid lg:grid-cols-[1fr_15rem_8rem_5rem]"
                            : "lg:grid lg:grid-cols-[15rem_1fr_15rem_8rem_5rem]"
                        }  gap-2 items-end`}
                      >
                        {!itemEdit && (
                          <>
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
                          </>
                        )}

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
                          <InputSelect
                            label="Product Price"
                            name="sales_list_price"
                            onChange={(e) => {
                              setEditAmount(true);
                            }}
                          >
                            {productData !== null ? (
                              <>
                                {customerData?.customer_is_member === 1 ? (
                                  <optgroup label="Product Price">
                                    <option
                                      value={
                                        productData?.product_price_scc_price
                                      }
                                    >
                                      &#8369;
                                      {numberWithCommasToFixed(
                                        productData?.product_price_scc_price,
                                        2
                                      )}
                                    </option>
                                    <option
                                      value={
                                        productData?.product_price_scc_whole_sale_amount
                                      }
                                    >
                                      &#8369;
                                      {numberWithCommasToFixed(
                                        productData?.product_price_scc_whole_sale_amount,
                                        2
                                      )}{" "}
                                      - whole sale
                                    </option>
                                  </optgroup>
                                ) : (
                                  <optgroup label="Product Price">
                                    <option
                                      value={productData?.product_price_amount}
                                    >
                                      &#8369;
                                      {numberWithCommasToFixed(
                                        productData?.product_price_amount,
                                        2
                                      )}
                                    </option>
                                    <option
                                      value={
                                        productData?.product_price_whole_sale_amount
                                      }
                                    >
                                      &#8369;
                                      {numberWithCommasToFixed(
                                        productData?.product_price_whole_sale_amount,
                                        2
                                      )}{" "}
                                      - whole sale
                                    </option>
                                  </optgroup>
                                )}
                              </>
                            ) : (
                              <optgroup label="Product Price">
                                <option value="">No Data</option>
                              </optgroup>
                            )}
                          </InputSelect>
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
                          className="btn btn-accent ml-auto lg:mt-0 mt-5 !py-1 md:text-left lg:mb-2 "
                          type="submit"
                          disabled={mutation.isPending}
                          onClick={() => {
                            handleSearch(props);
                          }}
                        >
                          {mutation.isPending ? (
                            <SpinnerButton />
                          ) : (
                            <>
                              <Plus /> Add
                            </>
                          )}
                        </button>
                        <div className=""></div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className="relative">
              {!loadingSales && fetchingSales && <SpinnerTable />}
              <div className="table-wrapper w-full max-h-[30dvh] pb-0">
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
                        <tr key={key} className="h-[3rem] border-t border-b-0 ">
                          <td className="w-counter">{counter++}.</td>

                          <td>{item.product_name}</td>
                          <td>{item.receiving_supply_barcode}</td>
                          <td>{item.settings_unit_name}</td>
                          <td
                            className="text-center cursor-pointer p-0 relative"
                            onClick={() => {
                              setIsUpdateQuantity(key + 1);
                              setQuantity(item.sales_list_quantity);
                            }}
                          >
                            {Number(key) + 1 === Number(isUpdatequantity) ? (
                              <input
                                onChange={(e) => handleUpdateQuantity(e, item)}
                                className="text-center"
                                value={quantity}
                              />
                            ) : (
                              <input
                                className="text-center"
                                value={item.sales_list_quantity}
                                readOnly
                              />
                            )}
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
                                    handleRemove(item.sales_list_aid, {
                                      ...item,
                                      amount:
                                        Number(item.sales_list_price) *
                                        Number(item.sales_list_quantity),
                                    })
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
                </table>
              </div>
            </div>
            <div className="sm:grid grid-cols-2 lg:grid-cols-[50rem_1fr] pb-8">
              <div></div>
              {SalesData?.count > 0 && (
                <div className="">
                  <ul>
                    <li className="flex justify-end text-dark font-bold ">
                      <span colSpan={5} className="pl-2 text-right text-2xl">
                        Total:
                      </span>
                      <span colSpan={2} className="text-right pr-2 text-2xl">
                        {pesoSign}
                        {numberWithCommasToFixed(totalAmount, 2)}
                      </span>
                    </li>
                  </ul>
                  <Formik
                    initialValues={initVal}
                    validationSchema={yupSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      //

                      if (
                        values.sales_payment_method !== "credit" &&
                        Number(values.sales_payment_amount) <
                          Number(totalAmount)
                      ) {
                        dispatch(setValidate(true));
                        dispatch(setMessage("Insuficient payment amount"));
                        return;
                      }
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
                            <div className="flex justify-end mb-2">
                              <div className="input-wrap w-[16rem]">
                                <InputSelect
                                  label="Payment method"
                                  name="sales_payment_method"
                                  onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                  }}
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
        </div>

        {store.isDelete && (
          <ModalAdvanceDelete
            mysqlApiDelete={`/${ver}/sales-list/${aid}`}
            queryKey="sales-list-read-new-receive"
            dataItem={data.product_name}
            item={{ ...data, totalAmount }}
          />
        )}
      </WrapperModal>
      {isPrint && (
        <ModalSalesPrint
          setIsPrint={setIsPrint}
          refno={itemEdit.sales_reference_no}
          salesDate={itemEdit.sales_date}
        />
      )}
    </>
  );
};

export default ModalAddSales;
