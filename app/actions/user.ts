import { providers } from "ethers";
import { Thunk } from "state";

import { addresses } from "@klimadao/lib/constants";
import {
  formatUnits,
  trimStringDecimals,
  getContract,
} from "@klimadao/lib/utils";
import {
  setBalance,
  setExerciseAllowance,
  setStakeAllowance,
  setWrapAllowance,
  setDomains,
} from "state/user";

import { getKns, getEns } from "./utils";

export const loadAccountDetails = (params: {
  provider: providers.JsonRpcProvider;
  address: string;
  onRPCError: () => void;
}): Thunk => {
  return async (dispatch) => {
    try {
      const bctContract = getContract({
        contractName: "bct",
        provider: params.provider,
      });
      const nctContract = getContract({
        contractName: "nct",
        provider: params.provider,
      });
      const mco2Contract = getContract({
        contractName: "mco2",
        provider: params.provider,
      });
      const uboContract = getContract({
        contractName: "ubo",
        provider: params.provider,
      });
      const nboContract = getContract({
        contractName: "nbo",
        provider: params.provider,
      });
      const usdcContract = getContract({
        contractName: "usdc",
        provider: params.provider,
      });
      const klimaContract = getContract({
        contractName: "klima",
        provider: params.provider,
      });
      const sklimaContract = getContract({
        contractName: "sklima",
        provider: params.provider,
      });
      const wsklimaContract = getContract({
        contractName: "wsklima",
        provider: params.provider,
      });
      const pKlimaContract = getContract({
        contractName: "pklima",
        provider: params.provider,
      });
      const klimaDomainContract = getContract({
        contractName: "klimaNameService",
        provider: params.provider,
      });

      //domains
      const knsDomain = await getKns({
        address: params.address,
        contract: klimaDomainContract,
      });
      const ensDomain = await getEns({ address: params.address });

      // balances
      const balances = [
        // CARBON
        bctContract.balanceOf(params.address),
        mco2Contract.balanceOf(params.address),
        nctContract.balanceOf(params.address),
        uboContract.balanceOf(params.address),
        nboContract.balanceOf(params.address),

        // KLIMA
        klimaContract.balanceOf(params.address),
        sklimaContract.balanceOf(params.address),
        wsklimaContract.balanceOf(params.address),
        pKlimaContract.balanceOf(params.address),
        // USDC
        usdcContract.balanceOf(params.address),

        // allowances token.allowance(owner, spender)
        klimaContract.allowance(
          params.address,
          addresses["mainnet"].staking_helper
        ),
        sklimaContract.allowance(params.address, addresses["mainnet"].staking),
        sklimaContract.allowance(params.address, addresses["mainnet"].wsklima),
        pKlimaContract.allowance(
          params.address,
          addresses["mainnet"].pklima_exercise
        ),
        bctContract.allowance(
          params.address,
          addresses["mainnet"].pklima_exercise
        ),
      ];

      const [
        bctBalance,
        mco2Balance,
        nctBalance,
        uboBalance,
        nboBalance,
        klimaBalance,
        sklimaBalance,
        wsklimaBalance,
        pklimaBalance,
        usdcBalance,
        stakeAllowance,
        unstakeAllowance,
        wrapAllowance,
        pKlimaAllowance,
        bctAllowance,
      ] = await Promise.all(balances);

      dispatch(
        setDomains({
          knsDomain: knsDomain ?? undefined,
          ensDomain: ensDomain ?? undefined,
        })
      );
      dispatch(
        setBalance({
          klima: formatUnits(klimaBalance, 9),
          sklima: formatUnits(sklimaBalance, 9),
          wsklima: trimStringDecimals(formatUnits(wsklimaBalance), 9), // trim to 9 for compat with sKLIMA contract
          pklima: formatUnits(pklimaBalance),
          bct: formatUnits(bctBalance),
          nct: formatUnits(nctBalance),
          mco2: formatUnits(mco2Balance),
          ubo: formatUnits(uboBalance),
          nbo: formatUnits(nboBalance),
          usdc: formatUnits(usdcBalance, 6),
        })
      );
      dispatch(
        setStakeAllowance({
          klima: formatUnits(stakeAllowance, 9),
          sklima: formatUnits(unstakeAllowance, 9),
        })
      );
      dispatch(
        setExerciseAllowance({
          bct: formatUnits(bctAllowance),
          pklima: formatUnits(pKlimaAllowance),
        })
      );
      dispatch(
        setWrapAllowance({
          sklima: formatUnits(wrapAllowance),
          // wsklima: formatUnits(wsklimaWrapAllowance),
        })
      );
    } catch (error: any) {
      console.log(error);
      if (error.message && error.message.includes("Non-200 status code")) {
        params.onRPCError();
      }
    }
  };
};
