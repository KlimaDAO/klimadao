import { createClient, SanityClient } from "@sanity/client";

// Define the getSanityClient function which returns a SanityClient instance
function getSanityClient(): SanityClient {
  return createClient({
    projectId: "l6of5nwi",
    dataset: "production",
    apiVersion: "2023-02-04",
    useCdn: false,
  });
}

export { getSanityClient };
