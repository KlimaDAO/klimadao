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

const sdks = {
  marketplace: marketplaceSdk,
  assets: assetsSdk,
  offsets: offsetsSdk,
  tokens: tokensSdk,
  carbon_projects: carbonProjectsSdk,
  digital_carbon: digitalCarbonSdk,
};

export const gql_sdk = (
  network: NetworkParam | undefined = "polygon"
): GQL_SDK => {
  const graph_urls = GRAPH_URLS[network];
  return {
    marketplace: sdks.marketplace(new GraphQLClient(graph_urls.marketplace)),
    assets: sdks.assets(new GraphQLClient(graph_urls.assets)),
    offsets: sdks.offsets(new GraphQLClient(graph_urls.offsets)),
    tokens: sdks.tokens(new GraphQLClient(graph_urls.tokens)),
    digital_carbon: sdks.digital_carbon(
      new GraphQLClient(graph_urls.digitalCarbon)
    ),
    carbon_projects: sdks.carbon_projects(
      new GraphQLClient(SANITY_URLS.carbonProjects)
    ),
  };
};
