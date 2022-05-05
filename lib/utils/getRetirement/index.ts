import { ethers, providers, BigNumber } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";
import { addresses } from "../../constants";
import {
  getTypeofTokenByAddress,
  formatUnits,
  getTokenDecimals,
} from "../../utils";

import {
  Retirements,
  RetirementsResult,
  RetirementIndexInfo,
  RetirementIndexInfoResult,
} from "../../types/offset";

export const createRetirementStorageContract = (
  provider: providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    addresses["mainnet"].retirementStorage,
    KlimaRetirementStorage.abi,
    provider
  );
};

export const getRetirements = async (
  beneficiaryAdress: string
): Promise<RetirementsResult> => {
  try {
    const provider = getJsonRpcProvider();
    const storageContract = createRetirementStorageContract(provider);

    const [totalRetirements, totalCarbonRetired, totalClaimed]: Retirements =
      await storageContract.retirements(beneficiaryAdress);

    const formattedTotalRetirements = totalRetirements.toNumber();
    const formattedTotalCarbonRetired = formatUnits(totalCarbonRetired);
    const formattedTotalClaimed = formatUnits(totalClaimed);

    return {
      totalRetirements: formattedTotalRetirements,
      totalCarbonRetired: formattedTotalCarbonRetired,
      totalClaimed: formattedTotalClaimed,
    };
  } catch (e) {
    console.error("getRetirements Error", e);
    return Promise.reject(e);
  }
};

export const getRetirementIndexInfo = async (
  beneficiaryAdress: string,
  index: number
): Promise<RetirementIndexInfoResult> => {
  try {
    const provider = getJsonRpcProvider();
    const storageContract = createRetirementStorageContract(provider);

    const [
      tokenAddress,
      amount,
      beneficiaryName,
      retirementMessage,
    ]: RetirementIndexInfo = await storageContract.getRetirementIndexInfo(
      beneficiaryAdress,
      BigNumber.from(index)
    );

    const typeOfToken = getTypeofTokenByAddress(tokenAddress);
    const tokenDecimals = getTokenDecimals(typeOfToken || "");
    const formattedAmount = formatUnits(amount, tokenDecimals);

    return {
      tokenAddress,
      typeOfToken,
      amount: formattedAmount,
      beneficiaryName,
      retirementMessage,
    };
  } catch (e) {
    console.error("getRetirementIndexInfo Error", e);
    return Promise.reject(e);
  }
};
