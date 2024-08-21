import { Archive, Search, SquarePen } from "lucide-react";
import React from "react";

const ProductList = () => {
  return (
    <>
      <div className="table-filter flex flex-col md:flex-row justify-between items-center gap-4 mb-1">
        <div className="input-wrap filter w-full md:w-auto">
          <select name="" id="">
            <option value="">All</option>
            <option value="">Active</option>
            <option value="">Inactive</option>
          </select>
        </div>

        <div className="input-wrap search relative w-full md:w-auto">
          <Search size={20} className="absolute" />
          <input type="search" placeholder="Search..." className="pl-10" />
        </div>
      </div>

      <div className="table-wrapper  ">
        <table>
          <thead>
            <tr>
              <td className="w-[30px]">#</td>
              <td className="w-[200px]">Company</td>
              <td>Representative</td>
              <td>Address</td>
              <td>Email</td>
              <td>Phone</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mang Inasal</td>
              <td>Facundo Aguire</td>
              <td>
                <p className="max-w-[500px] truncate mb-0">
                  21st street Bonifacio Avenue San Pablo City Bonifacio Avenue
                  San Pablo City
                </p>
              </td>
              <td>facundo.aguire@gmail.com</td>
              <td>0922 2354 123</td>
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
    </>
  );
};

export default ProductList;
