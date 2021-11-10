import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { getInteger } from "../getInteger";
import PairContractABI from "../../abi/PairContract.json";
import { addresses } from "../../constants";

export const getKlimaUsdcPrice = async (): Promise<number> => {
  const provider = getJsonRpcProvider();
  const klimaBctContract = new ethers.Contract(
    addresses.mainnet.klimaBctLp,
    PairContractABI.abi,
    provider
  );
  const bctUsdcContract = new ethers.Contract(
    addresses.mainnet.bctUsdcLp,
    PairContractABI.abi,
    provider
  );
  const [bctReserve, klimaReserve] = await klimaBctContract.getReserves();
  const klimaBctPrice =
    getInteger(bctReserve) / getInteger(klimaReserve, "gwei");
  const [usdcReserve, bctReserve2] = await bctUsdcContract.getReserves();
  const bctUsdcPrice = getInteger(usdcReserve, 6) / getInteger(bctReserve2);
  const price = Math.floor(klimaBctPrice * bctUsdcPrice);
  return price;
};
