import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { Archive, PillBottle, SquarePen, Trash, X } from "lucide-react";
import React from "react";

const ModalSupplierProduct = () => {
  return (
    <WrapperModal>
      <div className="modal-center rounded-md !bg-primary !max-w-[900px] border border-line">
        <div className="p-2.5 border-b border-line flex justify-between">
          <h4 className="flex items-center gap-2 !font-medium text-body mb-0">
            <PillBottle size={16} />
            Manage Supplier Product
          </h4>
          <button type="button">
            <X />
          </button>
        </div>

        <div className="p-4 supplier-filter">
          <form action="">
            <div className="input-wrap">
              <label htmlFor=""></label>
              <input type="date" />
            </div>
          </form>
        </div>

        <div className="table-wrapper-modal p-4">
          <table class>
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
                <td>ABC</td>
                <td>Chippy</td>
                <td>20</td>
                <td>10</td>
                <td>Per Piece</td>
                <td>200</td>
                <td className="table-action">
                  <ul>
                    <li>
                      <button data-tooltip="Edit" className="tooltip">
                        <SquarePen size={14} />
                      </button>
                    </li>

                    <li>
                      <button data-tooltip="Archive" className="tooltip">
                        <Archive size={14} />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <h3>Total: 400</h3>
        </div>
      </div>
    </WrapperModal>
  );
};

export default ModalSupplierProduct;
