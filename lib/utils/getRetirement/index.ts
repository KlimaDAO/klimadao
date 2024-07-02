import { BigNumber, providers } from "ethers";
import { addresses } from "../../constants";
import { formatUnits, getContract } from "../../utils";
import { getStaticProvider } from "../getStaticProvider";

import {
  RetirementsTotalsAndBalances,
  RetirementTotals,
} from "../../types/offset";

export const createRetirementStorageContract = (
  provider: providers.BaseProvider
) => getContract({ contractName: "retirementStorage", provider });

export const getRetirementTotalsAndBalances = async (params: {
  address: string;
  infuraId?: string;
}): Promise<RetirementsTotalsAndBalances> => {
  try {
    const provider = getStaticProvider({
      infuraId: params.infuraId,
    });
    const retirementStorageContract = createRetirementStorageContract(provider);

    const promises: [
      RetirementTotals,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
    ] = [
      retirementStorageContract.getRetirementTotals(params.address),
      retirementStorageContract.getRetirementPoolInfo(
        params.address,
        addresses["mainnet"].bct
      ),
      retirementStorageContract.getRetirementPoolInfo(
        params.address,
        addresses["mainnet"].mco2
      ),
      retirementStorageContract.getRetirementPoolInfo(
        params.address,
        addresses["mainnet"].nct
      ),
      retirementStorageContract.getRetirementPoolInfo(
        params.address,
        addresses["mainnet"].ubo
      ),
      retirementStorageContract.getRetirementPoolInfo(
        params.address,
        addresses["mainnet"].nbo
      ),
    ];
    const [totals, bct, mco2, nct, ubo, nbo] = await Promise.all(promises);

    const [
      totalRetirements,
      totalTonnesRetired,
      totalTonnesClaimedForNFTS,
    ]: RetirementTotals = totals;

    return {
      totalRetirements: totalRetirements.toString(),
      totalTonnesRetired: formatUnits(totalTonnesRetired, 18),
      totalTonnesClaimedForNFTS: formatUnits(totalTonnesClaimedForNFTS, 18),
      bct: formatUnits(bct, 18),
      mco2: formatUnits(mco2, 18),
      nct: formatUnits(nct, 18),
      ubo: formatUnits(ubo, 18),
      nbo: formatUnits(nbo, 18),
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
