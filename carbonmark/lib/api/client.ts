import type schema from ".generated/carbonmark-api.schema";
import { createClient, type NormalizeOAS } from "fets";
import { urls } from "lib/constants";

export const client = createClient<NormalizeOAS<typeof schema>>({
  endpoint: urls.api.base,
});

export type ClientT = typeof client;
