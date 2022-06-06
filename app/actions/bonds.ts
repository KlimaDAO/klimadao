import { ContractInterface, ethers, providers } from "ethers";
import { Thunk } from "state";
import { setBond } from "state/bonds";
import { OnStatusHandler } from "./utils";
import { setBondAllowance } from "state/user";
import { formatUnits, getJsonRpcProvider } from "@klimadao/lib/utils";
import { addresses, Bond } from "@klimadao/lib/constants";
import Depository from "@klimadao/lib/abi/KlimaBondDepository_Regular.json";
import PairContract from "@klimadao/lib/abi/PairContract.json";
import BondCalcContract from "@klimadao/lib/abi/BondCalcContract.json";
import OhmDai from "@klimadao/lib/abi/OhmDai.json";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import KlimaProV2 from "@klimadao/lib/abi/KlimaProV2.json";

const getBondAddress = (params: { bond: Bond }): string => {
  return {
    klima_mco2_lp: addresses["mainnet"].bond_klimaMco2Lp,
    klima_bct_lp: addresses["mainnet"].bond_klimaBctLp,
    klima_usdc_lp: addresses["mainnet"].bond_klimaUsdcLp,
    bct: addresses["mainnet"].bond_bct,
    bct_usdc_lp: addresses["mainnet"].bond_bctUsdcLp,
    mco2: addresses["mainnet"].bond_mco2,
    nbo: addresses["mainnet"].bond_nbo,
    ubo: addresses["mainnet"].bond_ubo,
    inverse_usdc: addresses["mainnet"].klimaProV2,
  }[params.bond];
};

const getReserveAddress = (params: { bond: Bond }): string => {
  return {
    klima_bct_lp: addresses["mainnet"].klimaBctLp,
    klima_usdc_lp: addresses["mainnet"].klimaUsdcLp,
    bct: addresses["mainnet"].bct,
    mco2: addresses["mainnet"].mco2,
    bct_usdc_lp: addresses["mainnet"].bctUsdcLp,
    klima_mco2_lp: addresses["mainnet"].klimaMco2Lp,
    nbo: addresses["mainnet"].nbo,
    ubo: addresses["mainnet"].ubo,
    inverse_usdc: addresses["mainnet"].klimaProV2,
  }[params.bond];
};

const getReserveABI = (params: { bond: Bond }): ContractInterface => {
  return {
    klima_bct_lp: OhmDai.abi,
    klima_usdc_lp: OhmDai.abi,
    bct: IERC20.abi,
    mco2: IERC20.abi,
    bct_usdc_lp: OhmDai.abi,
    klima_mco2_lp: OhmDai.abi,
    nbo: IERC20.abi,
    ubo: IERC20.abi,
    inverse_usdc: KlimaProV2.abi,
  }[params.bond];
};

const getIsInverse = (params: { bond: Bond }): boolean => {
  return {
    ubo: false,
    nbo: false,
    mco2: false,
    bct: false,
    klima_usdc_lp: false,
    klima_bct_lp: false,
    bct_usdc_lp: false,
    klima_mco2_lp: false,
    inverse_usdc: true,
  }[params.bond];
};

export const contractForBond = (params: {
  bond: Bond;
  provider: providers.JsonRpcProvider;
}) => {
  const address = getBondAddress({ bond: params.bond });
  if (getIsInverse({ bond: params.bond })) {
    return new ethers.Contract(address, KlimaProV2.abi, params.provider);
  } else {
    return new ethers.Contract(address, Depository.abi, params.provider);
  }
};

export function contractForReserve(params: {
  bond: Bond;
  providerOrSigner: providers.JsonRpcProvider | providers.JsonRpcSigner;
}) {
  return new ethers.Contract(
    getReserveAddress({ bond: params.bond }),
    getReserveABI({ bond: params.bond }),
    params.providerOrSigner
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

const getUBOMarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaUboLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [UBO, KLIMA] - UBO has 18 decimals, KLIMA has 9 decimals
  return reserves[0] / (reserves[1] * Math.pow(10, 9));
};

const getNBOMarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaNboLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [KLIMA, NBO] - KLIMA has 9 decimals, NBO has 18 decimals,
  return reserves[1] / (reserves[0] * Math.pow(10, 9));
};

// for Klima/USDC LP
const getKlimaUSDCMarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaUsdcLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [USDC, KLIMA] - USDC has 6 decimals KLIMA has 9 decimals
  // divide usdc/klima to get klima usdc price
  // i just swapped this to klima/usdc
  return (reserves[0] * Math.pow(10, 12)) / (reserves[1] * Math.pow(10, 9));
};

const getInverseKlimaUSDCPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaUsdcLp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [USDC, KLIMA] - USDC has 6 decimals KLIMA has 9 decimals
  // divide usdc/klima to get klima usdc price
  // i just swapped this to klima/usdc
  return (reserves[1] * Math.pow(10, 9)) / (reserves[0] * Math.pow(10, 12));
};

// [usdc, klima] 200/2 = 100
const getMCO2MarketPrice = async (params: {
  provider: providers.JsonRpcProvider;
}) => {
  const pairContract = new ethers.Contract(
    addresses["mainnet"].klimaMco2Lp,
    PairContract.abi,
    params.provider
  );
  const reserves = await pairContract.getReserves();
  // [MCO2, KLIMA] - KLIMA has 9 decimals, MCO2 has 18 decimals
  const MCO2KLIMAPrice = reserves[1] / (reserves[0] * Math.pow(10, 9));
  return MCO2KLIMAPrice;
};

export const calcBondDetails = (params: {
  bond: Bond;
  value?: string;
}): Thunk => {
  return async (dispatch) => {
    const provider = getJsonRpcProvider();
    let amountInWei;
    if (!params.value || params.value === "") {
      amountInWei = ethers.utils.parseEther("0");
    } else {
      amountInWei = ethers.utils.parseEther(params.value);
    }

    const bondContract = contractForBond({
      bond: params.bond,
      provider: provider,
    });
    // for SLP bonds
    const bondCalcContract = new ethers.Contract(
      params.bond === "klima_usdc_lp"
        ? addresses["mainnet"].bond_calc_klimaUsdc
        : addresses["mainnet"].bond_calc,
      BondCalcContract.abi,
      provider
    );

    const getMarketPrice = {
      mco2: getMCO2MarketPrice,
      klima_mco2_lp: getMCO2MarketPrice,
      klima_usdc_lp: getKlimaUSDCMarketPrice,
      klima_bct_lp: getBCTMarketPrice,
      bct_usdc_lp: getBCTMarketPrice,
      bct: getBCTMarketPrice,
      ubo: getUBOMarketPrice,
      nbo: getNBOMarketPrice,
      inverse_usdc: getInverseKlimaUSDCPrice,
    }[params.bond];

    const marketPrice = await getMarketPrice({
      provider: provider,
    });
    let terms;
    let maxBondPrice;
    let debtRatio;
    let bondPrice;
    let returnOnInterest;
    // stopped here. make the stuff below here work plox
    if (getIsInverse({ bond: params.bond })) {
      bondPrice = await bondContract.marketPrice(2);
      const bonus = 1 / bondPrice.toNumber() - marketPrice;
      returnOnInterest = bonus;
      terms = await bondContract.terms(2);
      const marketData = await bondContract.markets(2);
      console.log("maxBondPrice", marketData.maxPayout.toNumber());
      maxBondPrice = marketData.maxPayout.toNumber();
    } else {
      terms = await bondContract.terms();
      maxBondPrice = await bondContract.maxPayout();
      debtRatio = await bondContract.debtRatio();
      bondPrice = await bondContract.bondPriceInUSD();
    }

    let bondQuote;
    if (
      params.bond === "bct" ||
      params.bond === "mco2" ||
      params.bond === "nbo" ||
      params.bond === "ubo"
    ) {
      bondQuote = formatUnits(await bondContract.payoutFor(amountInWei), 18);
    } else if (params.bond !== "inverse_usdc" && Number(params.value)) {
      bondQuote = (
        Number(params.value) *
        Math.pow(10, 6) *
        bondPrice.toNumber()
      ).toString();
      console.log("bondQuote", bondQuote, params.value, bondPrice.toNumber());
    } else if (params.bond !== "inverse_usdc" && !Number(params.value)) {
      bondQuote = "0";
    } else {
      const valuation = await bondCalcContract.valuation(
        getReserveAddress({ bond: params.bond }),
        amountInWei
      );
      bondQuote = formatUnits(await bondContract.payoutFor(valuation), 9);
    }

    const decimalAdjustedBondPrice =
      params.bond === "klima_usdc_lp" || params.bond === "inverse_usdc"
        ? bondPrice * Math.pow(10, 12) // need to add decimals because this bond returns USDC (6 dec).
        : bondPrice;
    let bondDiscount;
    if (params.bond === "inverse_usdc") {
      bondDiscount = returnOnInterest;
    } else {
      bondDiscount =
        (marketPrice * Math.pow(10, 18) - decimalAdjustedBondPrice) /
        decimalAdjustedBondPrice;
    }

    if (getIsInverse({ bond: params.bond })) {
      dispatch(
        setBond({
          bond: params.bond,
          bondDiscount: bondDiscount! * 100,
          bondQuote: "55",
          vestingTerm: 0,
          maxBondPrice,
          bondPrice: formatUnits(
            bondPrice,
            params.bond === "inverse_usdc" ? 6 : 18
          ),
          marketPrice: marketPrice.toString(),
        })
      );
    } else {
      dispatch(
        setBond({
          bond: params.bond,
          bondDiscount: bondDiscount! * 100,
          debtRatio: debtRatio / 10000000,
          bondQuote,
          vestingTerm: parseInt(terms.vestingTerm),
          maxBondPrice: formatUnits(maxBondPrice, 9),
          bondPrice: formatUnits(
            bondPrice,
            params.bond === "klima_usdc_lp" ? 6 : 18
          ),
          marketPrice: marketPrice.toString(),
          // format fee as # of tonnes
          fee: parseInt(terms.fee) / 10000,
        })
      );
    }
  };
};

export const changeApprovalTransaction = async (params: {
  provider: providers.JsonRpcProvider;
  bond: Bond;
  onStatus: OnStatusHandler;
  isInverse?: boolean;
}) => {
  try {
    const contract = params.isInverse
      ? new ethers.Contract(
          addresses["mainnet"].klima,
          IERC20.abi,
          params.provider.getSigner()
        )
      : contractForReserve({
          bond: params.bond,
          providerOrSigner: params.provider.getSigner(),
        });
    const approvalAddress = getBondAddress({ bond: params.bond });
    const value = ethers.utils.parseUnits("1000000000", "ether");
    params.onStatus("userConfirmation", "");
    console.log("contract", contract);
    const txn = await contract.approve(approvalAddress, value.toString());
    console.log("txn", txn);
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

export const calculateUserBondDetails = (params: {
  address: string;
  bond: Bond;
  provider: providers.JsonRpcProvider;
}): Thunk => {
  return async (dispatch) => {
    if (!params.address) return;
    // inverse bonds dont have user details
    if (getIsInverse({ bond: params.bond })) return;

    // Calculate bond details.
    const bondContract = contractForBond({
      bond: params.bond,
      provider: params.provider,
    });
    const reserveContract = contractForReserve({
      bond: params.bond,
      providerOrSigner: params.provider,
    });
    const bondDetails = await bondContract.bondInfo(params.address);
    const interestDue = bondDetails[0];
    const bondMaturationBlock = +bondDetails[1] + +bondDetails[2];
    const pendingPayout = await bondContract.pendingPayoutFor(params.address);
    const allowance = await reserveContract.allowance(
      params.address,
      getBondAddress({ bond: params.bond })
    );
    const balance = ethers.utils.formatUnits(
      await reserveContract.balanceOf(params.address),
      "ether"
    );

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
  if (params.bond === "inverse_usdc") {
    try {
      console.log("params.value", params.value);
      const marketId = 2;
      const acceptedSlippage = params.slippage / 100 || 0.02; // 2%
      const signer = params.provider.getSigner();
      const contractAddress = getBondAddress({ bond: params.bond });
      const contract = new ethers.Contract(
        contractAddress,
        KlimaProV2.abi,
        signer
      );
      const bondPrice = await contract.marketPrice(marketId);
      // const klimaMarketPriceInUSDC = getInverseKlimaUSDCPrice({provider: params.provider});
      const minAmountOut =
        bondPrice * Number(params.value) -
        bondPrice * Number(params.value) * acceptedSlippage;
      console.log("minAmountOut", minAmountOut);
      // const minAmountOut = 1000000
      params.onStatus("userConfirmation", "");
      // contract.deposit(__id, [amountIn (inKLIMA), min Amount Out (inUSDC)], [userAddress, DAOMSigAddress(0x65A5076C0BA74e5f3e069995dc3DAB9D197d995c)])
      const txn = await contract.deposit(
        marketId,
        [Number(params.value) * Math.pow(10, 9), minAmountOut],
        [params.address, "0x65A5076C0BA74e5f3e069995dc3DAB9D197d995c"]
      );
      params.onStatus("networkConfirmation", "");
      await txn.wait(1);
      params.onStatus("done", "Bond acquired successfully");
    } catch (error: any) {
      console.log(error);
      if (error.code === 4001) {
        params.onStatus("error", "userRejected");
        throw error;
      }
      params.onStatus("error");
      throw error;
    }
  } else {
    try {
      const signer = params.provider.getSigner();
      const contractAddress = getBondAddress({ bond: params.bond });
      const contract = new ethers.Contract(
        contractAddress,
        Depository.abi,
        signer
      );
      const calculatePremium = await contract.bondPrice();
      const acceptedSlippage = params.slippage / 100 || 0.02; // 2%
      const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
      const valueInWei = ethers.utils.parseUnits(params.value, "ether");
      params.onStatus("userConfirmation", "");
      const txn = await contract.deposit(
        valueInWei,
        maxPremium,
        params.address
      );
      params.onStatus("networkConfirmation", "");
      await txn.wait(1);
      params.onStatus("done", "Bond acquired successfully");
    } catch (error: any) {
      if (error.code === 4001) {
        params.onStatus("error", "userRejected");
        throw error;
      }
      params.onStatus("error");
      throw error;
    }
  }
};

export const redeemTransaction = async (params: {
  address: string;
  bond: Bond;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
  shouldAutostake: boolean;
}) => {
  try {
    const signer = params.provider.getSigner();
    const contractAddress = getBondAddress({ bond: params.bond });
    const contract = new ethers.Contract(
      contractAddress,
      Depository.abi,
      signer
    );
    params.onStatus("userConfirmation", "");
    const txn = await contract.redeem(params.address, params.shouldAutostake);
    params.onStatus("networkConfirmation", "");
    await txn.wait(1);
    params.onStatus("done", "Bond redeemed successfully");
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};
