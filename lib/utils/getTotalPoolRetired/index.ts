import { BigNumber } from "ethers";
import { addresses } from "../../constants";
import { formatUnits } from "../formatUnits";
import { getContract } from "../getContract";
import { getStaticProvider } from "../getStaticProvider";

/**
 * Use the V2 aggregator to get the total tonnes retired for a beneficiary
 */
export const getTotalPoolRetired = async (params: {
  beneficiaryAddress: string;
  pool: "bct" | "nct" | "ubo" | "nbo" | "mco2";
  infuraId?: string;
}): Promise<string> => {
  const provider = getStaticProvider({
    infuraId: params.infuraId,
  });
  const contract = getContract({
    contractName: "retirementAggregatorV2",
    provider,
  });
  const totalTonnes: BigNumber = await contract.getTotalPoolRetired(
    params.beneficiaryAddress,
    addresses["mainnet"][params.pool]
  );
  return formatUnits(totalTonnes, 18);
};
