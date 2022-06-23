import { providers, ethers, BigNumber } from "ethers";
import { Thunk } from "state";

import {
  formatUnits,
  getContract,
  createContractsObject,
  getAllowance,
  getSpendersAndTokens,
  getTokenDecimals,
} from "@klimadao/lib/utils";
import {
  Allowances,
  AllowancesSpender,
  AllowancesFormatted,
} from "@klimadao/lib/types/allowances";
import { setBalance, setAllowances, setDomains } from "state/user";

import { getKns, getEns } from "./utils";

const assets = [
  "bct",
  "nct",
  "mco2",
  "ubo",
  "nbo",
  "usdc",
  "klima",
  "sklima",
  "wsklima",
  "pklima",
] as const;
type Asset = typeof assets[number];

const spenders = [
  "staking_helper",
  "staking",
  "wsklima",
  "pklima_exercise",
] as const;

type TokenValue = {
  [K in Asset]: BigNumber;
};
type TokenValueFormatted = {
  [K in Asset]: string;
};

const getBalance = async (params: {
  token: Asset;
  contract: ethers.Contract;
  address: string;
}): Promise<TokenValue> => {
  try {
    const balance = await params.contract.balanceOf(params.address);
    return {
      [params.token]: balance,
    } as TokenValue;
  } catch (e) {
    console.error(`Error in getBalance for token: ${params.token}`);
    return Promise.reject(e);
  }
};

export const loadAccountDetails = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const assetsContracts = createContractsObject({
        contracts: assets as any,
        provider: params.provider,
      });

      const klimaDomainContract = getContract({
        contractName: "klimaNameService",
        provider: params.provider,
      });

      // domains
      const domains = [
        getKns({
          address: params.address,
          contract: klimaDomainContract,
        }),
        getEns({ address: params.address }),
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
      }, [] as Promise<TokenValue>[]);

      const allBalances = await Promise.all(promisesBalance);
      // reduce and format each with appropriate decimals
      const balances = allBalances.reduce<TokenValueFormatted>(
        (obj, balance) => {
          const [token, value] = Object.entries(balance)[0];
          const decimals = getTokenDecimals(token);
          obj[token as keyof typeof balance] = formatUnits(value, decimals);
          return obj;
        },
        {} as TokenValueFormatted
      );

      const spenderWithTokens = getSpendersAndTokens(spenders as any);
      const promisesAllowance = spenderWithTokens.reduce((arr, spender) => {
        const [spenderName, tokens] = Object.entries(spender)[0];
        tokens.forEach((tkn) => {
          const contract = assetsContracts[tkn];
          if (contract) {
            arr.push(
              getAllowance({
                contract,
                address: params.address,
                spender: spenderName as AllowancesSpender,
                token: tkn,
              })
            );
          }
        });
        return arr;
      }, [] as Promise<Allowances>[]);

      const allAllowances = await Promise.all(promisesAllowance);
      // reduce and format each with appropriate decimals
      const allowances = allAllowances.reduce<AllowancesFormatted>(
        (obj, allowance) => {
          const [token, spender] = Object.entries(allowance)[0];
          const decimals = getTokenDecimals(token);
          const [spenderName, value] = Object.entries(spender)[0];
          obj[token as keyof typeof allowance] = {
            ...obj[token as keyof typeof allowance],
            [spenderName as keyof typeof spender]: formatUnits(value, decimals),
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
      dispatch(setAllowances(allowances));
    } catch (error: any) {
      console.log(error);
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
