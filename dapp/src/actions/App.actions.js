import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as sKLIMA } from "../abi/klimadao/contracts/sKlima.json";
import { abi as DistributorContract } from "../abi/DistributorContractv4.json";
import { abi as PairContract } from "../abi/PairContract.json";

// const KLIMA_ADDRESS = "0x4e78011ce80ee02d2c3e649fb657e45898257815";
const BCT_ADDRESS = "0x2f800db0fdb5223b3c3f354886d907a671414a7f";
const TREASURY_ADDRESS = "0x7Dd4f0B986F032A44F913BF92c9e8b7c17D77aD7";
// const DISTRIBUTOR_ADDRESS = "0x4cC7584C3f8FAABf734374ef129dF17c3517e9cB";
// const SKLIMA_ADDRESS = "0xb0C22d8D350C67420f06F48936654f567C73E8C8";
const BCT_USDC_POOL_ADDRESS = "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64";
const KLIMA_BCT_POOL_ADDRESS = "0x9803c7ae526049210a1725f7487af26fe2c24614";

// ether e.g. Math.pow(10, 18);
const getInteger = (num, unit = "ether") => {
  const str = ethers.utils.formatUnits(num, unit);
  return Math.floor(Number(str));
};

const getProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
};

const getOwnedBCTFromSLP = async slpAddress => {
  const contract = new ethers.Contract(slpAddress, PairContract, getProvider());
  const [token0, token1, [reserve0, reserve1], treasurySLP, totalSLP] = await Promise.all([
    contract.token0(),
    contract.token1(),
    contract.getReserves(),
    contract.balanceOf(TREASURY_ADDRESS),
    contract.totalSupply(),
  ]);
  let reserve;
  if (token0.toLowerCase() === BCT_ADDRESS.toLowerCase()) {
    reserve = reserve0;
  } else if (token1.toLowerCase() === BCT_ADDRESS.toLowerCase()) {
    reserve = reserve1;
  } else {
    throw new Error("No BCT reserve found");
  }
  const bctSupply = getInteger(reserve);
  const ownership = treasurySLP / totalSLP; // decimal (percent) e.g. 0.95999
  const bctOwned = Math.floor(bctSupply * ownership);
  return bctOwned;
};

/**
 * NakedBCT + (klimaBctReserve * klimaBctTreasuryPercent) + (bctUsdcReserve * bctUsdcTreasuryPercent)
 */
const getTreasuryBalance = async () => {
  try {
    const bctContract = new ethers.Contract(BCT_ADDRESS, ierc20Abi, getProvider());
    const nakedBCT = getInteger(await bctContract.balanceOf(TREASURY_ADDRESS));
    const bctUSDC = await getOwnedBCTFromSLP(BCT_USDC_POOL_ADDRESS);
    const bctKLIMA = await getOwnedBCTFromSLP(KLIMA_BCT_POOL_ADDRESS);
    const sum = nakedBCT + bctUSDC + bctKLIMA;
    return sum;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

const parseEther = ethers.utils.parseEther;

export const fetchAppSuccess = payload => ({
  type: Actions.FETCH_APP_SUCCESS,
  payload,
});

export const loadAppDetails =
  ({ networkID, provider, onRPCError }) =>
  async dispatch => {
    try {
      const currentBlock = await provider.getBlockNumber();

      const distributorContract = new ethers.Contract(
        addresses[networkID].DISTRIBUTOR_ADDRESS,
        DistributorContract,
        provider,
      );
      const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, provider);
      const sohmMainContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, sKLIMA, provider);

      const stakingReward = await distributorContract.nextRewardAt(5000);
      const circSupply = await sohmMainContract.circulatingSupply();
      const stakingRebase = stakingReward / circSupply;
      const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
      const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3);
      const currentIndex = await sohmContract.balanceOf("0x693aD12DbA5F6E07dE86FaA21098B691F60A1BEa");
      const treasuryBalance = await getTreasuryBalance();
      return dispatch(
        fetchAppSuccess({
          currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
          currentBlock,
          fiveDayRate,
          stakingAPY,
          stakingRebase,
          currentBlock,
          treasuryBalance,
        }),
      );
    } catch (error) {
      if (error.message && error.message.includes("Non-200 status code")) {
        onRPCError();
      }
    }
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
