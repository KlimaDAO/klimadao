import { ethers, providers } from "ethers";
import { Thunk } from "state";
import { addresses } from "@klimadao/lib/constants";

import Depository from "@klimadao/lib/abi/KlimaBondDepository_Regular.json";
import PairContract from "@klimadao/lib/abi/PairContract.json";
import BondCalcContract from "@klimadao/lib/abi/BondCalcContract.json";
import { setBond } from "state/bonds";

export const DEFAULT_QUOTE_SLP = "0.001"; // Use a realistic SLP ownership so we have a quote before the user inputs any value

export const contractForBond = (params: {
  bond: "bct" | "klima_bct_lp" | "bct_usdc_lp";
  provider: providers.JsonRpcProvider;
}) => {
  const address = {
    klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
    bct: addresses["mainnet"].bond_bct,
    bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
  }[params.bond];

  return new ethers.Contract(address, Depository.abi, params.provider);
};

const getMarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaBctLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  return reserves[0] / reserves[1];
};

export const calcBondDetails = (params: {
  bond: "bct" | "klima_bct_lp" | "bct_usdc_lp";
  value: string;
  provider: providers.JsonRpcProvider;
}): Thunk => {
  return async (dispatch) => {
    let amountInWei;
    if (!params.value || params.value === "") {
      amountInWei = ethers.utils.parseEther(DEFAULT_QUOTE_SLP);
    } else {
      amountInWei = ethers.utils.parseEther(params.value);
    }

    // const vestingTerm = VESTING_TERM; // hardcoded for now
    let bondDiscount = 0;
    let valuation;
    let bondQuote;
    const bondContract = contractForBond({
      bond: params.bond,
      provider: params.provider,
    });
    const marketPrice = await getMarketPrice({ provider: params.provider });
    const terms = await bondContract.terms();
    const maxBondPrice = await bondContract.maxPayout();
    const debtRatio = await bondContract.debtRatio();
    const bondPrice = await bondContract.bondPriceInUSD();
    if (params.bond === "klima_bct_lp") {
      const bondCalcContract = new ethers.Contract(
        addresses["mainnet"].bond_calc,
        BondCalcContract.abi,
        params.provider
      );
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = assume 1:1 backing
      valuation = await bondCalcContract.valuation(
        addresses["mainnet"].klimaBctLp,
        amountInWei
      );
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote /= Math.pow(10, 9);
    } else if (params.bond === "bct") {
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = DAI
      bondQuote = await bondContract.payoutFor(amountInWei);
      bondQuote /= Math.pow(10, 18);
    } else if (params.bond === "bct_usdc_lp") {
      const bondCalcContract = new ethers.Contract(
        addresses["mainnet"].bond_calc,
        BondCalcContract.abi,
        params.provider
      );
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = assume 1:1 backing
      valuation = await bondCalcContract.valuation(
        addresses["mainnet"].bctUsdcLp,
        amountInWei
      );
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote /= Math.pow(10, 9);
    }

    dispatch(
      setBond({
        bond: params.bond,
        bondDiscount: bondDiscount * 100,
        debtRatio: debtRatio / 10000000,
        bondQuote,
        vestingTerm: parseInt(terms.vestingTerm),
        maxBondPrice: maxBondPrice / Math.pow(10, 9),
        bondPrice: bondPrice / Math.pow(10, 18),
        marketPrice: marketPrice / Math.pow(10, 9),
      })
    );
  };
};
