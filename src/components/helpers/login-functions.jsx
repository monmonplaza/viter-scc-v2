import { devNavUrl, urlAdmin, urlSystem } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  // console.log("checkRoleToRedirect", data);
  // {
  //   data.subscriber_type === "payroll"
  //     ? navigate(
  //         `${devNavUrl}/${data.role_name
  //           .toLowerCase()
  //           .replaceAll(" ", "-")}/time`
  //       )
  //     : navigate(`${devNavUrl}/developer/overview`);
  //   // : navigate(
  //   //     `${devNavUrl}/${data.role_name
  //   //       .toLowerCase()
  //   //       .replaceAll(" ", "-")}/overview`
  //   //   );
  // }
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/${urlSystem}/overview`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${urlAdmin}/overview`)
    : navigate(`${devNavUrl}/${data.role_name.toLowerCase()}/time`);
};
