import { providers } from "ethers";
import { urls } from "../../constants";
import { getInfuraUrl } from "../getInfuraUrl";

const { JsonRpcProvider } = providers;

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

const runtimeProviders: RuntimeProviders = {
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
/**
 * Returns a provider for making RPC calls to the given chain.
 * 'static' because the RPC is chosen by us, can't be changed by the user, and can't be used for signing txns.
 * For server environments, we recommend using infura for (historically) improved stability & performance.
 * If no infura id is provided, a default public rpc is used.
 */
export const getStaticProvider = (params?: {
  chain?: "polygon" | "eth" | "mumbai";
  infuraId?: string;
}): providers.JsonRpcProvider => {
  const chain = params?.chain || "polygon";

  if (!params?.infuraId) {
    return runtimeProviders[chain].default;
  }

  const existingInfura = runtimeProviders[chain].infura; // satisfy ts null check
  if (existingInfura) return existingInfura;

  const infuraUrl = getInfuraUrl({
    chain,
    infuraId: params.infuraId,
  });
  const newInfura = new JsonRpcProvider(infuraUrl);
  runtimeProviders[chain].infura = newInfura;
  return newInfura;
};
