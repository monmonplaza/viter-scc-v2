import WrapperModal from "@/components/partials/wrapper/WrapperModal.jsx";
import { File, Files, Plus, X } from "lucide-react";

const ModalProduct = () => {
  return (
    <WrapperModal>
      <div className=" modal-main ">
        <div className="modal-header ">
          <h3 className="flex items-center gap-2 !font-regular font-normal">
            <File size={16} />
            New Supplier
          </h3>
          <button type="button">
            <X size={20} />
          </button>
        </div>
        <form>
          <div className=" modal-body  ">
            <div className="modal-form">
              <div className="input-wrap">
                <label htmlFor="">Label</label>
                <input type="text" />
                <span>xxxxx</span>
              </div>
              <div className="input-wrap">
                <label htmlFor="">Label</label>
                <textarea />
                <span>xxxxx</span>
              </div>
              <div className="input-wrap">
                <label htmlFor="">Label</label>
                <textarea />
                <span>xxxxx</span>
              </div>
              <div className="input-wrap">
                <label htmlFor="">Label</label>

                <select name="" id="">
                  <option value="">xxx</option>
                  <option value="">xxx</option>
                  <option value="">xxx</option>
                  <option value="">xxx</option>
                </select>
              </div>
              <div className="input-wrap">
                <label htmlFor="">Label</label>
                <input type="text" />
                <span>xxxxx</span>
              </div>
              <div className="input-wrap">
                <label htmlFor="">Label</label>
                <input type="text" />
                <span>xxxxx</span>
              </div>{" "}
            </div>

            <div className="modal-action ">
              <button className="btn btn-accent" type="submit">
                Save
              </button>
              <button className="btn btn-discard" type="reset">
                Discard
              </button>
            </div>
          </div>
        </form>
      </div>
    </WrapperModal>
  );
};

export default ModalProduct;
