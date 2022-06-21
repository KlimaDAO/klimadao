import { ethers, providers } from "ethers";
import { Thunk } from "state";

import PunkTLD from "@klimadao/lib/abi/PunkTLD.json";

import { addresses } from "@klimadao/lib/constants";
import {
  formatUnits,
  trimStringDecimals,
  getContractByToken,
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
      const bctContract = getContractByToken({
        token: "bct",
        provider: params.provider,
      });
      const nctContract = getContractByToken({
        token: "nct",
        provider: params.provider,
      });
      const mco2Contract = getContractByToken({
        token: "mco2",
        provider: params.provider,
      });
      const uboContract = getContractByToken({
        token: "ubo",
        provider: params.provider,
      });
      const nboContract = getContractByToken({
        token: "nbo",
        provider: params.provider,
      });
      const usdcContract = getContractByToken({
        token: "usdc",
        provider: params.provider,
      });
      const klimaContract = getContractByToken({
        token: "klima",
        provider: params.provider,
      });
      const sklimaContract = getContractByToken({
        token: "sklima",
        provider: params.provider,
      });
      const wsklimaContract = getContractByToken({
        token: "wsklima",
        provider: params.provider,
      });
      const pKlimaContract = getContractByToken({
        token: "pklima",
        provider: params.provider,
      });
      // remember to add this to addresses object
      const klimaDomainContract = new ethers.Contract(
        addresses["mainnet"].klimaNameService,
        PunkTLD.abi,
        params.provider
      );

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
