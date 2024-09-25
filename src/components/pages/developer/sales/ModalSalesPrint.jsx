import {
  devBaseImgUrl,
  formatInPeso,
} from "@/components/helpers/functions-general.jsx";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { PrinterIcon } from "lucide-react";
import React from "react";

const ModalSalesPrint = ({ setIsPrint, refno, salesDate }) => {
  const handleClose = () => setIsPrint(false);

  const date = new Date();
  var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const dayName = days[date];

  console.log(date);
  return (
    <WrapperModal>
      {" "}
      <div className="modal-center  !max-w-[370px] !bg-primary print:!top-0 print:!translate-y-0 ">
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
        <div className="p-1 bg-gray-100 max-h-[660px] overflow-auto print:overflow-visible print:h-auto">
          <main className=" m-5 bg-white shadow-md receipt-preview print:m-0 print:shadow-none  border border-line">
            <div className="pt-6 px-4">
              <div className="flex flex-col items-center mb-3">
                <div className="flex gap-2 items-center ">
                  <img
                    src={`${devBaseImgUrl}/logo.webp`}
                    alt=""
                    className="w-[40px] "
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
              </div>
            </div>

            <div className="text-center mb-5">
              <p className="mb-0">Reference No.: {refno}</p>
              <p className="mb-0">
                {salesDate}
                {/* {date.toLocaleString("ph-PH", { timeZone: "Asia/Manila" })} */}
              </p>
            </div>

            <div className="grid grid-rows-[1fr_auto] px-4 overflow-auto">
              <div className="">
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-2  ">
                  <h5 className="mb-0 ">Description</h5>
                  <h5 className="mb-0 ">QTY</h5>
                  <h5 className="mb-0 text-right">Price</h5>
                </div>

                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>

                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>

                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>

                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
                <div className="grid grid-cols-[3fr_20px_1fr] gap-2 py-1 ">
                  <p className="mb-0">Ballpen</p>
                  <p className="mb-0">x3</p>
                  <p className="mb-0 text-right">200</p>
                </div>
              </div>

              <div className="py-3 border-y border-line mb-5 space-y-1.5">
                <ul className="text-xs flex justify-between w-full">
                  <li>Subtotal</li>
                  <li>{formatInPeso(2000)}</li>
                </ul>
                <ul className="text-xs flex justify-between w-full">
                  <li>Tax</li>
                  <li>{formatInPeso(20)}</li>
                </ul>
                <ul className="text-xs flex justify-between w-full">
                  <li className="font-bold text-base">Total</li>
                  <li className="font-bold text-base">{formatInPeso(2020)}</li>
                </ul>
              </div>

              <div className="py-3 mb-5  space-y-1.5">
                <ul className="text-xs flex justify-between w-full">
                  <li>Cash</li>
                  <li>{formatInPeso(2500)}</li>
                </ul>

                <ul className="text-xs flex justify-between w-full">
                  <li>Change</li>
                  <li>{formatInPeso(480)}</li>
                </ul>
              </div>
            </div>

            <ul className="text-[10px] py-5 text-center px-2">
              <li className="gap-1.5">
                1118 Alvarez Street, Purok 3, Brgy. San Jose, San Pablo City,
                <br />
                Laguna 4000, Philippines
              </li>
              <li className="gap-1.5">sambahayanconsumercoop@gmail.com</li>
              <li className="gap-1.5">(049) 548 – 3702</li>
            </ul>
          </main>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalSalesPrint;
