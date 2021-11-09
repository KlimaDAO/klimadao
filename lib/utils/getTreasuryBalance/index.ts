import { ethers } from "ethers";
import { getInteger } from "../getInteger";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import IERC20 from "../../abi/IERC20.json";
import PairContract from "../../abi/PairContract.json";
import { addresses } from "../../constants";

const getOwnedBCTFromSLP = async (adr: "bctUsdcLp" | "klimaBctLp") => {
  const provider = getJsonRpcProvider();
  const slpAddress = addresses.mainnet[adr];
  const contract = new ethers.Contract(slpAddress, PairContract.abi, provider);
  const [token0, token1, [reserve0, reserve1], treasurySLP, totalSLP] =
    await Promise.all([
      contract.token0() as string,
      contract.token1() as string,
      contract.getReserves(),
      contract.balanceOf(addresses.mainnet.treasury),
      contract.totalSupply(),
    ]);
  let reserve;
  if (token0.toLowerCase() === addresses.mainnet.bct.toLowerCase()) {
    reserve = reserve0;
  } else if (token1.toLowerCase() === addresses.mainnet.bct.toLowerCase()) {
    reserve = reserve1;
  } else {
    throw new Error("No BCT reserve found");
  }
  const bctSupply = getInteger(reserve);
  const ownership = treasurySLP / totalSLP; // decimal (percent) e.g. 0.95999
  const bctOwned = Math.floor(bctSupply * ownership);
  return bctOwned;
};

/**
 * Return the balance in BCT of the klima treasury.
 * NakedBCT + (klimaBctReserve * klimaBctTreasuryPercent) + (bctUsdcReserve * bctUsdcTreasuryPercent)
 */
export const getTreasuryBalance = async (): Promise<number> => {
  try {
    const provider = getJsonRpcProvider();
    const bctContract = new ethers.Contract(
      addresses.mainnet.bct,
      IERC20.abi,
      provider
    );

    const nakedBCT = getInteger(
      await bctContract.balanceOf(addresses.mainnet.treasury)
    );
    const bctUSDC = await getOwnedBCTFromSLP("bctUsdcLp");
    const bctKLIMA = await getOwnedBCTFromSLP("klimaBctLp");
    const sum = nakedBCT + bctUSDC + bctKLIMA;
    return sum;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
