import { GraphQLClient } from "graphql-request";
import {
  getSdk as assetsSdk,
  Sdk as AssetsSdk,
} from "../.generated/types/assets.types";
import {
  getSdk as carbonProjectsSdk,
  Sdk as CarbonProjectsSdk,
} from "../.generated/types/carbonProjects.types";
import {
  getSdk as digitalCarbonSdk,
  Sdk as DigitalCarbonSdk,
} from "../.generated/types/digitalCarbon.types";
import {
  getSdk as marketplaceSdk,
  Sdk as MarketplaceSdk,
} from "../.generated/types/marketplace.types";
import {
  getSdk as offsetsSdk,
  Sdk as OffsetsSdk,
} from "../.generated/types/offsets.types";
import {
  getSdk as tokensSdk,
  Sdk as TokensSdk,
} from "../.generated/types/tokens.types";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";
import { NetworkParam } from "../models/NetworkParam.model";

export type GQL_SDK = {
  marketplace: MarketplaceSdk;
  assets: AssetsSdk;
  offsets: OffsetsSdk;
  tokens: TokensSdk;
  carbon_projects: CarbonProjectsSdk;
  digital_carbon: DigitalCarbonSdk;
};

export const gql_sdk = (
  network: NetworkParam | undefined = "mumbai"
): GQL_SDK => {
  const graph_urls = GRAPH_URLS[network];
  return {
    marketplace: marketplaceSdk(new GraphQLClient(graph_urls.marketplace)),
    assets: assetsSdk(new GraphQLClient(graph_urls.assets)),
    offsets: offsetsSdk(new GraphQLClient(graph_urls.offsets)),
    tokens: tokensSdk(new GraphQLClient(graph_urls.tokens)),
    digital_carbon: digitalCarbonSdk(
      new GraphQLClient(graph_urls.digitalCarbon)
    ),
    carbon_projects: carbonProjectsSdk(
      new GraphQLClient(SANITY_URLS.carbonProjects)
    ),
  };
};
