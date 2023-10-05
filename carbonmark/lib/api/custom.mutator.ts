// custom-instance.ts

import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { urls } from "lib/constants";

export const AXIOS_INSTANCE = Axios.create({ baseURL: urls.api.base });

export const customMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
  const promise = AXIOS_INSTANCE(config).then(({ data }) => data);

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
