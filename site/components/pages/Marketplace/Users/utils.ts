import { Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  spenderAddress: string;
  onStatus: (m: string) => void;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    C3ProjectToken.abi,
    params.provider.getSigner()
  );

  const parsedValue = utils.parseUnits(params.value);

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

export const pollUntil = async function (
  fn: () => Promise<any>,
  fnCondition: (result: any) => boolean,
  ms: number
) {
  let result = await fn();
  while (!fnCondition(result)) {
    await wait(ms);
    result = await fn();
  }
  return result;
};

const wait = function (ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
