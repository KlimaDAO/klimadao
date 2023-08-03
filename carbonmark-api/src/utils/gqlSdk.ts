import { GraphQLClient } from "graphql-request";
import { difference } from "lodash";
import { getSdk as assetsSdk } from "../.generated/types/assets.types";
import { getSdk as carbonProjectsSdk } from "../.generated/types/carbonProjects.types";
import { getSdk as marketplaceSdk } from "../.generated/types/marketplace.types";
import { getSdk as offsetsSdk } from "../.generated/types/offsets.types";
import { getSdk as tokensSdk } from "../.generated/types/tokens.types";
import { notEmpty } from "./functional.utils";

const ENV_VARS = [
  "GRAPH_API_URL",
  "ASSETS_GRAPH_API_URL",
  "CARBON_OFFSETS_GRAPH_API_URL",
  "POOL_PRICES_GRAPH_API_URL",
  "SANITY_GRAPH_API_URL",
];

//@todo remove the nullish coalescing empty strings
const marketplaceClient = new GraphQLClient(process.env.GRAPH_API_URL ?? "");
const assetsClient = new GraphQLClient(process.env.ASSETS_GRAPH_API_URL ?? "");
const offsetsClient = new GraphQLClient(
  process.env.CARBON_OFFSETS_GRAPH_API_URL ?? ""
);
const tokensClient = new GraphQLClient(
  process.env.POOL_PRICES_GRAPH_API_URL ?? ""
);
const carbonProjectsClient = new GraphQLClient(
  process.env.SANITY_GRAPH_API_URL ?? ""
);

const missingVars = difference(ENV_VARS, Object.keys(process.env));

// Confirm that all required env vars have been set
if (notEmpty(missingVars)) {
  throw new Error(`Missing GRAPH env vars: ${missingVars}`);
}

export const gqlSdk = {
  marketplace: marketplaceSdk(marketplaceClient),
  assets: assetsSdk(assetsClient),
  offsets: offsetsSdk(offsetsClient),
  tokens: tokensSdk(tokensClient),
  carbon_projects: carbonProjectsSdk(carbonProjectsClient),
};
