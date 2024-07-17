import axios from "axios";
// import { useAuthStore } from "src/stores/auth";
// import { commonStore } from "src/stores/common";
// import { router } from "src/router";
// import { Loading } from "quasar";

const Timeout = 30000;

export async function api({ ...params }) {
//   const authStore = useAuthStore();
//   const common = commonStore();
//   const hasToken = authStore.getAccessToken;

//   const Authorization = { Authorization: `Bearer ${authStore.getAccessToken}` };
  try {
    // if (params.loading) showLoading();
    const response = await axios({
      method: params.method || "POST",
      data: params.data,
      params: params.param,
      baseURL: params.url,
      // timeout: Timeout,
      headers: {
        'Ocp-Apim-Subscription-Key': __AZURE__,
        'Content-Type': 'application/json'},
    });
    return { ok: true, data: response };
  } catch (error) {
    console.log(error)
    const statusCode = error?.response?.status;
    // if (statusCode === 401) destroyLocalStorage(router, params.url);
    // if (statusCode === 403) {
    //   destroyLocalStorage(router);
    //   common.setDialog(true); // Will open dialog and will show message if user is not permitted or administrator changed the permissions
    // }

    return { ok: false, status: statusCode, error: error.response };
  } finally {
    // Loading.hide();
  }
}
/**
  @status 401
  If the token is expired with status code 401 will destroy all storage data and redirect to login page
  @status 403
  If status code is 403, it means that the user has no permission to CRUD
  The user will redirect in the login page and will promp warning message
*/
// const destroyLocalStorage = (router, url = "") => {
//   const authStore = useAuthStore();
//   if (url !== "/login") {
//     router.push({ name: "login" });
//     authStore.destroyAuth();
//   }
// };
/**
 * Microservices
 * Will identify the api to use
 * @param { String } module
 * @returns { Url }
 */
const baseUrl = (module = "") => {
  const env = process.env.VUE_APP_ENV;
  switch (module) {
    case "azure":
        return 'https://go-document-ai.cognitiveservices.azure.com/';
    case "ais":
      return env === "development_aws" ? process.env.VUE_APP_DEV_AWS : env === "development_vdi" ? process.env.VUE_APP_DEV_VDI : env === "staging" ? process.env.VUE_APP_STAGING_VDI : process.env.VUE_APP_PROD_VDI;
    default:
      return env === "development_aws" ? process.env.VUE_APP_DEV_AWS : env === "development_vdi" ? process.env.VUE_APP_DEV_VDI : env === "staging" ? process.env.VUE_APP_STAGING_VDI : process.env.VUE_APP_PROD_VDI;
  }
};
/**
  Modal Loading will execute every api call
  Will only call if @param { params.loading } = true
 */
// const showLoading = () => {
//   Loading.show({
//     html: true,
//     message: `<p class="text-bold">Loading...</p> Please wait`,
//     boxClass: "bg-white text-grey-9",
//     spinnerColor: "primary",
//   });
// };
