import { formatUnits, getContract } from "..";
import { getJsonRpcProvider } from "../getJsonRpcProvider";

export const getKlimaSupply = async (providerUrl?: string): Promise<string> => {
  const provider = getJsonRpcProvider(providerUrl);
  const klimaContract = getContract({ contractName: "klima", provider });
  const totalSupply = await klimaContract.totalSupply();

  return formatUnits(totalSupply, 9); // KLIMA has 9 decimals
};
