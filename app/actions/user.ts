import { Contract } from "ethers";
import { Thunk } from "state";

import { AllowancesFormatted } from "@klimadao/lib/types/allowances";
import {
  formatUnits,
  getAllowance,
  getContract,
  getENSProfile,
  getKNSProfile,
  getStaticProvider,
  getTokenDecimals,
  getTokensFromSpender,
} from "@klimadao/lib/utils";
import { setBalance, setDomains, updateAllowances } from "state/user";

const assets = [
  "bct",
  "nct",
  "mco2",
  "ubo",
  "nbo",
  "usdc", // USDC.e
  "klima",
  "sklima",
  "wsklima",
  "pklima",
] as const;
type Asset = (typeof assets)[number];

const spenders = [
  "staking_helper",
  "staking",
  "wsklima",
  "pklima_exercise",
] as const;

type TokenValueFormatted = {
  [K in Asset]: string;
};

const getBalance = async (params: {
  token: Asset;
  contract: Contract;
  address: string;
}): Promise<string> => {
  try {
    const balance = await params.contract.balanceOf(params.address);
    const decimals = getTokenDecimals(params.token);
    return formatUnits(balance, decimals);
  } catch (e) {
    console.error(`Error in getBalance for token: ${params.token}`);
    return Promise.reject(e);
  }
};

type ContractsObject = {
  [key in Asset]: Contract;
};

export const loadAccountDetails = (params: {
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const provider = getStaticProvider();
      // all assets
      const assetsContracts = assets.reduce((obj, asset) => {
        const contract = getContract({
          contractName: asset,
          provider,
        });
        return { ...obj, [asset]: contract };
      }, {} as ContractsObject);

      // domains
      const domains = [
        getKNSProfile({
          address: params.address,
        }),
        getENSProfile({
          address: params.address,
        }),
      ];

      const [knsDomain, ensDomain] = await Promise.all(domains);

      // balances
      const promisesBalance = assets.reduce((arr, asset) => {
        const contract = assetsContracts[asset];
        if (contract) {
          arr.push(
            getBalance({ token: asset, contract, address: params.address })
          );
        }
        return arr;
      }, [] as Promise<string>[]);

      const allBalances = await Promise.all(promisesBalance);
      // reduce to match the state shape
      const balances = assets.reduce((obj, asset, assetIndex) => {
        const balance = allBalances[assetIndex];
        return {
          ...obj,
          [asset]: balance,
        };
      }, {} as TokenValueFormatted);

      const promisesAllowance = spenders.reduce((arr, spender) => {
        const tokens = getTokensFromSpender(spender);
        tokens.forEach((tkn) => {
          const contract = assetsContracts[tkn as Asset];
          if (contract) {
            arr.push(
              getAllowance({
                contract,
                address: params.address,
                spender,
                token: tkn,
              })
            );
          }
        });
        return arr;
      }, [] as Promise<AllowancesFormatted>[]);

      const allAllowances = await Promise.all(promisesAllowance);
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

      dispatch(
        setDomains({
          knsDomain: knsDomain ?? undefined,
          ensDomain: ensDomain ?? undefined,
        })
      );
      dispatch(setBalance(balances));
      dispatch(updateAllowances(allowances));
    } catch (error: any) {
      console.error(error);
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
