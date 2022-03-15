import { ethers, providers } from "ethers";
import { Thunk } from "state";

import RetirementStorage from "@klimadao/lib/abi/RetirementStorage.json";
import { addresses } from "@klimadao/lib/constants";
import { formatUnits } from "@klimadao/lib/utils";
import { setCarbonRetiredBalances } from "state/user";

export const getRetiredOffsetBalances = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const retirementStorageContract = new ethers.Contract(
        addresses["mainnet"].retirementStorage,
        RetirementStorage.abi,
        params.provider
      );
      // @return Int tuple. Total retirements, total tons retired, total tons claimed for NFTs.
      const [totalRetirements, totalTonnesRetired, totalTonnesClaimedForNFTS] =
        await retirementStorageContract.getRetirementTotals(params.address);
      const totalBCTRetired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].bct
        );
      const totalMCO2Retired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].mco2
        );
      const totalNCTRetired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].nct
        );
      dispatch(
        setCarbonRetiredBalances({
          totalTonnesRetired: formatUnits(totalTonnesRetired, 18),
          totalRetirements: formatUnits(totalRetirements, 18),
          totalTonnesClaimedForNFTS: formatUnits(totalTonnesClaimedForNFTS, 18),
          totalBCTRetired: formatUnits(totalBCTRetired, 18),
          totalMCO2Retired: formatUnits(totalMCO2Retired, 18),
          totalNCTRetired: formatUnits(totalNCTRetired, 18),
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };
};
