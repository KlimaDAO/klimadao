import { BigNumber } from "ethers";
import { formatUnits } from "../formatUnits";
import { getContract } from "../getContract";
import { getStaticProvider } from "../getStaticProvider";

/**
 * Use the V2 aggregator to get the total tonnes retired for a beneficiary
 */
export const getTotalCarbonRetired = async (params: {
  beneficiaryAddress: string;
  infuraId?: string;
}): Promise<string> => {
  const provider = getStaticProvider({
    infuraId: params.infuraId,
  });
  const contract = getContract({
    contractName: "retirementAggregatorV2",
    provider,
  });
  const totalTonnes: BigNumber = await contract.getTotalCarbonRetired(
    params.beneficiaryAddress
  );
  return formatUnits(totalTonnes, 18);
};
