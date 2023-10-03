import { ClientT, client } from "lib/api/client";
import { urls } from "lib/constants";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

type GetUserFnT = ClientT["/users/{walletOrHandle}"]["get"];

export const useFetchUser = (
  args: Parameters<GetUserFnT>[0],
  options?: SWRConfiguration
) => {
  const fetchUser = async () =>
    (await client["/users/{walletOrHandle}"].get(args)).json();

  const { data, ...rest } = useSWR(
    `${urls.api.users}/${args.params.walletOrHandle}&network=${args.query?.network}`,
    fetchUser,
    options
  );

  const carbonmarkUser = !!data?.wallet ? data : null;

  return { carbonmarkUser, ...rest };
};
