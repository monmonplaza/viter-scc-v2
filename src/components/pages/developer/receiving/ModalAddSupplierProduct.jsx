import { handleEscape, ver } from "@/components/helpers/functions-general";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { PillBottle, Plus, X } from "lucide-react";
import React from "react";

import { InputText } from "@/components/helpers/FormInputs.jsx";
import SupplierProductForm from "./supplier-product/SupplierProductForm";
import SupplierProductList from "./supplier-product/SupplierProductList";

const ModalAddSupplierProduct = () => {
  const handleClose = () => {
    dispatch(setIsAnimating(false));
    setTimeout(() => {
      dispatch(setIsAnimating(true));
      dispatch(setIsAdd(false));
    }, 300);
  };

  React.useEffect(() => handleEscape(handleClose), []);

  return (
    <>
      <WrapperModal>
        <div className="modal-center rounded-md !bg-primary !max-w-[1200px] border border-line mx-2">
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
            <div className="flex justify-between my-2">
              <div className="input-wrap">
                <label htmlFor="">Receiving Date</label>
                <input type="date" />
              </div>
            </div>
            <div className="p-4">
              <button className=" btn btn-accent ml-auto">
                <Plus /> Add Product
              </button>
              <div className="grid grid-cols-5 gap-4 mb-5">
                <div className="input-wrap">
                  <label htmlFor="">Search Supplier</label>
                  <input type="date" />
                </div>
                <div className="input-wrap">
                  <label htmlFor="">Search Supplier</label>
                  <input type="date" />
                </div>

                <div className="input-wrap">
                  <label htmlFor="">Quantity</label>
                  <input type="date" />
                </div>

                <div className="input-wrap">
                  <label htmlFor="">Unit</label>
                  <input type="date" />
                </div>

                <div className="input-wrap">
                  <label htmlFor="">Price</label>
                  <input type="date" />
                </div>
              </div>

              <div className="table-wrapper w-full">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Supplier</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>ASD</td>
                      <td>Chippy</td>
                      <td>20</td>
                      <td>10</td>
                      <td>per piece</td>
                      <td>300</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-right mt-5">Total: 2000</h3>
              </div>

              <div className="flex gap-3 mt-5 justify-end">
                <button className="btn btn-accent">Save Receiving</button>
                <button className="btn btn-discard">Discard</button>
              </div>
            </div>
          </div>
        </div>
      </WrapperModal>
    </>
  );
};

export default ModalAddSupplierProduct;
