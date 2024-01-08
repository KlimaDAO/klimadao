import {
  GetUsersWalletorhandlePathParams,
  GetUsersWalletorhandleQueryParams,
} from ".generated/carbonmark-api-sdk/types";
import { urls } from "lib/constants";

/**
 * Construct stable URL as key for SWR. When this key changes, data is re-fetched.
 * Always includes network default 'polygon'
 */
export const getUsersWalletorHandleKey = (
  query: GetUsersWalletorhandleQueryParams,
  params: GetUsersWalletorhandlePathParams
) => {
  const url = new URL(
    `${urls.api.users}/${params.walletOrHandle.toLowerCase()}`
  );

  const { network = "polygon" } = query || {};
  url.searchParams.set("network", network?.toLowerCase());

  for (const queryParam in query) {
    const value = query[queryParam as keyof typeof query];
    if (value) {
      url.searchParams.set(queryParam, value);
    }
  }

  return url.toString();
};
