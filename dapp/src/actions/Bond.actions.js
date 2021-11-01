import { ethers } from "ethers";
import { getMarketPrice, contractForBond, contractForReserve } from "../helpers";
import { addresses, Actions, BONDS } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as BondOhmDaiContract } from "../abi/klimadao/contracts/KlimaBondDepository_Regular.json";
import { abi as BondDaiContract } from "../abi/klimadao/contracts/KlimaBondDepository_Regular.json";
import { abi as ReserveOhmDaiContract } from "../abi/reserves/OhmDai.json";
import { abi as BondOhmDaiCalcContract } from "../abi/bonds/OhmDaiCalcContract.json";

export const DEFAULT_QUOTE_SLP = "0.001"; // Use a realistic SLP ownership so we have a quote before the user inputs any value

export const fetchBondSuccess = payload => ({
  type: Actions.FETCH_BOND_SUCCESS,
  payload,
});

export const incrementBondApproval = ({ bond, allowance }) => ({
  type: Actions.INCREMENT_BOND_APPROVAL,
  payload: {
    bond,
    allowance,
  },
});

export const decrementBondRedeem = ({ bond, value }) => ({
  type: Actions.DECREMENT_BOND_REDEEM,
  payload: {
    bond,
    value,
  },
});

export const updateBond = ({ bond, data }) => ({
  type: Actions.UPDATE_BOND,
  payload: {
    bond,
    data,
  },
});

export const changeApprovalTransaction = async ({ provider, networkID, bond, onStatus }) => {
  try {
    const signer = provider.getSigner();
    const contract = {
      klima_bct_lp: new ethers.Contract(addresses[networkID].RESERVES.OHM_DAI, ReserveOhmDaiContract, signer),
      bct: new ethers.Contract(addresses[networkID].RESERVES.DAI, ierc20Abi, signer),
      bct_usdc_lp: new ethers.Contract(addresses[networkID].RESERVES.BCT_USDC, ReserveOhmDaiContract, signer),
    }[bond];
    const approvalAddress = {
      klima_bct_lp: addresses[networkID].BONDS.OHM_DAI,
      bct: addresses[networkID].BONDS.DAI,
      bct_usdc_lp: addresses[networkID].BONDS.BCT_USDC,
    }[bond];
    const value = ethers.utils.parseUnits("1000000000", "ether");
    onStatus("userConfirmation");
    const txn = await contract.approve(approvalAddress, value.toString());
    onStatus("networkConfirmation");
    await txn.wait(1);
    onStatus("done");
    return value;
  } catch (error) {
    if (error.code === 4001) {
      onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    onStatus("error");
    throw error;
  }
};

export const calcBondDetails =
  ({ bond, value, provider, networkID }) =>
  async dispatch => {
    let amountInWei;
    if (!value || value === "") {
      amountInWei = ethers.utils.parseEther(DEFAULT_QUOTE_SLP);
    } else {
      amountInWei = ethers.utils.parseEther(value);
    }

    // const vestingTerm = VESTING_TERM; // hardcoded for now
    let bondDiscount;
    let valuation;
    let bondQuote;
    const bondContract = contractForBond({ bond, networkID, provider });
    const marketPrice = await getMarketPrice({ networkID, provider });
    const terms = await bondContract.terms();
    const maxBondPrice = await bondContract.maxPayout();
    const debtRatio = await bondContract.debtRatio();
    const bondPrice = await bondContract.bondPriceInUSD();
    if (bond === BONDS.ohm_dai) {
      const bondCalcContract = new ethers.Contract(
        addresses[networkID].BONDS.OHM_DAI_CALC,
        BondOhmDaiCalcContract,
        provider,
      );
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = assume 1:1 backing
      valuation = await bondCalcContract.valuation(addresses[networkID].LP_ADDRESS, amountInWei);
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote /= Math.pow(10, 9);
    } else if (bond === BONDS.dai) {
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = DAI
      bondQuote = await bondContract.payoutFor(amountInWei);
      bondQuote /= Math.pow(10, 18);
    } else if (bond === BONDS.bct_usdc) {
      const bondCalcContract = new ethers.Contract(
        addresses[networkID].BONDS.OHM_DAI_CALC,
        BondOhmDaiCalcContract,
        provider,
      );
      bondDiscount = (marketPrice * Math.pow(10, 9) - bondPrice) / bondPrice; // 1 - bondPrice / (marketPrice * Math.pow(10, 9));

      // RFV = assume 1:1 backing
      valuation = await bondCalcContract.valuation(addresses[networkID].RESERVES.BCT_USDC, amountInWei);
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote /= Math.pow(10, 9);
    }

    return dispatch(
      fetchBondSuccess({
        bond,
        bondDiscount,
        debtRatio,
        bondQuote,
        vestingTerm: parseInt(terms.vestingTerm),
        maxBondPrice: maxBondPrice / Math.pow(10, 9),
        bondPrice: bondPrice / Math.pow(10, 18),
        marketPrice: marketPrice / Math.pow(10, 9),
      }),
    );
  };

export const calculateUserBondDetails =
  ({ address, bond, networkID, provider }) =>
  async dispatch => {
    if (!address) return;

    // Calculate bond details.
    const bondContract = contractForBond({ bond, provider, networkID });
    const reserveContract = contractForReserve({ bond, networkID, provider });
    let interestDue;
    let pendingPayout;
    let bondMaturationBlock;
    if (bond === BONDS.dai_v1) {
      const bondDetails = await bondContract.depositorInfo(address);
      interestDue = bondDetails[1];
      bondMaturationBlock = +bondDetails[3] + +bondDetails[2];
      pendingPayout = await bondContract.calculatePendingPayout(address);
    } else {
      let bondDetails = [0, 0, 0, 0];
      try {
        bondDetails = await bondContract.bondInfo(address);
      } catch (e) {
        console.log(e);
      }
      interestDue = bondDetails[0];
      bondMaturationBlock = +bondDetails[1] + +bondDetails[2];
      pendingPayout = await bondContract.pendingPayoutFor(address);
    }

    let allowance;
    let balance;
    if (bond === "klima_bct_lp") {
      allowance = await reserveContract.allowance(address, addresses[networkID].BONDS.OHM_DAI);

      balance = await reserveContract.balanceOf(address);
      balance = ethers.utils.formatUnits(balance, "ether");
    } else if (bond === BONDS.dai) {
      allowance = await reserveContract.allowance(address, addresses[networkID].BONDS.DAI);

      balance = await reserveContract.balanceOf(address);
      balance = ethers.utils.formatEther(balance);
    } else if (bond === "bct_usdc_lp") {
      allowance = await reserveContract.allowance(address, addresses[networkID].BONDS.BCT_USDC);

      balance = await reserveContract.balanceOf(address);
      balance = ethers.utils.formatEther(balance);
    }

    return dispatch(
      fetchBondSuccess({
        bond,
        allowance,
        balance,
        interestDue: ethers.utils.formatUnits(interestDue, "gwei"),
        bondMaturationBlock,
        pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
      }),
    );
  };

export const bondTransaction = async ({ value, address, bond, networkID, provider, slippage, onStatus }) => {
  try {
    const signer = provider.getSigner();
    const contract = {
      klima_bct_lp: new ethers.Contract(addresses[networkID].BONDS.OHM_DAI, BondOhmDaiContract, signer),
      bct: new ethers.Contract(addresses[networkID].BONDS.DAI, BondDaiContract, signer),
      bct_usdc_lp: new ethers.Contract(addresses[networkID].BONDS.BCT_USDC, BondOhmDaiContract, signer),
    }[bond];
    const calculatePremium = await contract.bondPrice();
    const acceptedSlippage = slippage / 100 || 0.02; // 2%
    const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
    const valueInWei = ethers.utils.parseUnits(value.toString(), "ether");
    onStatus("userConfirmation");
    const txn = await contract.deposit(valueInWei, maxPremium, address);
    onStatus("networkConfirmation");
    await txn.wait(1);
    onStatus("done");
  } catch (error) {
    if (error.code === 4001) {
      onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    onStatus("error");
    throw error;
  }
};

export const redeemTransaction = async ({ address, bond, networkID, provider, onStatus }) => {
  try {
    const autostake = false;
    const signer = provider.getSigner();
    const contract = {
      klima_bct_lp: new ethers.Contract(addresses[networkID].BONDS.OHM_DAI, BondOhmDaiContract, signer),
      bct: new ethers.Contract(addresses[networkID].BONDS.DAI, BondDaiContract, signer),
      bct_usdc_lp: new ethers.Contract(addresses[networkID].BONDS.BCT_USDC, BondOhmDaiContract, signer),
    }[bond];
    onStatus("userConfirmation");
    const txn = await contract.redeem(address, autostake);
    onStatus("networkConfirmation");
    await txn.wait(1);
    onStatus("done");
  } catch (error) {
    if (error.code === 4001) {
      onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    onStatus("error");
    throw error;
  }
};
