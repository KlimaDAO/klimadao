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
  // returns klimas per dollar
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

// v2 bonds have multiple markets within them, we know that inverse USDC bonds is this one:
// in a later version we could clean this up by querying for "live markets"
const INVERSE_USDC_MARKET_ID = 4;

export const calcBondDetails = (params: {
  bond: Bond;
  value?: string;
  provider: providers.JsonRpcProvider;
  address?: string;
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

    // returns the going rate on the relevant LP by dividing one side over the other
    const marketPrice = await getMarketPrice({
      provider: provider,
    });
    let terms;
    let maxBondPrice;
    let debtRatio;
    let bondPrice;
    let premium = 0;
    let capacity = 0;
    if (getIsInverse({ bond: params.bond })) {
      // returns klimas-per-dollar with 6 decimals
      bondPrice = await bondContract.marketPrice(INVERSE_USDC_MARKET_ID);

      // profit is the bond price in klima minus the LP market price in klima
      const profit = marketPrice - Number(formatUnits(bondPrice, 6));
      // premium is the percent "bonus" over the LP market price
      premium = profit / marketPrice;
      terms = await bondContract.terms(INVERSE_USDC_MARKET_ID);
      const marketData = await bondContract.markets(INVERSE_USDC_MARKET_ID);
      capacity = Number(formatUnits(marketData.capacity, 6));
      // 6 decimals
      maxBondPrice = marketData.maxPayout;
    } else {
      terms = await bondContract.terms();
      maxBondPrice = await bondContract.maxPayout();
      debtRatio = await bondContract.debtRatio();
      bondPrice = await bondContract.bondPriceInUSD();
    }

    let bondQuote;
    if (!Number(params.value)) {
      bondQuote = "0";
    } else if (
      params.bond === "bct" ||
      params.bond === "mco2" ||
      params.bond === "nbo" ||
      params.bond === "ubo"
    ) {
      bondQuote = formatUnits(await bondContract.payoutFor(amountInWei), 18);
    } else if (params.bond === "inverse_usdc") {
      const quote = Number(params.value) / Number(formatUnits(bondPrice, 6));
      bondQuote = quote.toString();
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

    let bondDiscount: number;
    if (params.bond === "inverse_usdc") {
      // var name is misleading, in the inverse bond UI we call it premium. multiply by -1 because inverse "discount" is backwards
      bondDiscount = premium;
    } else {
      bondDiscount =
        (marketPrice * Math.pow(10, 18) - decimalAdjustedBondPrice) /
        decimalAdjustedBondPrice;
    }

    if (getIsInverse({ bond: params.bond })) {
      dispatch(
        setBond({
          bond: params.bond,
          bondDiscount: bondDiscount * 100,
          bondQuote,
          vestingTerm: 0,
          maxBondPrice: formatUnits(maxBondPrice, 6),
          bondPrice: formatUnits(bondPrice, 6),
          marketPrice: marketPrice.toString(),
          capacity,
        })
      );
    } else {
      dispatch(
        setBond({
          bond: params.bond,
          bondDiscount: bondDiscount * 100,
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
    const txn = await contract.approve(approvalAddress, value.toString());
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
    const bondContract = contractForBond({
      bond: params.bond,
      provider: params.provider,
    });
    const reserveContract = contractForReserve({
      bond: params.bond,
      providerOrSigner: params.provider,
    });
    const klimaContract = new ethers.Contract(
      addresses["mainnet"].klima,
      IERC20.abi,
      params.provider
    );
    // inverse bonds dont have user details
    if (getIsInverse({ bond: params.bond })) {
      const inverseAllowance = await klimaContract.allowance(
        params.address,
        getBondAddress({ bond: params.bond })
      );
      dispatch(
        setBondAllowance({
          [params.bond]: formatUnits(inverseAllowance, 9),
        })
      );
      return;
    }

    // Calculate bond details.
    const bondDetails = await bondContract.bondInfo(params.address);
    const interestDue = bondDetails[0];
    const bondMaturationBlock = +bondDetails[1] + +bondDetails[2];
    const pendingPayout = await bondContract.pendingPayoutFor(params.address);
    const allowance = await reserveContract.allowance(
      params.address,
      getBondAddress({ bond: params.bond })
    );
    // TODO: we can just use the state.user.balance for these values and eliminate this code.
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
  bond: Bond;
  provider: providers.JsonRpcProvider;
  slippage: number;
  onStatus: OnStatusHandler;
}) => {
  if (params.bond === "inverse_usdc") {
    try {
      const acceptedSlippage = 0.0; // 20% instead of 2% bc 2% not working. 20% also not working lol
      const signer = params.provider.getSigner();
      const contractAddress = getBondAddress({ bond: params.bond });
      const contract = new ethers.Contract(
        contractAddress,
        KlimaProV2.abi,
        signer
      );
      const bondPrice = await contract.marketPrice(INVERSE_USDC_MARKET_ID);
      // minimum amount to be paid out in usdc. need bondPrice in usdc
      const minAmountOut =
        (1 / Number(formatUnits(bondPrice, 6))) * Number(params.value) -
        (1 / Number(formatUnits(bondPrice, 6))) *
          Number(params.value) *
          acceptedSlippage;
      const formattedMinAmountOut = ethers.utils.parseUnits(
        Number(minAmountOut.toFixed(6)).toString(),
        "mwei"
      );
      // TODO add "remaining cpacity" line in view
      // TODO check "capacity" in markets call to see if there is enough usdc in bond. returns usdc
      params.onStatus("userConfirmation", "");
      const address = await signer.getAddress();
      const formattedValue = ethers.utils.parseUnits(params.value, "gwei");
      // contract.deposit(__id, [amountIn (inKLIMA), min Amount Out (inUSDC)], [userAddress, DAOMSigAddress(0x65A5076C0BA74e5f3e069995dc3DAB9D197d995c)])
      const txn = await contract.deposit(
        ethers.BigNumber.from(INVERSE_USDC_MARKET_ID),
        [formattedValue, formattedMinAmountOut],
        [address, "0x65A5076C0BA74e5f3e069995dc3DAB9D197d995c"]
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
      const address = await signer.getAddress();
      params.onStatus("userConfirmation", "");
      const txn = await contract.deposit(valueInWei, maxPremium, address);
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
