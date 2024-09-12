import useQueryData from "@/components/custom-hooks/useQueryData";
import {
  formatDate,
  handleEscape,
  numberWithCommasToFixed,
  pesoSign,
  ver,
} from "@/components/helpers/functions-general";
import NoData from "@/components/partials/icons/NoData";
import ServerError from "@/components/partials/icons/ServerError";
import LoaderTable from "@/components/partials/LoaderTable";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { setIsAdd, setIsAnimating } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { ListCollapse, PillBottle, SquarePen, X } from "lucide-react";
import React from "react";

const ModalViewSupplierProduct = ({ itemEdit, setIsView }) => {
  const { dispatch, store } = React.useContext(StoreContext);
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

  const handleClose = () => {
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
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2 animation-none">
          <div className="p-2.5 border-b border-line flex justify-between">
            <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
              <PillBottle size={16} />
              Manage Supplier Product
            </h4>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <div className="relative">
              {!loadingReceiving && fetchingReceiving && <SpinnerTable />}
              <div className="table-wrapper w-full">
                <table>
                  <thead className="relative">
                    <tr className="sticky top-0 bg-inherit">
                      <th>#</th>
                      <th>Supplier</th>
                      <th>Product</th>
                      <th>Barcode</th>
                      <th>Expiration Date</th>
                      <th>Unit</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right ">Price</th>
                      <th className="text-right">Amount</th>
                      <th className="text-right">Defective</th>
                    </tr>
                  </thead>

                  <tbody>
                    {((loadingReceiving && !fetchingReceiving) ||
                      receivingData?.data.length === 0) && (
                      <tr>
                        <td colSpan="100%">
                          {loadingReceiving ? (
                            <LoaderTable count={30} cols={6} />
                          ) : (
                            <NoData />
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
                          <td>
                            {formatDate(item.receiving_supply_expiration_date)}
                          </td>
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
                            {item.receiving_supply_defective_product_qty}
                          </td>
                          {/* <td className="table-action">
                            <ul>
                              <li>
                                <button
                                  data-tooltip="Edit"
                                  className="tooltip !overflow-visible"
                                  // onClick={() =>
                                  //   handleEdit(item.receiving_aid, item)
                                  // }
                                >
                                  <SquarePen size={14} />
                                </button>
                              </li>
                            </ul>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody>
                    <tr className=" !bg-primary !text-sm text-dark font-bold !border-none !shadow-none">
                      <td colSpan={5} className=""></td>
                      <td className="py-4 pl-2 ">Total:</td>
                      <td className="text-right py-4 pr-2">
                        {Number(totalQty)}
                      </td>
                      <td className="text-right py-4 pr-2">
                        {pesoSign}
                        {numberWithCommasToFixed(totalPrice, 2)}
                      </td>
                      <td className="text-right py-4 pr-2">
                        {pesoSign}
                        {numberWithCommasToFixed(
                          receivingData?.count > 0 ? receivingData?.amount : 0,
                          2
                        )}
                      </td>
                      <td className="text-right py-4 pr-2">
                        {Number(totalDefects)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-right mt-5 mr-7">
              Total:{pesoSign}
              {numberWithCommasToFixed(
                receivingData?.count > 0 ? receivingData?.amount : 0,
                2
              )}
            </h3>
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

export default ModalViewSupplierProduct;
