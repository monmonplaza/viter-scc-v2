import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  formatDate,
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general";
import SearchNoData from "@/components/partials/icons/SearchNoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { setIsAnimating } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { PillBottle, Printer, X } from "lucide-react";
import React from "react";

const ModalAddSales = ({ itemEdit, setIsView }) => {
  const { dispatch, store } = React.useContext(StoreContext);
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

  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      setIsView(false);
    }, 0);
  };

  React.useEffect(() => handleEscape(handleClose), []);

  console.log("itemEdit", itemEdit);
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
            {SalesData?.count > 0 && (
              <>
                <div className="grid grid-cols-[1fr_5rem] gap-5 items-center">
                  <ul className="grid grid-cols-3 text-sm">
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
                      Payment method :
                      <span className="font-normal ml-2 capitalize">
                        {itemEdit.sales_payment_method}
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
                      <th className="text-center">Qty</th>
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
                        <tr key={key} className="">
                          <td className="w-counter">{counter++}.</td>

                          <td>{item.product_name}</td>
                          <td>{item.receiving_supply_barcode}</td>
                          <td>{item.settings_unit_name}</td>
                          <td className="text-center">
                            {item.sales_list_quantity}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <ul className="relative text-right">
              <li className="text-dark font-bold !border-none !shadow-none">
                <span colSpan={5} className="py-4 pl-2 text-right text-xl">
                  Total:
                </span>
                <span colSpan={2} className="text-right py-4 pr-2 text-xl">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </span>
              </li>
              <li className="text-dark font-bold !border-none !shadow-none">
                <span colSpan={5} className="py-4 pl-2 text-right text-xl">
                  Recieved Amount:
                </span>
                <span colSpan={2} className="text-right py-4 pr-2 text-xl">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </span>
              </li>
              <li className="text-dark font-bold !border-none !shadow-none">
                <span colSpan={5} className="py-4 pl-2 text-right text-xl">
                  Change:
                </span>
                <span colSpan={2} className="text-right py-4 pr-2 text-xl">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5 justify-end">
              <button className="btn btn-accent" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalAddSales;
