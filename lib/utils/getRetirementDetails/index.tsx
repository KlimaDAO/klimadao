import { BigNumber, ethers } from "ethers";
import { formatUnits } from "../formatUnits";
import { getContract } from "../getContract";
import { getStaticProvider } from "../getStaticProvider";

type Response = [
  poolTokenAddress: string, // 0x000 if tco2 was retired directly
  projectTokenAddress: string, // 0x000 for v1 retirements, cujo should fix this at some point
  beneficiaryAddress: string,
  beneficiary: string,
  retirementMessage: string,
  amount: BigNumber // 18 decimal
];

interface RetirementDetails {
  poolTokenAddress: null | string; // null if tco2 was retired directly
  projectTokenAddress: null | string; // null for v1 retirements
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  amount: string;
}

const isZeroAddress = (addr: string) => addr === ethers.constants.AddressZero;

/**
 * Use the v2 aggregator to get retirement details, directly via RPC call, for given beneficiary + index
 * Returns null if no retirement is found for that index
 */
export const getRetirementDetails = async (params: {
  beneficiaryAddress: string;
  index: number;
  infuraId?: string;
}): Promise<RetirementDetails | null> => {
  const provider = getStaticProvider({
    infuraId: params.infuraId,
  });
  const contract = getContract({
    contractName: "retirementAggregatorV2",
    provider,
  });

  const [
    poolTokenAddress,
    projectTokenAddress,
    beneficiaryAddress,
    beneficiary,
    retirementMessage,
    amount,
  ]: Response = await contract.getRetirementDetails(
    params.beneficiaryAddress,
    params.index
  );

  // can't rely on pool token or project token as these can both be 0x000
  if (amount.toString() === "0") {
    return null;
  }

  return {
    poolTokenAddress: isZeroAddress(projectTokenAddress)
      ? null
      : poolTokenAddress,
    projectTokenAddress: isZeroAddress(projectTokenAddress)
      ? null
      : projectTokenAddress,
    beneficiaryAddress,
    beneficiary,
    retirementMessage,
    amount: formatUnits(amount, 18),
  };
};
