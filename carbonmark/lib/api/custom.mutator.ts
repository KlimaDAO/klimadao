// custom-instance.ts

import Axios, { AxiosRequestConfig } from "axios";
import { urls } from "lib/constants";

export const AXIOS_INSTANCE = Axios.create({ baseURL: urls.api.base });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default customInstance;
