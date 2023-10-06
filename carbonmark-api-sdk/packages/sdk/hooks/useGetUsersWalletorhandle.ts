import client from "@kubb/swagger-client/client";
import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import type {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
  GetUsersWalletorhandleQueryResponse,
} from "../models/GetUsersWalletorhandle";

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
      });
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
  }
): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/users/${walletOrHandle}`, {
    ...getUsersWalletorhandleQueryOptions<TData, TError>(
      walletOrHandle,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
