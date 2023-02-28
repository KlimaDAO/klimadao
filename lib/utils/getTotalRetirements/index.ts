import { BigNumber } from "ethers";
import { getContract } from "../getContract";
import { getStaticProvider } from "../getStaticProvider";

/**
 * Use the V2 aggregator to get the total number of retirements for a beneficiary
 * @returns an integer number
 * (Sum of retirement events-- NOT the sum of carbon tonnes)
 */
export const getTotalRetirements = async (params: {
  beneficiaryAddress: string;
  infuraId?: string;
}): Promise<number> => {
  const provider = getStaticProvider({
    infuraId: params.infuraId,
  });
  const contract = getContract({
    contractName: "retirementAggregatorV2",
    provider,
  });
  const totalRetirements: BigNumber = await contract.getTotalRetirements(
    params.beneficiaryAddress
  );
  return totalRetirements.toNumber() || 0;
};
