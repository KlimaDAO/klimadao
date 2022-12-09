import { utils, providers } from "ethers";
import { getContract } from "@klimadao/lib/utils";
import { OnStatusHandler } from "components/pages/Marketplace/shared/Transaction/lib";

export const createListingTransaction = async (params: {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const marketPlaceContract = getContract({
      contractName: "marketplace",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await marketPlaceContract.addListing(
      params.tokenAddress,
      utils.parseUnits(params.totalAmountToSell, 18), // C3 token
      utils.parseUnits(params.singleUnitPrice, 18), // Thought this needs to be 6 because of USDC, but this doesn't seem to work
      [], // TODO batches
      [] // TODO batches price
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const pollUntil = async <T>(params: {
  fn: () => Promise<T>;
  validate: (value: T) => boolean;
  ms: number;
  maxAttempts: number;
}) => {
  let attempts = 0;
  let result = await params.fn();
  attempts++;

  while (!params.validate(result)) {
    await wait(params.ms);
    result = await params.fn();
  }

  if (params.maxAttempts && attempts === params.maxAttempts) {
    return Promise.reject(new Error("Exceeded max attempts"));
  }

  return result;
};

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
