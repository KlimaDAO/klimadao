import { providers } from "ethers";
import { urls } from "../../constants";
import { getInfuraUrl } from "../getInfuraUrl";

const { JsonRpcProvider } = providers;

const defaultUrls = {
  eth: urls.defaultEthRpc,
  polygon: urls.polygonMainnetRpc,
  mumbai: urls.polygonTestnetRpc,
};

/**
 * Returns a provider for making RPC calls to the given chain.
 * 'static' because the RPC is chosen by us, can't be changed by the user, and can't be used for signing txns.
 * Leverage FallbackProvider, fallback to Infura when polygon-rpc is slow to respond.
 */
export const getStaticProvider = (params?: {
  /** Default "polygon" */
  chain?: "polygon" | "eth" | "mumbai";
  infuraId?: string;
}): providers.FallbackProvider => {
  const { chain = "polygon" } = params || {};

  const providerConfigs: providers.FallbackProviderConfig[] = [
    {
      provider: new JsonRpcProvider(defaultUrls[chain]),
      priority: 1,
      weight: 1,
      stallTimeout: 750,
    },
  ];

  if (params?.infuraId) {
    const url = getInfuraUrl({
      chain,
      infuraId: params.infuraId,
    });
    providerConfigs.push({
      provider: new JsonRpcProvider(url),
      priority: 2,
      weight: 1,
      stallTimeout: 750,
    });
  }

  return new providers.FallbackProvider(providerConfigs);
};
