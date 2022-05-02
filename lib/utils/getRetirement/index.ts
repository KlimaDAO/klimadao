import { ethers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";
import { addresses } from "../../constants";

import {
  Retirements,
  RetirementIndexInfo,
  RetirementIndexInfoResult,
  RetirementsResult,
} from "../../types/offset";

export const getRetirements = async (
  beneficiaryAdress: string
): Promise<RetirementsResult> => {
  try {
    const provider = getJsonRpcProvider();
    const storageContract = new ethers.Contract(
      addresses.mainnet.retirementStorage,
      KlimaRetirementStorage.abi,
      provider
    );

    const [totalRetirements, totalCarbonRetired, totalClaimed]: Retirements =
      await storageContract.retirements(beneficiaryAdress);

    const formattedTotalRetirements = totalRetirements.toNumber();
    const formattedTotalCarbonRetired = totalCarbonRetired.toNumber();
    const formattedTotalClaimed = totalClaimed.toNumber();

    return {
      totalRetirements: formattedTotalRetirements,
      totalCarbonRetired: formattedTotalCarbonRetired,
      totalClaimed: formattedTotalClaimed,
    };
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

export const getRetirementIndexInfo = async (
  beneficiaryAdress: string,
  index: number
): Promise<RetirementIndexInfoResult> => {
  try {
    const provider = getJsonRpcProvider();
    const storageContract = new ethers.Contract(
      addresses.mainnet.retirementStorage,
      KlimaRetirementStorage.abi,
      provider
    );

    const [
      tokenAddress,
      amount,
      beneficiaryName,
      retirementMessage,
    ]: RetirementIndexInfo = await storageContract.getRetirementIndexInfo(
      beneficiaryAdress,
      index
    );

    return {
      tokenAddress,
      amount: amount.toNumber(),
      beneficiaryName,
      retirementMessage,
    };
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
