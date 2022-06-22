import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { formatUnits, getContractByToken } from "..";

export const getKlimaSupply = async (providerUrl?: string): Promise<string> => {
  const provider = getJsonRpcProvider(providerUrl);
  const klimaContract = getContractByToken({ token: "klima", provider });
  const totalSupply = await klimaContract.totalSupply();

  return formatUnits(totalSupply, 9); // KLIMA has 9 decimals
};
