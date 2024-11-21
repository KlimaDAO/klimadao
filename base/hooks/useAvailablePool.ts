import { getLiquidityPools } from "lib/constants";
import { usePublicClient } from "wagmi";

export const useAvailableLP = () => {
  const client = usePublicClient();

  if (!client) {
    return {
      lps: {},
    };
  }

  return {
    lps: getLiquidityPools(client.chain),
  };
};
