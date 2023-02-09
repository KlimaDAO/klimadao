import { getStaticProvider } from "@klimadao/lib/utils";
import { utils } from "ethers";
import { Thunk } from "state";
import { updateAllowances } from "state/user";

import { addresses } from "@klimadao/lib/constants";
import {
  formatUnits,
  getContract,
  getTokenDecimals,
} from "@klimadao/lib/utils";

import { offsetInputTokens } from "@klimadao/lib/constants";
import { getAllowance } from "@klimadao/lib/utils";

import { AllowancesFormatted } from "@klimadao/lib/types/allowances";

export const getRedeemCost = async (params): Promise<string> => {
  console.log(params);
  const retirementAggregatorV2Contract = getContract({
    contractName: "retirementAggregatorV2",
    provider: getStaticProvider(),
  });

  const parsed = utils.parseUnits(
    params.quantity.toString(),
    getTokenDecimals(params.retirementToken)
  );

  console.log(params);
  const sourceAmount =
    await retirementAggregatorV2Contract.getSourceAmountSwapOnly(
      addresses.mainnet[params.retirementToken],
      params.projectAddress,
      parsed
    );

  console.log(sourceAmount);

  return formatUnits(sourceAmount[0], getTokenDecimals(params.inputToken));
};

// TODO review
export const getRedeemAllowances = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      // create arr of promises, one for each of the above erc20s
      const promises = offsetInputTokens.reduce((arr, val) => {
        const contract = getContract({
          contractName: val,
          provider: getStaticProvider(),
        });
        arr.push(
          getAllowance({
            contract,
            address: params.address,
            spender: "retirementAggregatorV2",
            token: val,
          })
        );
        return arr;
      }, [] as Promise<AllowancesFormatted>[]);

      // await to get arr of Allowances
      const allAllowances = await Promise.all(promises);

      // reduce to match the state shape
      const allowances = allAllowances.reduce<AllowancesFormatted>(
        (obj, allowance) => {
          const [token, spender] = Object.entries(allowance)[0];
          obj[token as keyof typeof allowance] = {
            ...obj[token as keyof typeof allowance],
            ...spender,
          };
          return obj;
        },
        {} as AllowancesFormatted
      );

      dispatch(updateAllowances(allowances));
    } catch (error: any) {
      console.error("Error in getRedeemAllowances: ", error);
      throw error;
    }
  };
};
