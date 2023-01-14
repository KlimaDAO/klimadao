import { formatUnits, getContract } from "..";
import { getStaticProvider } from "../getStaticProvider";

export const getKlimaSupply = async (infuraId?: string): Promise<string> => {
  const provider = getStaticProvider({ infuraId });
  const klimaContract = getContract({ contractName: "klima", provider });
  const totalSupply = await klimaContract.totalSupply();

  return formatUnits(totalSupply, 9); // KLIMA has 9 decimals
};
