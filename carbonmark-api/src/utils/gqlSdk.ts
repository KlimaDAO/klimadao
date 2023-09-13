import { GraphQLClient } from "graphql-request";
import { getSdk as assetsSdk } from "../.generated/types/assets.types";
import { getSdk as carbonProjectsSdk } from "../.generated/types/carbonProjects.types";
import { getSdk as digitalCarbonSdk } from "../.generated/types/digitalCarbon.types";
import { getSdk as marketplaceSdk } from "../.generated/types/marketplace.types";
import { getSdk as marketplaceMumbaiSdk } from "../.generated/types/marketplaceMumbai.types";
import { getSdk as offsetsSdk } from "../.generated/types/offsets.types";
import { getSdk as tokensSdk } from "../.generated/types/tokens.types";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";

const marketplaceClient = new GraphQLClient(GRAPH_URLS.marketplace);
const assetsClient = new GraphQLClient(GRAPH_URLS.assets);
const offsetsClient = new GraphQLClient(GRAPH_URLS.offsets);
const tokensClient = new GraphQLClient(GRAPH_URLS.tokens);
const digitalCarbonClient = new GraphQLClient(GRAPH_URLS.digitalCarbon);
const marketplaceMumbaiClient = new GraphQLClient(GRAPH_URLS.marketplaceMumbai);
const carbonProjectsClient = new GraphQLClient(SANITY_URLS.carbonProjects);

export const gqlSdk = {
  marketplace: marketplaceSdk(marketplaceClient),
  marketplaceMumbai: marketplaceMumbaiSdk(marketplaceMumbaiClient),
  assets: assetsSdk(assetsClient),
  offsets: offsetsSdk(offsetsClient),
  tokens: tokensSdk(tokensClient),
  carbon_projects: carbonProjectsSdk(carbonProjectsClient),
  digital_carbon: digitalCarbonSdk(digitalCarbonClient),
};
