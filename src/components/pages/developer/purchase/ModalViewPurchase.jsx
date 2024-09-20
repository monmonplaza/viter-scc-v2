import useQueryData from "@/components/custom-hooks/useQueryData";
import useTableActions from "@/components/custom-hooks/useTableActions";
import {
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general";
import SearchNoData from "@/components/partials/icons/SearchNoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import ModalAdvanceDelete from "@/components/partials/modal/ModalAdvanceDelete";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { setIsAdd, setIsAnimating } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { PillBottle, Trash, X } from "lucide-react";
import React from "react";

const ModalViewPurchase = ({ itemEdit, setIsView }) => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [modalItemEdit, setItemEdit] = React.useState(null);
  let counter = 1;
  let totalAmount = 0;
  let totalPrice = 0;

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
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      setIsView(false);
    }, 0);
  };

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2 !animate-none">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              Purchase List
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <div className="flex gap-3 justify-end">
              <button className="btn btn-accent">Print</button>
            </div>
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
                          <td className="table-action ">
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
                  {/* <tbody>
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
                  </tbody> */}
                </table>
              </div>
            </div>
            <ul>
              <li className="flex justify-end text-dark font-bold pb-8">
                <span colSpan={5} className="pl-2 text-right text-2xl">
                  Total:
                </span>
                <span colSpan={2} className="text-right pr-2 text-2xl">
                  {pesoSign}
                  {numberWithCommasToFixed(totalAmount, 2)}
                </span>
              </li>
            </ul>
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

export default ModalViewPurchase;
