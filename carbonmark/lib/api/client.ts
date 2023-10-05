import type schema from ".generated/carbonmark-api.schema";
import { createClient, type NormalizeOAS } from "fets";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";

export const client = createClient<NormalizeOAS<typeof schema>>({
  endpoint: urls.api.base,
  fetchFn: fetcher,
});

export type ClientT = typeof client;
