import { devBaseImgUrl } from "@/components/helpers/functions-general.jsx";
import Logo from "@/components/partials/icons/Logo.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { Printer, PrinterIcon } from "lucide-react";
import React from "react";

const ModalPurchasePrint = ({ setPrintPreview }) => {
  const handleClose = () => setPrintPreview(false);

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !max-w-[700px] !bg-primary ">
          <div className="px-5 p-4 flex justify-between items-center">
            <h3 className="mb-0 text-body flex gap-2">
              <PrinterIcon /> Print Preview
            </h3>
            <div className="flex gap-2">
              <button className="btn btn-accent ">Print</button>
              <button className="btn btn-discard" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-100">
            <main className=" m-5 bg-white shadow-md receipt-preview">
              <div className="pt-6 px-4">
                <div className="flex gap-5 justify-center flex-col text-center mb-3">
                  <img
                    src={`${devBaseImgUrl}/logo.webp`}
                    alt=""
                    className="w-[80px] mx-auto -mb-4"
                  />
                  <div>
                    <h4 className="leading-none text-black uppercase text-[19px] font-medium">
                      Sambahayan
                    </h4>
                    <p className="text-[11px] leading-none mb-0 text-black -translate-y-2 block font-regular">
                      Consumer Cooperative
                    </p>
                  </div>
                </div>

                <ul className="text-sm text-balance flex justify-between mb-2 text-black">
                  <li>#0099-222-1234 </li>
                  <li>08/22/24 </li>
                </ul>
              </div>
              <div className="min-h-[400px] grid grid-rows-[1fr_auto]">
                <div className="px-4">
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-3 border-y border-line mb-5">
                    <h5 className="mb-0 ">Supplier</h5>
                    <h5 className="mb-0 ">Product</h5>
                    <h5 className="mb-0 ">Unit</h5>
                    <h5 className="mb-0 ">Quantity</h5>
                    <h5 className="mb-0 ">Price</h5>
                    <h5 className="mb-0 ">Amount</h5>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2 ">
                    <p>Amazing ChuChu</p>
                    <p>Ballpen</p>
                    <p>Per Box</p>
                    <p>10</p>
                    <p>10.00</p>
                    <p>100.00</p>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
                    <p>Amazing ChuChu</p>
                    <p>Ballpen</p>
                    <p>Per Box</p>
                    <p>10</p>
                    <p>10.00</p>
                    <p>100.00</p>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
                    <p>Amazing ChuChu</p>
                    <p>Ballpen</p>
                    <p>Per Box</p>
                    <p>10</p>
                    <p>10.00</p>
                    <p>100.00</p>
                  </div>
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
                    <span className="pr-5">Total:</span> 400.00
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
