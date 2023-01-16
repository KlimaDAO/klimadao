import { providers } from "ethers";
import { urls } from "../../constants";
import { getInfuraUrl } from "../getInfuraUrl";

const { JsonRpcProvider, JsonRpcBatchProvider } = providers;

const defaultUrls = {
  eth: urls.defaultEthRpc,
  // TEMP use infura id until polygon-rpc stops being flaky
  polygon: urls.infuraPolygonRpcClient,
  mumbai: urls.polygonTestnetRpc,
};

interface RuntimeProviders {
  eth: {
    default?: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
  polygon: {
    default?: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
  mumbai: {
    default?: providers.JsonRpcProvider;
    infura?: providers.JsonRpcProvider;
  };
}

const staticProviders: RuntimeProviders = {
  eth: {
    infura: undefined,
    default: undefined,
  },
  polygon: {
    infura: undefined,
    default: undefined,
  },
  mumbai: {
    infura: undefined,
    default: undefined,
  },
};

const batchProviders: RuntimeProviders = {
  eth: {
    infura: undefined,
    default: undefined,
  },
  polygon: {
    infura: undefined,
    default: undefined,
  },
  mumbai: {
    infura: undefined,
    default: undefined,
  },
};

/**
 * Returns a provider for making RPC calls to the given chain.
 * 'static' because the RPC is chosen by us, can't be changed by the user, and can't be used for signing txns.
 * For server environments, we recommend using infura for (historically) improved stability & performance.
 * If no infura id is provided, a default public rpc is used.
 */
export const getStaticProvider = (params?: {
  /** Default "polygon" */
  chain?: "polygon" | "eth" | "mumbai";
  /** Use JsonRpcBatchProvider instead. Default "true". Set to false if batching causes problems. */
  batchRequests?: boolean;
  infuraId?: string;
}): providers.JsonRpcProvider => {
  const { chain = "polygon", batchRequests = false } = params || {};
  const providerMap = batchRequests ? batchProviders : staticProviders;
  const ProviderClass = batchRequests ? JsonRpcBatchProvider : JsonRpcProvider;

  // infuraId provided
  if (params?.infuraId) {
    // instantiate if needed
    if (!providerMap[chain].infura) {
      const infuraUrl = getInfuraUrl({
        chain,
        infuraId: params.infuraId,
      });
      providerMap[chain].infura = new ProviderClass(infuraUrl);
    }
    return providerMap[chain].infura;
  }
  // otherwise use defaults
  // instantiate if needed
  if (!providerMap[chain].default) {
    providerMap[chain].default = new ProviderClass(defaultUrls[chain]);
  }
  return providerMap[chain].default;
};
