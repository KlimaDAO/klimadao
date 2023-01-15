import { providers } from "ethers";
import { urls } from "../../constants";
import { getInfuraUrl } from "../getInfuraUrl";

const { JsonRpcProvider, JsonRpcBatchProvider } = providers;

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
  const providers = batchRequests ? batchProviders : staticProviders;

  if (!params?.infuraId) {
    return providers[chain].default;
  }

  const existingInfura = providers[chain].infura; // satisfy ts null check
  if (existingInfura) return existingInfura;

  const infuraUrl = getInfuraUrl({
    chain,
    infuraId: params.infuraId,
  });
  const newInfura = batchProviders
    ? new JsonRpcBatchProvider(infuraUrl)
    : new JsonRpcProvider(infuraUrl);
  providers[chain].infura = newInfura;
  return newInfura;
};
