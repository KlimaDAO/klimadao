import { ClientT, client } from "lib/api/client";
import { urls } from "lib/constants";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

type GetUserFnT = ClientT["/users/{walletOrHandle}"]["get"];

export const useFetchUser = (
  args: Parameters<GetUserFnT>[0],
  options?: {
    initOpts: Parameters<GetUserFnT>[1];
    swrOpts: SWRConfiguration;
  }
) => {
  const fetchUser = async () =>
    (
      await client["/users/{walletOrHandle}"].get(args, options?.initOpts)
    ).json();

  const { data, ...rest } = useSWR(
    fetchUserURL(args),
    fetchUser,
    options?.swrOpts
  );

  const carbonmarkUser = !!data?.wallet ? data : null;

  return { carbonmarkUser, ...rest };
};

/**
 * Construct stable URL as key for SWR. When this key changes, data is re-fetched.
 * Always includes network default 'polygon'
 */
export const fetchUserURL = (args: Parameters<GetUserFnT>[0]) => {
  const url = new URL(
    `${urls.api.users}/${args.params.walletOrHandle.toLowerCase()}`
  );

  const { network = "polygon", ...query } = args.query || {};
  url.searchParams.set("network", network?.toLowerCase());

  for (const queryParam in query) {
    const value = query[queryParam as keyof typeof query];
    if (value) {
      url.searchParams.set(queryParam, value);
    }
  }

  return url.toString();
};
