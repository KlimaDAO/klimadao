import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as OHMPreSale } from "../abi/OHMPreSale.json";
import { abi as OlympusStaking } from "../abi/OlympusStaking.json";
import { abi as MigrateToOHM } from "../abi/MigrateToOHM.json";
import { abi as sOHM } from "../abi/sOHM.json";
import { abi as sKLIMA } from "../abi/klimadao/contracts/sKlima.json";
import { abi as DistributorContract } from "../abi/DistributorContractv4.json";
import { abi as BondContract } from "../abi/BondContract.json";
import { abi as DaiBondContract } from "../abi/DaiBondContract.json";
import { abi as PairContract } from "../abi/PairContract.json";
import { abi as CirculatingSupplyContract } from "../abi/klimadao/contracts/KlimaCirculatingSupplyContract.json";
import { abi as KlimaStaking } from "../abi/klimadao/contracts/KlimaStakingv2.json";

const parseEther = ethers.utils.parseEther;

export const fetchAppSuccess = payload => ({
  type: Actions.FETCH_APP_SUCCESS,
  payload,
});

export const loadAppDetails =
  ({ networkID, provider }) =>
  async dispatch => {
    const currentBlock = await provider.getBlockNumber();

    const distributorContract = new ethers.Contract(
      addresses[networkID].DISTRIBUTOR_ADDRESS,
      DistributorContract,
      provider,
    );
    const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, provider);
    const sohmMainContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, sKLIMA, provider);

    // Calculating staking
    let stakingReward = 0;
    try {
      stakingReward = await distributorContract.nextRewardAt(5000);
    } catch (error) {
      console.warn("Error caught:", error.message);
    }

    let circSupply = 0;
    try {
      circSupply = await sohmMainContract.circulatingSupply();
    } catch (error) {
      console.warn("Error caught: ", error.message);
    }

    const stakingRebase = stakingReward / circSupply;
    // console.log("Rebase: ", stakingRebase)
    const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
    const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3);
    // console.log("APY : " , stakingAPY)

    // Calculate index
    // INDEX ACCOUNT IS SET ON MUMBAI / MATIC
    let currentIndex = 0;
    try {
      currentIndex = await sohmContract.balanceOf("0x693aD12DbA5F6E07dE86FaA21098B691F60A1BEa");
    } catch (error) {
      console.warn("Error caught: ", error.message);
    }

    return dispatch(
      fetchAppSuccess({
        currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
        currentBlock,
        fiveDayRate,
        stakingAPY,
        stakingRebase,
        currentBlock,
      }),
    );
  };

export const getMarketPrice =
  ({ networkID, provider }) =>
  async dispatch => {
    const pairContract = new ethers.Contract(addresses[networkID].LP_ADDRESS, PairContract, provider);
    let reserves = 0;
    try {
      reserves = await pairContract.getReserves();
    } catch (error) {
      console.warn("Error caught: ", error.message);
    }

    const marketPrice = reserves[1] / reserves[0];

    return dispatch(fetchAppSuccess({ marketPrice: marketPrice / Math.pow(10, 9) }));
  };

export const getTokenSupply =
  ({ networkID, provider }) =>
  async dispatch => {
    const ohmContract = new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, provider);
    const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, sKLIMA, provider);

    let ohmCircSupply = 0;
    try {
      ohmCircSupply = await sohmContract.circulatingSupply();
    } catch (error) {
      console.warn("Error caught: ", error.message);
    }
    let ohmTotalSupply = 0;
    try {
      ohmTotalSupply = await ohmContract.totalSupply();
    } catch (error) {
      console.warn("Error caught: ", error.message);
    }

    return dispatch(
      fetchAppSuccess({
        circulating: ohmCircSupply,
        total: ohmTotalSupply,
      }),
    );
  };
