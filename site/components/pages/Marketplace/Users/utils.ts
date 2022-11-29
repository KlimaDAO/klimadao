import { Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  spenderAddress: string;
  onStatus: (m: string) => void;
}): Promise<string> => {
  try {
    const tokenContract = new Contract(
      params.tokenAddress,
      C3ProjectToken.abi,
      params.provider.getSigner()
    );

    const parsedValue = utils.parseUnits(params.value);

    params.onStatus("Approve in Wallet");
    const txn = await tokenContract.approve(
      params.spenderAddress,
      parsedValue.toString()
    );
    params.onStatus("Wait for networkConfirmation");
    await txn.wait(1);
    params.onStatus("Approval was successful");
    return formatUnits(parsedValue);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
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
