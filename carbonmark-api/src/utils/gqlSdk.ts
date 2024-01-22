import { GraphQLClient } from "graphql-request";
import {
  getSdk as assetsSdk,
  Sdk as AssetsSdk,
} from "../.generated/types/assets.types";
import { getSdk as cmsSdk, Sdk as CMSSdk } from "../.generated/types/cms.types";
import {
  getSdk as digitalCarbonSdk,
  Sdk as DigitalCarbonSdk,
} from "../.generated/types/digitalCarbon.types";
import { getSdk as icrSdk, Sdk as IcrSdk } from "../.generated/types/icr.types";
import {
  getSdk as marketplaceSdk,
  Sdk as MarketplaceSdk,
} from "../.generated/types/marketplace.types";
import {
  getSdk as tokensSdk,
  Sdk as TokensSdk,
} from "../.generated/types/tokens.types";
import { GRAPH_URLS, SANITY_URLS } from "../app.constants";
import { NetworkParam } from "../models/NetworkParam.model";

export type GQL_SDK = {
  marketplace: MarketplaceSdk;
  assets: AssetsSdk;
  tokens: TokensSdk;
  cms: CMSSdk;
  digital_carbon: DigitalCarbonSdk;
  icr: IcrSdk;
};

const sdks = {
  marketplace: marketplaceSdk,
  assets: assetsSdk,
  tokens: tokensSdk,
  cms: cmsSdk,
  digital_carbon: digitalCarbonSdk,
  icr: icrSdk,
};

export const gql_sdk = (
  network: NetworkParam | undefined = "polygon"
): GQL_SDK => {
  const graph_urls = GRAPH_URLS[network];
  return {
    marketplace: sdks.marketplace(new GraphQLClient(graph_urls.marketplace)),
    assets: sdks.assets(new GraphQLClient(graph_urls.assets)),
    tokens: sdks.tokens(new GraphQLClient(graph_urls.tokens)),
    digital_carbon: sdks.digital_carbon(
      new GraphQLClient(graph_urls.digitalCarbon)
    ),
    cms: sdks.cms(new GraphQLClient(SANITY_URLS.cms)),
    icr: sdks.icr(new GraphQLClient(graph_urls.icr)),
  };
};
