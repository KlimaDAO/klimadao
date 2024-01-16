import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
  GetUsersWalletorhandleQueryResponse,
} from "../types/GetUsersWalletorhandle";

/**
 * @description Get a user's profile and activity
 * @summary User details
 * @link /users/:walletOrHandle */
export async function getUsersWalletorhandle(
  walletOrHandle: GetUsersWalletorhandlePathParams["walletOrHandle"],
  params?: GetUsersWalletorhandleQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetUsersWalletorhandleQueryResponse>["data"]> {
  const res = await client<GetUsersWalletorhandleQueryResponse>({
    method: "get",
    url: `/users/${walletOrHandle}`,
    params,
    ...options,
  });
  return res.data;
}
