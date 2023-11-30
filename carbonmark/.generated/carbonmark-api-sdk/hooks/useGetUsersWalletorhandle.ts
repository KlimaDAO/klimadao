import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
  GetUsersWalletorhandleQueryResponse,
} from "../types/GetUsersWalletorhandle";

export function getUsersWalletorhandleQueryOptions<
  TData = GetUsersWalletorhandleQueryResponse,
  TError = unknown,
>(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandleQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/users/${walletOrHandle}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Get a user's profile and activity
 * @summary User details
 * @link /users/:walletOrHandle
 */

export function useGetUsersWalletorhandle<
  TData = GetUsersWalletorhandleQueryResponse,
  TError = unknown,
>(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandleQueryParams,
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  
  let url = shouldFetch ? `/users/${walletOrHandle}` : null;
  if (params?.network === "mumbai") {
    url += `?network=${params.network}`;
  }

  const query = useSWR<TData, TError, string | null>(url, {
    ...getUsersWalletorhandleQueryOptions<TData, TError>(
      walletOrHandle,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
