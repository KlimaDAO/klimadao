import type schema from ".generated/carbonmark-api.schema";
import { createClient, type NormalizeOAS } from "fets";
import { urls } from "lib/constants";

export const client = createClient<NormalizeOAS<typeof schema>>({
  endpoint: urls.api.base,
  // Temporary solution until swr integration #1639 is finished
  fetchFn: async (...args) => {
    const res = await fetch(...args);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      throw new Error((await res.json()).message);
    }

    return res;
  },
});

export type ClientT = typeof client;
