import Logo from "@/components/partials/icons/Logo.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import React from "react";

const ModalPurchasePrint = () => {
  return (
    <>
      <WrapperModal>
        <main className="modal-center rounded-md !max-w-[700px] bg-white">
          <div className="pt-6 px-4">
            <Logo />

            <ul className="text-sm text-balance flex justify-between mb-5">
              <li>#0099-222-1234 </li>
              <li>08/22/24 </li>
            </ul>
          </div>
          <div className="min-h-[300px] grid grid-rows-[1fr_auto] ">
            <div className="px-4">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 py-3 border-y border-line mb-5">
                <h5 className="mb-0 text-black">Supplier</h5>
                <h5 className="mb-0 text-black">Product</h5>
                <h5 className="mb-0 text-black">Unit</h5>
                <h5 className="mb-0 text-black">Quantity</h5>
                <h5 className="mb-0 text-black">Price</h5>
                <h5 className="mb-0 text-black">Amount</h5>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
                <p>Amazing ChuChu</p>
                <p>Ballpen</p>
                <p>Per Box</p>
                <p>10</p>
                <p>10.00</p>
                <p>100.00</p>
              </div>{" "}
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
                  <span className="h-1 w-[8rem] border-b border-black block absolute bottom-0 left-full ml-3"></span>
                </li>

                <li className="text-xs text-black relative">
                  {" "}
                  Approve By:
                  <span className="h-1 w-[8rem] border-b border-black block absolute bottom-0 left-full ml-3"></span>
                </li>
              </ul>

              <h3 className="text-black">
                <span className="pr-5">Total:</span> 400.00
              </h3>
            </div>
          </div>
        </main>
      </WrapperModal>
    </>
  );
};

export default ModalPurchasePrint;
