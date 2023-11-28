import { ClientT, client } from "lib/api/client";
import { urls } from "lib/constants";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

type GetProjectActivitiesFnT = ClientT["/projects/{id}/activity"]["get"];

export const useFetchProjectActivities = (
  args: Parameters<GetProjectActivitiesFnT>[0],
  options?: {
    initOpts: Parameters<GetProjectActivitiesFnT>[1];
    swrOpts: SWRConfiguration;
  }
) => {
  const fetchProjectActivities = async () =>
    (
      await client["/projects/{id}/activity"].get(args, options?.initOpts)
    ).json();

  const { data, ...rest } = useSWR(
    fetchProjectActivitiesURL(args),
    fetchProjectActivities,
    options?.swrOpts
  );
  return { activities: data || [], ...rest };
};

/**
 * Construct stable URL as key for SWR. When this key changes, data is re-fetched.
 * Always includes network default 'polygon'
 */
export const fetchProjectActivitiesURL = (
  args: Parameters<GetProjectActivitiesFnT>[0]
) => {
  const url = new URL(
    `${urls.api.projects}/${args.params.id.toLowerCase()}/activity`
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
