import { ethers, providers } from "ethers";
import { Thunk } from "state";
import { setBond } from "state/bonds";
import { OnStatusHandler } from "./utils";
import { setBondAllowance } from "state/user";
import {
  getKlimaUsdcPrice
} from "@klimadao/lib/utils";
import { formatUnits } from "@klimadao/lib/utils";
import { addresses, Bond } from "@klimadao/lib/constants";
import Depository from "@klimadao/lib/abi/KlimaBondDepository_Regular.json";
import PairContract from "@klimadao/lib/abi/PairContract.json";
import BondCalcContract from "@klimadao/lib/abi/BondCalcContract.json";
import OhmDai from "@klimadao/lib/abi/OhmDai.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";

export const DEFAULT_QUOTE_SLP = "0.001"; // Use a realistic SLP ownership so we have a quote before the user inputs any value

export const contractForBond = (params: {
  bond: Bond;
  provider: providers.JsonRpcProvider;
}) => {
  const address = {
    klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
    bct: addresses["mainnet"].bond_bct,
    bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
    mco2: addresses["mainnet"].bond_mco2,
  }[params.bond];

  return new ethers.Contract(address, Depository.abi, params.provider);
};

export function contractForReserve(params: {
  bond: Bond;
  provider: providers.JsonRpcProvider;
}) {
  if (params.bond === "klima_bct_lp") {
    return new ethers.Contract(
      addresses["mainnet"].klimaBctLp,
      OhmDai.abi,
      params.provider
    );
  }
  if (params.bond === "bct") {
    return new ethers.Contract(
      addresses["mainnet"].bct,
      IERC20.abi,
      params.provider
    );
  }
  if (params.bond === "mco2") {
    return new ethers.Contract(
      addresses["mainnet"].mco2,
      IERC20.abi,
      params.provider
    );
  }
  // bct_usdc_lp
  return new ethers.Contract(
    addresses["mainnet"].bctUsdcLp,
    OhmDai.abi,
    params.provider
  );
}

const getBCTMarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaBctLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [BCT, KLIMA] - KLIMA has 9 decimals, BCT has 18 decimals
  return reserves[0] / (reserves[1] * Math.pow(10, 9));
};

const getMCO2MarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].mco2UsdcLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [USDC, MCO2] - USDC has 6 decimals, MCO2 has 18 decimals
  const MCO2USDCPrice = reserves[0] * Math.pow(10, 12) / reserves[1];
  const KLIMAUSDCPrice = await getKlimaUsdcPrice();
  return KLIMAUSDCPrice / MCO2USDCPrice;
};

export const calcBondDetails = (params: {
  bond: Bond;
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

    const bondContract = contractForBond({
      bond: params.bond,
      provider: params.provider,
    });
    // for SLP bonds
    const bondCalcContract = new ethers.Contract(
      addresses["mainnet"].bond_calc,
      BondCalcContract.abi,
      params.provider
    );

    const getMarketPrice =
      params.bond === "mco2" ? getMCO2MarketPrice : getBCTMarketPrice;
    const marketPrice = await getMarketPrice({
      provider: params.provider,
    });

    const terms = await bondContract.terms();
    const maxBondPrice = await bondContract.maxPayout();
    const debtRatio = await bondContract.debtRatio();
    const bondPrice = await bondContract.bondPriceInUSD();

    let bondQuote;
    if (params.bond === "klima_bct_lp") {
      const valuation = await bondCalcContract.valuation(
        addresses["mainnet"].klimaBctLp,
        amountInWei
      );
      bondQuote = formatUnits(await bondContract.payoutFor(valuation), 9);
    } else if (params.bond === "bct" || params.bond === "mco2") {
      bondQuote = formatUnits(await bondContract.payoutFor(amountInWei), 18);
    } else if (params.bond === "bct_usdc_lp") {
      const valuation = await bondCalcContract.valuation(
        addresses["mainnet"].bctUsdcLp,
        amountInWei
      );
      bondQuote = formatUnits(await bondContract.payoutFor(valuation), 9);
    } else if (params.bond === "mco2") {
      bondQuote = formatUnits(await bondContract.payoutFor(amountInWei), 18);
    }

    const bondDiscount =
      (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;

    dispatch(
      setBond({
        bond: params.bond,
        bondDiscount: bondDiscount * 100,
        debtRatio: debtRatio / 10000000,
        bondQuote,
        vestingTerm: parseInt(terms.vestingTerm),
        maxBondPrice: formatUnits(maxBondPrice, 9),
        bondPrice: formatUnits(bondPrice),
        marketPrice: marketPrice.toString(),
      })
    );
  };
};

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  bond: Bond;
  onStatus: OnStatusHandler;
}) => {
  try {
    const signer = params.provider.getSigner();
    const contract = {
      klima_bct_lp: new ethers.Contract(
        addresses["mainnet"].klimaBctLp,
        OhmDai.abi,
        signer
      ),
      bct: new ethers.Contract(addresses["mainnet"].bct, IERC20.abi, signer),
      bct_usdc_lp: new ethers.Contract(
        addresses["mainnet"].bctUsdcLp,
        OhmDai.abi,
        signer
      ),
      mco2: new ethers.Contract(addresses["mainnet"].mco2, IERC20.abi, signer),
    }[params.bond];
    const approvalAddress = {
      klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
      bct: addresses["mainnet"].bond_bct,
      bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
      mco2: addresses["mainnet"].bond_mco2,
    }[params.bond];
    const value = ethers.utils.parseUnits("1000000000", "ether");
    params.onStatus("userConfirmation");
    const txn = await contract.approve(approvalAddress, value.toString());
    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
    return value;
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

export const calculateUserBondDetails = (params: {
  address: string;
  bond: Bond;
  provider: providers.JsonRpcProvider;
}): Thunk => {
  return async (dispatch) => {
    if (!params.address) return;

    // Calculate bond details.
    const bondContract = contractForBond({
      bond: params.bond,
      provider: params.provider,
    });
    const reserveContract = contractForReserve({
      bond: params.bond,
      provider: params.provider,
    });
    const bondDetails = await bondContract.bondInfo(params.address);
    const interestDue = bondDetails[0];
    const bondMaturationBlock = +bondDetails[1] + +bondDetails[2];
    const pendingPayout = await bondContract.pendingPayoutFor(params.address);

    let allowance;
    let balance;
    if (params.bond === "klima_bct_lp") {
      allowance = await reserveContract.allowance(
        params.address,
        addresses["mainnet"].bond_klimaBctLp
      );
      balance = await reserveContract.balanceOf(params.address);
      balance = ethers.utils.formatUnits(balance, "ether");
    } else if (params.bond === "bct") {
      allowance = await reserveContract.allowance(
        params.address,
        addresses["mainnet"].bond_bct
      );
      balance = await reserveContract.balanceOf(params.address);
      balance = ethers.utils.formatEther(balance);
    } else if (params.bond === "bct_usdc_lp") {
      allowance = await reserveContract.allowance(
        params.address,
        addresses["mainnet"].bond_bctUsdcLp
      );
      balance = await reserveContract.balanceOf(params.address);
      balance = ethers.utils.formatEther(balance);
    } else if (params.bond === "mco2") {
      allowance = await reserveContract.allowance(
        params.address,
        addresses["mainnet"].bond_mco2
      );
      balance = await reserveContract.balanceOf(params.address);
      balance = ethers.utils.formatEther(balance);
    }

    dispatch(
      setBondAllowance({
        [params.bond]: formatUnits(allowance),
      })
    );
    dispatch(
      setBond({
        bond: params.bond,
        balance,
        interestDue: ethers.utils.formatUnits(interestDue, "gwei"),
        bondMaturationBlock,
        pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
      })
    );
  };
};

export const bondTransaction = async (params: {
  value: string;
  address: string;
  bond: Bond;
  provider: providers.JsonRpcProvider;
  slippage: number;
  onStatus: OnStatusHandler;
}) => {
  try {
    const signer = params.provider.getSigner();
    const contractAddress = {
      klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
      bct: addresses["mainnet"].bond_bct,
      bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
      mco2: addresses["mainnet"].bond_mco2,
    }[params.bond];
    const contract = new ethers.Contract(
      contractAddress,
      Depository.abi,
      signer
    );
    const calculatePremium = await contract.bondPrice();
    const acceptedSlippage = params.slippage / 100 || 0.02; // 2%
    const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
    const valueInWei = ethers.utils.parseUnits(params.value, "ether");
    params.onStatus("userConfirmation");
    const txn = await contract.deposit(valueInWei, maxPremium, params.address);
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

export const redeemTransaction = async (params: {
  address: string;
  bond: Bond;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const autostake = false;
    const signer = params.provider.getSigner();
    const contractAddress = {
      klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
      bct: addresses["mainnet"].bond_bct,
      bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
      mco2: addresses["mainnet"].bond_mco2,
    }[params.bond];
    const contract = new ethers.Contract(
      contractAddress,
      Depository.abi,
      signer
    );
    params.onStatus("userConfirmation");
    const txn = await contract.redeem(params.address, autostake);
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
