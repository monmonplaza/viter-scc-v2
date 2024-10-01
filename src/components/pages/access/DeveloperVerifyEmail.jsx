import useQueryData from "@/components/custom-hooks/useQueryData.jsx";
import {
  devNavUrl,
  getUrlParam,
  urlSystem,
  ver,
} from "@/components/helpers/functions-general.jsx";
import PageNotFound from "@/components/partials/PageNotFound.jsx";
import SpinnerTable from "@/components/partials/spinners/SpinnerTable.jsx";
import { Check } from "lucide-react";
import React from "react";

const DeveloperVerifyEmail = () => {
  const key = getUrlParam().get("key");

  const { isLoading, data: changeEmail } = useQueryData(
    `/${ver}/settings-developer/verify-email/${key}`,
    "get", // method
    "developer-change-email" // key
  );
  return (
    <>
      {isLoading ? (
        <SpinnerTable />
      ) : changeEmail?.count === 0 || key === null || key === "" ? (
        <PageNotFound />
      ) : (
        <div className="bg-primary h-screen center-all">
          <div className=" relative -translate-y-[100px] ">
            <div className="m-auto max-w-[340px] text-center p-6 bg-secondary rounded-md ">
              <Check
                size={40}
                className="mx-auto stroke-success !stroke-[4px]"
              />
              <h2 className="mb-4 mt-2 text-lg text-center">Success!</h2>
              <p className="mb-6">
                Your email has been successfully changed! You can now login
                using your new email.
              </p>
              <a
                href={`${devNavUrl}/${urlSystem}/login`}
                className="btn btn-accent w-full flex justify-center items-center gap-2 hover:underline"
              >
                Go to login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeveloperVerifyEmail;
