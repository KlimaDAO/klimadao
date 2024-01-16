import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
  GetUsersWalletorhandleQueryResponse,
} from "../types/GetUsersWalletorhandle";

type GetUsersWalletorhandleClient = typeof client<
  GetUsersWalletorhandleQueryResponse,
  never,
  never
>;
type GetUsersWalletorhandle = {
  data: GetUsersWalletorhandleQueryResponse;
  error: never;
  request: never;
  pathParams: GetUsersWalletorhandlePathParams;
  queryParams: GetUsersWalletorhandleQueryParams;
  headerParams: never;
  response: GetUsersWalletorhandleQueryResponse;
  client: {
    parameters: Partial<Parameters<GetUsersWalletorhandleClient>[0]>;
    return: Awaited<ReturnType<GetUsersWalletorhandleClient>>;
  };
};
export function getUsersWalletorhandleQueryOptions<
  TData extends
    GetUsersWalletorhandle["response"] = GetUsersWalletorhandle["response"],
  TError = GetUsersWalletorhandle["error"],
>(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandle["queryParams"],
  options: GetUsersWalletorhandle["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/users/${walletOrHandle}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Get a user's profile and activity
 * @summary User details
 * @link /users/:walletOrHandle */
export function useGetUsersWalletorhandle<
  TData extends
    GetUsersWalletorhandle["response"] = GetUsersWalletorhandle["response"],
  TError = GetUsersWalletorhandle["error"],
>(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandle["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetUsersWalletorhandle["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/users/${walletOrHandle}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getUsersWalletorhandleQueryOptions<TData, TError>(
        walletOrHandle,
        params,
        clientOptions
      ),
      ...queryOptions,
    }
  );
  return query;
}
