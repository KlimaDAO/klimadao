import { addresses } from "@klimadao/lib/constants";
import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import wsKlima from "@klimadao/lib/abi/wsKlima.json";
import { formatUnits } from "@klimadao/lib/utils";

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = new ethers.Contract(
      addresses["mainnet"].sklima,
      IERC20.abi,
      params.provider.getSigner()
    );
    const value = ethers.utils.parseUnits("1000000000", "gwei"); //bignumber
    params.onStatus("userConfirmation");
    const txn = await contract.approve(
      addresses["mainnet"].wsklima,
      value.toString()
    );
    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
    return formatUnits(value);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    params.onStatus("error");
    throw error;
  }
};

export const wrapTransaction = async (params: {
  action: "wrap" | "unwrap";
  provider: providers.JsonRpcProvider;
  value: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = new ethers.Contract(
      addresses["mainnet"].wsklima,
      wsKlima.abi,
      params.provider.getSigner()
    );
    params.onStatus("userConfirmation");
    const decimal = params.action === "wrap" ? 9 : 18;
    const txn = await contract[params.action](
      ethers.utils.parseUnits(params.value, decimal)
    );
    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    params.onStatus("error");
    throw error;
  }
};
