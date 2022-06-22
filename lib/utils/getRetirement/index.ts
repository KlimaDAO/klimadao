import { providers, BigNumber } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { addresses } from "../../constants";
import {
  getRetirementTokenByAddress,
  formatUnits,
  getTokenDecimals,
  getIsValidAddress,
  getContract,
} from "../../utils";

import {
  RetirementTotals,
  RetirementsTotalsAndBalances,
  RetirementIndexInfo,
  RetirementIndexInfoResult,
} from "../../types/offset";

export const createRetirementStorageContract = (
  provider: providers.JsonRpcProvider
) => getContract({ token: "retirementStorage", provider });

export const getRetirementIndexInfo = async (params: {
  beneficiaryAddress: string;
  index: number;
  providerUrl?: string;
}): Promise<RetirementIndexInfoResult> => {
  try {
    const provider = getJsonRpcProvider(params.providerUrl);
    const storageContract = createRetirementStorageContract(provider);

    const [
      tokenAddress,
      amount,
      beneficiaryName,
      retirementMessage,
    ]: RetirementIndexInfo = await storageContract.getRetirementIndexInfo(
      params.beneficiaryAddress,
      BigNumber.from(params.index)
    );

    if (!getIsValidAddress(tokenAddress))
      throw new Error(`Invalid tokenAddress: ${tokenAddress}`);

    const typeOfToken = getRetirementTokenByAddress(tokenAddress);

    if (!typeOfToken) throw new Error(`Unknown tokenAddress: ${tokenAddress}`);

    // if not a known token assume 18 e.g. TC02
    const tokenDecimals = getTokenDecimals(typeOfToken);
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

export const getRetirementTotalsAndBalances = async (params: {
  address: string;
  providerUrl?: string;
}): Promise<RetirementsTotalsAndBalances> => {
  try {
    const provider = getJsonRpcProvider(params.providerUrl);
    const retirementStorageContract = createRetirementStorageContract(provider);

    const promises: [
      RetirementTotals,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
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
