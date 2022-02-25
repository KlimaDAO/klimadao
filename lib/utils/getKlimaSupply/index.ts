import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import IERC20 from "../../abi/IERC20.json";
import { formatUnits } from "..";

export const getKlimaSupply = async (): Promise<string> => {
  const provider = getJsonRpcProvider();
  const klimaContract = new ethers.Contract(
    addresses.mainnet.klima,
    IERC20.abi,
    provider
  );
  const totalSupply = await klimaContract.totalSupply();

  return formatUnits(totalSupply, 9); // KLIMA has 9 decimals
};
