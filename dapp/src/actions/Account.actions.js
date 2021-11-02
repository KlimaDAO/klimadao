import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as ExercisePKlima } from "../abi/klimadao/contracts/ExercisepKLIMA.json";
import { abi as DistributorContract } from "../abi/DistributorContractv4.json";
import { trimStringDecimals } from "../helpers";

export const fetchAccountSuccess = payload => ({
  type: Actions.FETCH_ACCOUNT_SUCCESS,
  payload,
});

export const loadAccountDetails =
  ({ networkID, provider, address, onRPCError }) =>
  async dispatch => {
    let ohmContract;
    let sohmContract;
    let aklimaContract;
    let alklimaContract;
    let pKlimaContract;
    let pExerciseContract;
    let distributorContract;
    let bctContract;
    let bctBalance = 0;
    let pKlimaBalance = 0;
    let ohmBalance = 0;
    let sohmBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;
    let aKLIMABalance = 0;
    let alKLIMABalance = 0;
    let aKlimaAllowance = 0;
    let alKlimaAllowance = 0;
    let pKlimaAllowance = 0;
    let bctAllowance = 0;
    let rebaseBlock = 0;
    let pklimaTerms = {
      percent: 0,
      claimed: 0,
      max: 0,
    };
    let pklimaVestable = 0;
    try {
      const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, provider);
      const daiBalance = await daiContract.balanceOf(address);

      if (addresses[networkID].OHM_ADDRESS) {
        ohmContract = new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, provider);
        ohmBalance = await ohmContract.balanceOf(address);
        stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);
        console.log("KLIMA Allowance (stake allowance): ", stakeAllowance);
      }

      if (addresses[networkID].SOHM_ADDRESS) {
        sohmContract = await new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, provider);
        sohmBalance = await sohmContract.balanceOf(address);
        unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
        console.log("sKLIMA allowance (unstake allowance): ", unstakeAllowance);
      }

      if (addresses[networkID].AKLIMA_ADDRESS) {
        aklimaContract = new ethers.Contract(addresses[networkID].AKLIMA_ADDRESS, ierc20Abi, provider);
        aKLIMABalance = await aklimaContract.balanceOf(address);
        aKlimaAllowance = await aklimaContract.allowance(address, addresses[networkID].AMIGRATE_ADDRESS);
        console.log("aKLIMA Allowance: ", aKlimaAllowance);
      }

      if (addresses[networkID].ALKLIMA_ADDRESS) {
        alklimaContract = new ethers.Contract(addresses[networkID].ALKLIMA_ADDRESS, ierc20Abi, provider);
        alKLIMABalance = await alklimaContract.balanceOf(address);
        alKlimaAllowance = await alklimaContract.allowance(address, addresses[networkID].ALMIGRATE_ADDRESS);
        console.log("alKLIMA Allowance: ", alKlimaAllowance);
      }

      if (addresses[networkID].PKLIMA_ADDRESS) {
        pKlimaContract = new ethers.Contract(addresses[networkID].PKLIMA_ADDRESS, ierc20Abi, provider);
        pKlimaBalance = await pKlimaContract.balanceOf(address);
        pKlimaAllowance = await pKlimaContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);
        console.log("pKLIMA Allowance: ", pKlimaAllowance);
        pExerciseContract = new ethers.Contract(addresses[networkID].PEXERCISE_ADDRESS, ExercisePKlima, provider);
        const fetchedTerms = await pExerciseContract.terms(address);
        pklimaTerms = {
          claimed: ethers.utils.formatEther(fetchedTerms.claimed),
          max: ethers.utils.formatEther(fetchedTerms.max),
          percent: fetchedTerms.percent,
        };
        const fetchedVestable = await pExerciseContract.redeemableFor(address);
        // redeemableFor() returns 18 decimals, but KLIMA token only supports 9
        pklimaVestable = trimStringDecimals(ethers.utils.formatEther(fetchedVestable), 9);
      }

      if (addresses[networkID].DAI_ADDRESS) {
        bctContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, provider);
        bctBalance = await bctContract.balanceOf(address);
        bctAllowance = await bctContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);
        console.log("pklima BCT Allowance: ", bctAllowance);
      }
      if (addresses[networkID].DISTRIBUTOR_ADDRESS) {
        distributorContract = new ethers.Contract(
          addresses[networkID].DISTRIBUTOR_ADDRESS,
          DistributorContract,
          provider,
        );
        rebaseBlock = await distributorContract.nextEpochBlock();
        console.log(`Next rebase block: ${rebaseBlock}`);
      }

      return dispatch(
        fetchAccountSuccess({
          balances: {
            dai: ethers.utils.formatEther(daiBalance),
            ohm: ethers.utils.formatUnits(ohmBalance, "gwei"),
            sohm: ethers.utils.formatUnits(sohmBalance, "gwei"),
            aKLIMA: ethers.utils.formatEther(aKLIMABalance),
            alKLIMA: ethers.utils.formatEther(alKLIMABalance),
            pKLIMA: ethers.utils.formatEther(pKlimaBalance),
            bctBalance: ethers.utils.formatEther(bctBalance),
          },
          staking: {
            ohmStake: stakeAllowance,
            ohmUnstake: unstakeAllowance,
            rebaseBlock: rebaseBlock,
          },
          migrate: {
            aKlimaAllowance,
            alKlimaAllowance,
          },
          exercise: {
            pExercise: pKlimaAllowance,
            bctExercise: bctAllowance,
            terms: pklimaTerms,
            pklimaVestable,
          },
        }),
      );
    } catch (error) {
      if (error.message && error.message.includes("Non-200 status code")) {
        onRPCError();
      }
    }
  };
