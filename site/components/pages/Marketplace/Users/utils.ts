import { Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits, getTokenDecimals } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  token: string;
  tokenAddress: string;
  spenderAddress: string;
  onStatus: (m: string) => void;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    C3ProjectToken.abi,
    params.provider.getSigner()
  );

  const decimals = getTokenDecimals(params.token);
  const parsedValue = utils.parseUnits(params.value, decimals);

  params.onStatus(
    t({
      id: "marketplace.profile.add_listing.approve_value",
      message: "Approve access to your tokens in your wallet first",
    })
  );
  const txn = await tokenContract.approve(
    params.spenderAddress,
    parsedValue.toString()
  );
  params.onStatus(
    t({
      id: "marketplace.profile.add_listing.waiting_network",
      message: "Waiting for network confirmation",
    })
  );
  await txn.wait(1);
  params.onStatus(
    t({
      id: "marketplace.profile.add_listing.approval_success",
      message: "Approval was successful",
    })
  );
  return formatUnits(parsedValue);
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
