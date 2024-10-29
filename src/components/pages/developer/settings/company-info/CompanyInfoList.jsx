import { devBaseImgUrl } from "@/components/helpers/functions-general";
import { StoreContext } from "@/components/store/StoreContext";
import React from "react";

const CompanyInfoList = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <h3>Details</h3>
      <ul className="grid sm:grid-cols-[10rem_1fr] text-sm mt-5">
        <li className="sm:mb-2">Company Name:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_name}</li>
        <li className="sm:mb-2">Company Email:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_email}</li>
        <li className="sm:mb-2">Company Mobile:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_mobile}</li>
        <li className="sm:mb-2">Company Phone:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_phone}</li>
        <li className="sm:mb-2">Street:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_address.split("^")[0]}
        </li>
        <li className="sm:mb-2">City:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_address.split("^")[1]}
        </li>
        <li className="sm:mb-2">Province:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_address.split("^")[2]}
        </li>
        <li className="sm:mb-2">Postal:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_address.split("^")[3]}
        </li>
        <li className="sm:mb-2">Country:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_address.split("^")[4]}
        </li>
        <li className="sm:mb-2">Accent Color:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_color_accent}</li>
        <li className="sm:mb-2">Secondary Color:</li>
        <li className="sm:mb-0 mb-2">{item?.company_info_color_secondary}</li>
        <li className="sm:mb-2">Company Logo:</li>
        <li className="sm:mb-0 mb-2">
          {item?.company_info_logo}
          {item?.company_info_logo === null ? (
            <Image size={29} />
          ) : (
            <>
              <img
                src={
                  devBaseImgUrl + "/" + item?.company_info_logo // check db
                }
                alt="employee photo"
                // className="w-[25px] h-[25px] my-5"
              />
            </>
          )}
        </li>
      </ul>
    </>
  );
};

export default CompanyInfoList;
