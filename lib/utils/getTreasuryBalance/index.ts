import { addresses } from "../../constants";
import { getContract } from "../getContract";
import { getInteger } from "../getInteger";
import { getStaticProvider } from "../getStaticProvider";

const getOwnedBCTFromSLP = async (params: { adr: "klimaBctLp" }) => {
  const contract = getContract({
    contractName: params.adr,
    provider: getStaticProvider(),
  });
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
 * NakedBCT + (klimaBctReserve * klimaBctTreasuryPercent)
 */
export const getTreasuryBalance = async (params?: {
  /** When invoked on the server, provide an id for a more stable rpc */
  infuraId?: string;
}): Promise<number> => {
  try {
    const bctContract = getContract({
      contractName: "bct",
      provider: getStaticProvider({
        infuraId: params?.infuraId,
      }),
    });

    const nakedBCT = getInteger(
      await bctContract.balanceOf(addresses.mainnet.treasury)
    );
    const bctKLIMA = await getOwnedBCTFromSLP({ adr: "klimaBctLp" });
    const sum = nakedBCT + bctKLIMA;
    return sum;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
