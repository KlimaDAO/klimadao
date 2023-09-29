import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { User } from "lib/types/carbonmark.types";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

type Opts = SWRConfiguration & {
  network?: "mumbai" | "polygon";
};

export const useFetchUser = (address?: string, options?: Opts) => {
  const { network = "polygon", ...swrConfig } = options || {};
  const { data, ...rest } = useSWR<User>(
    address
      ? `${urls.api.users}/${address}?type=wallet&network=${network}`
      : null,
    fetcher,
    swrConfig
  );

  const carbonmarkUser = !!data?.wallet ? data : null;

  return { carbonmarkUser, ...rest };
};
