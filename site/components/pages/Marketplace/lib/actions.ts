import { ethers, Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits } from "@klimadao/lib/utils";

import { getMarketplaceAddress } from "./getAddresses";
import { OnStatusHandler } from "./statusMessage";

export const getC3tokenToMarketplaceAllowance = async (params: {
  userAdress: string;
  tokenAddress: string;
  provider: ethers.providers.Provider;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    C3ProjectToken.abi,
    params.provider
  );

  const allowance = await tokenContract.allowance(
    params.userAdress,
    getMarketplaceAddress()
  );

  return ethers.utils.formatUnits(allowance);
};

export const onApproveMarketplaceTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const tokenContract = new Contract(
      params.tokenAddress,
      C3ProjectToken.abi,
      params.provider.getSigner()
    );

    const parsedValue = utils.parseUnits(params.value, 18); // always 18 for C3 tokens ?

    params.onStatus("userConfirmation");

    const txn = await tokenContract.approve(
      getMarketplaceAddress(),
      parsedValue.toString()
    );

    params.onStatus("networkConfirmation", "");
    await txn.wait(1);

    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
};
