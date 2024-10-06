import {
  devBaseImgUrl,
  formatInPeso,
} from "@/components/helpers/functions-general.jsx";
import SearchNoData from "@/components/partials/icons/SearchNoData";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { PrinterIcon } from "lucide-react";

const ModalPurchasePrint = ({ setPrintPreview, receivingData }) => {
  let totalAmount = 0;
  let totalPrice = 0;
  let counter = 1;
  const handleClose = () => setPrintPreview(false);

  console.log("receivingData", receivingData);
  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !max-w-[850px] !bg-primary print:!top-0 print:!translate-y-0">
          <div className="px-5 p-4 flex justify-between items-center print:hidden">
            <h3 className="mb-0 text-body flex gap-2">
              <PrinterIcon /> Print Preview
            </h3>
            <div className="flex gap-2">
              <button className="btn btn-accent" onClick={() => window.print()}>
                Print
              </button>
              <button className="btn btn-discard" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
          <div className="p-1 bg-gray-100">
            <main className=" m-5 bg-white shadow-md receipt-preview print:m-0 print:shadow-none">
              <div className="pt-6 px-4">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex gap-2 items-center mb-5">
                      <img
                        src={`${devBaseImgUrl}/logo.webp`}
                        alt=""
                        className="w-[40px] self-center"
                      />
                      <div className="translate-y-1">
                        <h4 className="leading-none text-black uppercase text-[19px] font-medium">
                          Sambahayan
                        </h4>
                        <p className="text-[11px] leading-none mb-0 text-black -translate-y-2 block font-regular">
                          Consumer Cooperative
                        </p>
                      </div>
                    </div>
                    <ul className="text-[10px] mb-5 space-y-1">
                      <li className="flex gap-1.5">
                        1118 Alvarez Street, Purok 3, Brgy. San Jose, San Pablo
                        <br />
                        City, Laguna 4000, Philippines
                      </li>
                      <li className="flex gap-1.5">(049) 548 – 3702</li>
                      <li className="flex gap-1.5">
                        sambahayanconsumercoop@gmail.com
                      </li>
                    </ul>
                  </div>
                  <div className="justify-self-end">
                    <h3 className="uppercase text-accent mb-5">
                      Purchase Order
                    </h3>

                    <ul className=" text-balance mb-1 text-black text-[10px]  space-y-1">
                      <li>PO No.: #0099-222-1234 </li>
                      <li>Date: 08/22/24 </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2  mb-10">
                  <div>
                    <h4 className="uppercase text-accent ">Bill To:</h4>
                    <ul className="text-[10px]">
                      <li>Name</li>
                      <li>Company Name</li>
                      <li>Address</li>
                      <li>Phone</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="uppercase text-accent">Delivery To:</h4>
                    <ul className="text-[10px]">
                      <li>Name</li>
                      <li>Company Name</li>
                      <li>Address</li>
                      <li>Phone</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="min-h-[400px] grid grid-rows-[1fr_auto]">
                <div className="px-4">
                  <div className="grid grid-cols-[1rem_2fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-3 border-y border-line mb-5">
                    <h5 className="mb-0 ">#</h5>
                    <h5 className="mb-0 ">Supplier</h5>
                    <h5 className="mb-0 ">Product</h5>
                    <h5 className="mb-0 ">Unit</h5>
                    <h5 className="mb-0 ">Quantity</h5>
                    <h5 className="mb-0 ">Price</h5>
                    <h5 className="mb-0 ">Amount</h5>
                  </div>

                  {receivingData?.count > 0 ? (
                    receivingData?.data.map((item, key) => {
                      totalAmount +=
                        Number(item.purchase_price) *
                        Number(item.purchase_quantity);
                      totalPrice += Number(item.purchase_price);
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-[1rem_2fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-0.5 "
                        >
                          <p>{counter++}.</p>
                          <p>{item.supplier_name}</p>
                          <p>{item.product_name}</p>
                          <p>{item.settings_unit_name}</p>
                          <p>{item.purchase_quantity}</p>
                          <p>{formatInPeso(item.purchase_price)}</p>
                          <p>
                            {formatInPeso(
                              Number(item.purchase_price) *
                                Number(item.purchase_quantity)
                            )}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <SearchNoData />
                  )}
                </div>

                <div className="border-t  py-5 flex justify-between pr-10 bg-gray-200 px-4">
                  <ul className="space-y-3">
                    <li className="text-xs text-black relative">
                      Requested By:
                      <span className="h-1 w-[10rem] border-b border-black block absolute bottom-0 left-full ml-3"></span>
                    </li>

                    <li className="text-xs text-black relative">
                      {" "}
                      Approve By:
                      <span className="h-1 w-[10rem] border-b border-black block absolute bottom-0 left-full ml-3"></span>
                    </li>
                  </ul>

                  <h3 className="text-black">
                    <span className="pr-5">Total:</span>
                    {formatInPeso(totalAmount)}
                  </h3>
                </div>
              </div>
            </main>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalPurchasePrint;
