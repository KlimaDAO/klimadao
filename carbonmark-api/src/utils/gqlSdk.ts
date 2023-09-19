import { GraphQLClient } from "graphql-request";
import {
  getSdk as mumbaiAssetsSdk,
  Sdk as MumbaiAssetsSdk,
} from "../.generated/mumbai/types/assets.types";
import {
  getSdk as mumbaiCarbonProjectsSdk,
  Sdk as MumbaiCarbonProjectsSdk,
} from "../.generated/mumbai/types/carbonProjects.types";
import {
  getSdk as mumbaiDigitalCarbonSdk,
  Sdk as MumbaiDigitalCarbonSdk,
} from "../.generated/mumbai/types/digitalCarbon.types";
import {
  getSdk as mumbaiMarketplaceSdk,
  Sdk as MumbaiMarketplaceSdk,
} from "../.generated/mumbai/types/marketplace.types";
import {
  getSdk as mumbaiOffsetsSdk,
  Sdk as MumbaiOffsetsSdk,
} from "../.generated/mumbai/types/offsets.types";
import {
  getSdk as mumbaiTokensSdk,
  Sdk as MumbaiTokensSdk,
} from "../.generated/mumbai/types/tokens.types";
import {
  getSdk as polygonAssetsSdk,
  Sdk as PolygonAssetsSdk,
} from "../.generated/polygon/types/assets.types";
import {
  getSdk as polygonCarbonProjectsSdk,
  Sdk as PolygonCarbonProjectsSdk,
} from "../.generated/polygon/types/carbonProjects.types";
import {
  getSdk as polygonDigitalCarbonSdk,
  Sdk as PolygonDigitalCarbonSdk,
} from "../.generated/polygon/types/digitalCarbon.types";
import {
  getSdk as polygonMarketplaceSdk,
  Sdk as PolygonMarketplaceSdk,
} from "../.generated/polygon/types/marketplace.types";
import {
  getSdk as polygonOffsetsSdk,
  Sdk as PolygonOffsetsSdk,
} from "../.generated/polygon/types/offsets.types";
import {
  getSdk as polygonTokensSdk,
  Sdk as PolygonTokensSdk,
} from "../.generated/polygon/types/tokens.types";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";
import { NetworkParam } from "../models/NetworkParam.model";

export type GQL_SDK = {
  marketplace: PolygonMarketplaceSdk | MumbaiMarketplaceSdk;
  assets: PolygonAssetsSdk | MumbaiAssetsSdk;
  offsets: PolygonOffsetsSdk | MumbaiOffsetsSdk;
  tokens: PolygonTokensSdk | MumbaiTokensSdk;
  carbon_projects: PolygonCarbonProjectsSdk | MumbaiCarbonProjectsSdk;
  digital_carbon: PolygonDigitalCarbonSdk | MumbaiDigitalCarbonSdk;
};

const SDKS = {
  polygon: {
    marketplace: polygonMarketplaceSdk,
    assets: polygonAssetsSdk,
    offsets: polygonOffsetsSdk,
    tokens: polygonTokensSdk,
    carbon_projects: polygonCarbonProjectsSdk,
    digital_carbon: polygonDigitalCarbonSdk,
  },
  mumbai: {
    marketplace: mumbaiMarketplaceSdk,
    assets: mumbaiAssetsSdk,
    offsets: mumbaiOffsetsSdk,
    tokens: mumbaiTokensSdk,
    carbon_projects: mumbaiCarbonProjectsSdk,
    digital_carbon: mumbaiDigitalCarbonSdk,
  },
};

export const gql_sdk = (
  network: NetworkParam | undefined = "polygon"
): GQL_SDK => {
  const graph_urls = GRAPH_URLS[network];
  const sdks = SDKS[network];
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
