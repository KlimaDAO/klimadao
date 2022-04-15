import { ethers } from "ethers";
import RetirementStorage from "@klimadao/lib/abi/RetirementStorage.json";
import { addresses } from "@klimadao/lib/constants";
import { getJsonRpcProvider } from "@klimadao/lib/utils";
import { formatUnits } from "@klimadao/lib/utils";

type Params = {
  address: string;
};

export type Retirements = {
  totalTonnesRetired: string;
  totalRetirements: string;
  bct: string;
  mco2: string;
  nct: string;
};

export const getRetirements = async (params: Params): Promise<Retirements> => {
  const provider = getJsonRpcProvider();
  const retirementStorageContract = new ethers.Contract(
    addresses["mainnet"].retirementStorage,
    RetirementStorage.abi,
    provider
  );

  const [totalRetirements, totalTonnesRetired] =
    await retirementStorageContract.getRetirementTotals(params.address);
  const bct = await retirementStorageContract.getRetirementPoolInfo(
    params.address,
    addresses["mainnet"].bct
  );
  const mco2 = await retirementStorageContract.getRetirementPoolInfo(
    params.address,
    addresses["mainnet"].mco2
  );
  const nct = await retirementStorageContract.getRetirementPoolInfo(
    params.address,
    addresses["mainnet"].nct
  );

  return {
    totalTonnesRetired: formatUnits(totalTonnesRetired, 18),
    totalRetirements: totalRetirements.toString(),
    bct: formatUnits(bct, 18),
    mco2: formatUnits(mco2, 18),
    nct: formatUnits(nct, 18),
  };
};
