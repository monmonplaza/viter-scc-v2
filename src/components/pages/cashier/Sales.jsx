import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import useTableActions from "@/components/custom-hooks/useTableActions.jsx";
import { InputSelect, InputText } from "@/components/helpers/FormInputs.jsx";
import {
  getDateNow,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import SearchNoData from "@/components/partials/icons/SearchNoData.jsx";
import ServerError from "@/components/partials/icons/ServerError.jsx";
import LoaderTable from "@/components/partials/LoaderTable.jsx";
import ModalAdvanceDelete from "@/components/partials/modal/ModalAdvanceDelete.jsx";
import ModalValidate from "@/components/partials/modal/ModalValidate.jsx";
import SearchModalCustomer from "@/components/partials/search/SearchModalCustomer.jsx";
import SearchModalProductPrice from "@/components/partials/search/SearchModalProductPrice.jsx";
import SpinnerButton from "@/components/partials/spinners/SpinnerButton.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import ToastSuccess from "@/components/partials/ToastSuccess.jsx";
import {
  setError,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Plus, Trash } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const Sales = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  const [productData, setProductData] = React.useState(null);
  const [customerData, setCustomerData] = React.useState(null);
  const [isAcceptPayment, setIsAcceptPayment] = React.useState(false);
  const [editAmount, setEditAmount] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("credit");
  const [quantity, setQuantity] = React.useState("");
  const [isUpdatequantity, setIsUpdateQuantity] = React.useState(0);
  const [isRequiredProductYup, setIsRequiredProductYup] = React.useState("");
  const [isRequiredCustomerYup, setIsRequiredCustomerYup] = React.useState("");
  const [isRequiredAmountYup, setIsRequiredAmountYup] = React.useState("");

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
    { sales_aid: "0" },
    { sales_aid: "0" }
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
          dispatch(setSuccess(true));
          dispatch(setMessage(`Transaction Completed.`));
        }
      }
    },
  });

  const { handleRemove, aid, data } = useTableActions({});

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
    props.values.sales_list_quantity = 1;
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
  }, [customerData]);

  const initVal = {
    sales_aid: 0,
    sales_list_date: getDateNow(),
    sales_new_data: "",
    sales_list_quantity: "1",
    sales_payment_method: "credit",
    searchCustomer: "",
    sales_list_price: "",
    searchProduct: "",
    sales_payment_amount: "0",
    isUpdate: false,
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
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper bg-secondary">
              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Sales</h1>
              </div>

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
                    sales_list_customer_id: customerId,
                    sales_customer_id: customerId,
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
                      <div className="input-wrap max-w-[300px]">
                        <InputText
                          label="Sales Date"
                          type="date"
                          name="sales_list_date"
                          disabled={mutation.isPending}
                        />
                      </div>

                      <div className="grid grid-cols-6 items-end  gap-4">
                        <div className="input-wrap mb-0">
                          <SearchModalCustomer
                            setData={setCustomerData}
                            props={props.values}
                            label="Search Customer"
                            name="searchCustomer"
                            mutation={mutation}
                            setIsRequiredYup={setIsRequiredCustomerYup}
                          />
                        </div>

                        <div className="input-wrap mb-0">
                          <SearchModalProductPrice
                            setData={setProductData}
                            props={props.values}
                            label="Search Product"
                            name="searchProduct"
                            mutation={mutation}
                            setIsRequiredYup={setIsRequiredProductYup}
                          />
                        </div>
                        <div className="input-wrap mb-0">
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

                        <div className="input-wrap mb-0">
                          <InputText
                            label="Qty"
                            type="text"
                            number="number"
                            name="sales_list_quantity"
                            disabled={mutation.isPending}
                          />
                        </div>

                        <button
                          className="btn btn-accent btn-sm justify-self-start"
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
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              <div className="bg-primary p-4 mt-5 rounded-md grid grid-cols-[1fr_260px] gap-5">
                {!loadingSales && fetchingSales && <SpinnerTable />}
                <div className="table-wrapper w-full min-h-[400px] h-full overflow-auto">
                  <table
                    className={`${
                      !loadingSales && SalesData.count > 7 ? "has-sticky" : ""
                    }`}
                  >
                    <thead>
                      <tr>
                        <th className="w-counter">#</th>
                        <th className="w-[100px]">Product</th>
                        <th className="w-[100px]">Unit</th>
                        <th className="w-[30px] text-center">Qty</th>
                        <th className="w-[100px] text-right">Price</th>
                        <th className="w-[150px] text-right">Amount</th>
                        <th className="w-0"></th>
                      </tr>
                    </thead>
                    <tbody>
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
                          <tr key={key}>
                            <td className="w-counter">{counter++}.</td>
                            <td>{item.product_name}</td>
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
                                  onChange={(e) =>
                                    handleUpdateQuantity(e, item)
                                  }
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
                              {numberWithCommasToFixed(
                                item.sales_list_price,
                                2
                              )}
                            </td>
                            <td className="text-right">
                              {pesoSign}
                              {numberWithCommasToFixed(
                                Number(item.sales_list_price) *
                                  Number(item.sales_list_quantity),
                                2
                              )}
                            </td>
                            <td className="table-action !top-0.5">
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

                <Formik
                  initialValues={initVal}
                  validationSchema={yupSchema}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    if (
                      Number(values.sales_payment_amount) -
                        Number(totalAmount) <
                      0
                    ) {
                      dispatch(setValidate(true));
                      dispatch(setMessage("Insufficient Amount"));
                      return;
                    }

                    mutation.mutate({
                      ...values,
                      sales_aid: SalesData?.data[0].sales_aid,
                      sales_total_amount: totalAmount,
                      sales_payment_method: paymentMethod,
                    });
                    resetForm();
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <div className=" p-4 border border-line flex flex-col justify-between rounded-md h-full">
                          <div className="space-y-3">
                            <ul className="grid grid-cols-2 items-center text-xl font-bold ">
                              <li className="">Total</li>
                              <li className="text-right">
                                {pesoSign}
                                {numberWithCommasToFixed(totalAmount, 2)}
                              </li>
                            </ul>

                            <div className="input-wrap">
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

                            <ul className="grid grid-cols-2 items-center text-sm font-bold ">
                              <li className="">Change</li>
                              <li className="text-right">
                                {pesoSign}
                                {Number(props.values.sales_payment_amount) === 0
                                  ? 0
                                  : Number(props.values.sales_payment_amount) -
                                      Number(totalAmount) <
                                    0
                                  ? "Invalid"
                                  : numberWithCommasToFixed(
                                      Number(
                                        props.values.sales_payment_amount
                                      ) - Number(totalAmount)
                                    )}
                              </li>
                            </ul>
                          </div>

                          <button
                            className="btn btn-accent w-full center-all"
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
            </div>
            <Footer />
          </div>
        </main>
      </div>

      {store.validate && <ModalValidate />}
      {store.isDelete && (
        <ModalAdvanceDelete
          mysqlApiDelete={`/${ver}/sales-list/${aid}`}
          queryKey="sales-list-read-new-receive"
          dataItem={data.product_name}
          item={{ ...data, totalAmount }}
        />
      )}

      {store.success && <ToastSuccess />}
    </>
  );
};

export default Sales;
