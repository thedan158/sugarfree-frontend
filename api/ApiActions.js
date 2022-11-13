import { getAPIs } from "./Apis";
import customAxios from "./AxiosInterceptors";

const host = "http://localhost:3000";
export function getAPIActionJSON(type, data, params = "", addparams = "") {
  const api = getAPIs[type];
  return (dispatch, getState) => {
    dispatch({
      type: "api.loading",
    });
    customAxios({
      method: api.method,
      url: host + api.path + addparams,
      params: params,
      data: data,
    })
      .then(function (response) {
        dispatch({ type: "api.success" });
        // if (response.headers["aenx-token"]) {
        //   localStorage.setItem("aenx-token", response.headers["aenx-token"]);
        // }
        // if (response.headers["aenx-renew-token"]) {
        //   localStorage.setItem(
        //     "aenx-renew-token",
        //     response.headers["aenx-renew-token"]
        //   );
        // }
        console.log(type, response.data);
        if (response.status === 200 || 202) {
          dispatch({
            type: `${type}.reply`,
            data: response.data,
            headers: response.headers,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
export async function getStatelessAPI(
  type,
  data,
  headers,
  params = {},
  addparams = ""
) {
  const api = getAPIs[type];
  try {
    const res = await customAxios({
      method: api.method,
      url: host + api.path + addparams,
      params: params,
      data: data,
      headers: headers,
    });
    const responseData = res.data;
    console.log(type, responseData);
    return responseData;
  } catch (error) {
    if (error) {
      // Error Handler
      console.log(error);
    }
  }
}
