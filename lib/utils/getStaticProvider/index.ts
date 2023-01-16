import { providers } from "ethers";
import { urls } from "../../constants";
import { getInfuraUrl } from "../getInfuraUrl";

const { JsonRpcProvider, JsonRpcBatchProvider } = providers;

const defaultUrls = {
  eth: urls.defaultEthRpc,
  polygon: urls.infuraPolygonRpcClient,
  mumbai: urls.polygonTestnetRpc,
};

interface RuntimeProviders {
  eth: {
    default: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
  polygon: {
    default: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
  mumbai: {
    default: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
}

const staticProviders: RuntimeProviders = {
  eth: {
    infura: undefined,
    default: new JsonRpcProvider(urls.defaultEthRpc),
  },
  polygon: {
    infura: undefined,
    // TEMP use infura id until polygon-rpc stops being flaky
    default: new JsonRpcProvider(urls.infuraPolygonRpcClient),
  },
  mumbai: {
    infura: undefined,
    default: new JsonRpcProvider(urls.polygonTestnetRpc),
  },
};

const batchProviders: RuntimeProviders = {
  eth: {
    infura: undefined,
    default: new JsonRpcBatchProvider(urls.defaultEthRpc),
  },
  polygon: {
    infura: undefined,
    // TEMP use infura id until polygon-rpc stops being flaky
    default: new JsonRpcBatchProvider(urls.infuraPolygonRpcClient),
  },
  mumbai: {
    infura: undefined,
    default: new JsonRpcBatchProvider(urls.polygonTestnetRpc),
  },
};

/**
 * Returns a provider for making RPC calls to the given chain.
 * 'static' because the RPC is chosen by us, can't be changed by the user, and can't be used for signing txns.
 * For server environments, we recommend using infura for (historically) improved stability & performance.
 * If no infura id is provided, a default public rpc is used.
 */
export const getStaticProvider = (params?: {
  chain?: "polygon" | "eth" | "mumbai";
  batchRequests?: boolean;
  infuraId?: string;
}): providers.JsonRpcProvider => {
  const { chain = "polygon", batchRequests = false } = params || {};
  const providerMap = batchRequests ? batchProviders : staticProviders;
  const ProviderClass = batchRequests ? JsonRpcBatchProvider : JsonRpcProvider;

  // no infuraId provided, use defaults
  if (!params?.infuraId) {
    // instantiate if needed
    if (!providerMap[chain].default) {
      providerMap[chain].default = new ProviderClass(defaultUrls[chain]);
    }
    return providerMap[chain].default;
  }

  const existingInfura = providerMap[chain].infura; // satisfy ts null check
  if (existingInfura) return existingInfura;

  const infuraUrl = getInfuraUrl({
    chain,
    infuraId: params.infuraId,
  });
  providerMap[chain].infura = new ProviderClass(infuraUrl);
  return providerMap[chain].infura;
};
