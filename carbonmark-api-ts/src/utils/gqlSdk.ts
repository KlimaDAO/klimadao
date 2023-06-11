import { GraphQLClient } from "graphql-request";
import { getSdk as assetsSdk } from "../../.generated/types/assets.types";
import { getSdk as marketplaceSdk } from "../../.generated/types/marketplace.types";
import { getSdk as offsetsSdk } from "../../.generated/types/offsets.types";
import { getSdk as tokensSdk } from "../../.generated/types/tokens.types";

//@todo remove the nullish coalescing empty strings
const marketplaceClient = new GraphQLClient(process.env.GRAPH_API_URL ?? "");
const assetsClient = new GraphQLClient(process.env.ASSETS_GRAPH_API_URL ?? "");
const offsetsClient = new GraphQLClient(
  process.env.CARBON_OFFSETS_GRAPH_API_URL ?? ""
);
const tokensClient = new GraphQLClient(
  process.env.POOL_PRICES_GRAPH_API_URL ?? ""
);

export const gqlSdk = {
  marketplace: marketplaceSdk(marketplaceClient),
  assets: assetsSdk(assetsClient),
  offsets: offsetsSdk(offsetsClient),
  tokens: tokensSdk(tokensClient),
};
