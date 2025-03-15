import axios from "axios";
import { clearLocalStorageKey } from "../utils/helpers";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5400/api/v1/"
    : "https://api.amzifybrands.com/api/v1/";

// axios.interceptors.response.use(
//   async function (response) {
//     return response;
//   },
//   async function (error) {
//     if (error.response && error.response.status === 401) {
//       const auth = JSON.parse(
//         JSON.parse(localStorage?.getItem("persist:root"))?.auth
//       );
//       const token = auth?.token;
//       console.log("🚀 ~ token:", token);
//       if (token) {
//         await clearLocalStorageKey("persist:root");
//         window.location.reload();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
