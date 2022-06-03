import { ContractInterface, ethers, providers } from "ethers";
import { Thunk } from "state";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import KlimaProV2 from "@klimadao/lib/abi/KlimaProV2.json";
import { addresses } from "@klimadao/lib/constants";
import { OnStatusHandler } from "./utils";

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  bond: any;
  onStatus: OnStatusHandler;
}) => {
  try {
    const klimaContract = new ethers.Contract(
      addresses["mainnet"].klima,
      IERC20.abi,
      params.provider
    );
    // need to check for current approval status and return if already approved. see if its higher than max bond amount?
    const approvalAddress = addresses["mainnet"].klimaProV2;
    const value = ethers.utils.parseUnits("1000000000", "ether");
    params.onStatus("userConfirmation", "");
    const txn = await klimaContract.approve(approvalAddress, value.toString());
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return value;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
