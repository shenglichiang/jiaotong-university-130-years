import axios, { AxiosResponse, AxiosError } from "axios";
const instance = axios.create();
instance.interceptors.request.use(
  function (config) {
    const tempParams = {
      ...config.params,
    };
    return {
      ...config,
      params: tempParams,
      // params: { ...config.params },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  // function (error: AxiosError) {
  //   return Promise.reject(error?.response?.data?.error || '请求失败');
  // }
  function (error: AxiosError) {
    const errorData = error?.response?.data;
    let errorMsg = "请求失败";
    // 类型守卫：判断 errorData 是对象且包含 error 属性
    if (
      typeof errorData === "object" &&
      errorData !== null &&
      "error" in errorData
    ) {
      errorMsg = errorData.error as string; // 断言为字符串（避免非字符串类型）
    }
    return Promise.reject(errorMsg);
  }
);

export default instance;
