import client from "../client";
import type {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
  GetUsersWalletorhandleQueryResponse,
} from "../models/GetUsersWalletorhandle";

/**
 * @description Get a user's profile and activity
 * @summary User details
 * @link /users/:walletOrHandle
 */

export function getUsersWalletorhandle<
  TData = GetUsersWalletorhandleQueryResponse,
>(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandleQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/users/${walletOrHandle}`,
    params,

    ...options,
  });
}
