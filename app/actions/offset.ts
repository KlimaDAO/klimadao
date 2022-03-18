import { ethers, providers } from "ethers";
import { Thunk } from "state";
import {
  setCarbonRetiredAllowance,
  setCarbonRetiredBalances,
} from "state/user";

import IERC20 from "@klimadao/lib/abi/IERC20.json";
import RetirementStorage from "@klimadao/lib/abi/RetirementStorage.json";
import { addresses } from "@klimadao/lib/constants";
import { formatUnits, getTokenDecimals } from "@klimadao/lib/utils";
import { OnStatusHandler } from "./utils";

export const inputTokens = [
  "bct",
  "nct",
  "mco2",
  "usdc",
  "klima",
  "sklima",
  "wsklima",
] as const;
export type InputToken = typeof inputTokens[number];

export const retirementTokens = ["bct", "nct", "mco2"] as const;
export type RetirementToken = typeof retirementTokens[number];

export const getRetiredOffsetBalances = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const retirementStorageContract = new ethers.Contract(
        addresses["mainnet"].retirementStorage,
        RetirementStorage.abi,
        params.provider
      );
      // @return Int tuple. Total retirements, total tons retired, total tons claimed for NFTs.
      const [totalRetirements, totalTonnesRetired, totalTonnesClaimedForNFTS] =
        await retirementStorageContract.getRetirementTotals(params.address);
      const totalBCTRetired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].bct
        );
      const totalMCO2Retired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].mco2
        );
      const totalNCTRetired =
        await retirementStorageContract.getRetirementPoolInfo(
          params.address,
          addresses["mainnet"].nct
        );
      dispatch(
        setCarbonRetiredBalances({
          totalTonnesRetired: formatUnits(totalTonnesRetired, 18),
          totalRetirements: formatUnits(totalRetirements, 18),
          totalTonnesClaimedForNFTS: formatUnits(totalTonnesClaimedForNFTS, 18),
          totalBCTRetired: formatUnits(totalBCTRetired, 18),
          totalMCO2Retired: formatUnits(totalMCO2Retired, 18),
          totalNCTRetired: formatUnits(totalNCTRetired, 18),
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const getRetirementAllowances = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      // create arr of promises, one for each of the above erc20s
      const promises = inputTokens.reduce((arr, val) => {
        const contract = new ethers.Contract(
          addresses["mainnet"][val],
          IERC20.abi,
          params.provider
        );
        arr.push(
          contract.allowance(
            params.address, // owner
            addresses["mainnet"].offsetConsumption // spender
          )
        );
        return arr;
      }, [] as Promise<ethers.BigNumber>[]);

      type Allowances = { [key in typeof inputTokens[number]]: string };

      // await to get arr of bignumbers
      const res = await Promise.all(promises);

      // reduce and format each with appropriate decimals
      const allowances = inputTokens.reduce<Allowances>((obj, tkn, index) => {
        const val = res[index];
        const decimals =
          tkn === "klima" || tkn === "sklima" ? 9 : tkn === "usdc" ? 6 : 18;
        obj[tkn] = formatUnits(val, decimals);
        return obj;
      }, {} as Allowances);
      dispatch(setCarbonRetiredAllowance(allowances));
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };
};

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  token: InputToken;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const contract = new ethers.Contract(
      addresses["mainnet"][params.token],
      IERC20.abi,
      params.provider.getSigner()
    );
    const decimals = getTokenDecimals(params.token);
    const value = ethers.utils.parseUnits("1000000000", decimals);
    params.onStatus("userConfirmation", "");
    const txn = await contract.approve(
      addresses["mainnet"].offsetConsumption,
      value.toString()
    );
    console.log("got txn", txn, params.token);
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Approval was successful");
    return formatUnits(value, decimals);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
