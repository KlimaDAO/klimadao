import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as ExercisePKlima } from "../abi/klimadao/contracts/ExercisepKLIMA.json";

export const fetchExerciseSuccess = payload => ({
  type: Actions.FETCH_EXERCISE_SUCCESS,
  payload,
});

export const decrementPklima = payload => ({
  type: Actions.DECREMENT_PKLIMA,
  payload,
});

export const incrementPklimaApproval = payload => ({
  type: Actions.INCREMENT_PKLIMA_APPROVAL,
  payload,
});

export const incrementBctApproval = payload => ({
  type: Actions.INCREMENT_BCT_APPROVAL,
  payload,
});

export const changeApproval =
  ({ token, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const signer = provider.getSigner();
    const ohmContract = await new ethers.Contract(addresses[networkID].PKLIMA_ADDRESS, ierc20Abi, signer);
    const sohmContract = await new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, signer);

    let stakeAllowance = await ohmContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);
    let unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);

    let approveTx;
    try {
      if (token === "pklima") {
        approveTx = await ohmContract.approve(
          addresses[networkID].PEXERCISE_ADDRESS,
          ethers.utils.parseUnits("1000000000000000000000000000", "wei").toString(),
        );
      } else if (token === "bct") {
        approveTx = await sohmContract.approve(
          addresses[networkID].PEXERCISE_ADDRESS,
          ethers.utils.parseUnits("1000000000000000000000000000", "wei").toString(),
        );
      }

      await approveTx.wait(1);
    } catch (error) {
      alert(error.message);
      return;
    }

    stakeAllowance = await ohmContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);
    unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].PEXERCISE_ADDRESS);
    return dispatch(
      fetchExerciseSuccess({
        exercise: {
          pExercise: stakeAllowance,
          bctExercise: unstakeAllowance,
        },
      }),
    );
  };

export const changeApprovalTransaction = async ({ provider, networkID, onStatus, action }) => {
  try {
    const contract = {
      pklima: new ethers.Contract(addresses[networkID].PKLIMA_ADDRESS, ierc20Abi, provider.getSigner()),
      bct: new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, provider.getSigner()),
    }[action];
    const value = ethers.utils.parseUnits("1000000000000000000000000000", "wei"); // BigNumber
    onStatus("userConfirmation");
    const txn = await contract.approve(addresses[networkID].PEXERCISE_ADDRESS, value.toString());
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

export const exerciseTransaction = async ({ value, provider, networkID, onStatus }) => {
  try {
    const contract = new ethers.Contract(addresses[networkID].PEXERCISE_ADDRESS, ExercisePKlima, provider.getSigner());
    onStatus("userConfirmation");
    const txn = await contract.exercise(ethers.utils.parseUnits(value, "ether"));
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

export const runExercise =
  ({ action, value, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const signer = provider.getSigner();
    let redeem;
    if (action === "stake") {
      redeem = await new ethers.Contract(addresses[networkID].PEXERCISE_ADDRESS, ExercisePKlima, signer);
    } else {
      redeem = await new ethers.Contract(addresses[networkID].PEXERCISE_ADDRESS, ExercisePKlima, signer);
    }

    let redeemTx;

    try {
      if (action === "stake") {
        redeemTx = await redeem.exercise(ethers.utils.parseUnits(value, "ether"));
        await redeemTx.wait(1);
      } else {
        redeemTx = await redeem.exercise(ethers.utils.parseUnits(value, "ether"));
        await redeemTx.wait(1);
      }
    } catch (error) {
      if (error.code === -32603 && error.message.indexOf("ds-math-sub-underflow") >= 0) {
        alert("You may be trying to stake more than your balance! Error code: 32603. Message: ds-math-sub-underflow");
      } else {
        if (error.data && error.data.message) {
          alert(error.data.message);
        }
        alert(error.message);
      }
      return;
    }

    const ohmContract = new ethers.Contract(addresses[networkID].PKLIMA_ADDRESS, ierc20Abi, provider);
    const ohmBalance = await ohmContract.balanceOf(address);
    const sohmContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, provider);
    const sohmBalance = await sohmContract.balanceOf(address);
    const pExerciseContract = new ethers.Contract(addresses[networkID].PEXERCISE_ADDRESS, ExercisePKlima, provider);
    const pklimaVestable = ethers.utils.formatEther(await pExerciseContract.redeemableFor(address));
    return dispatch(
      fetchExerciseSuccess({
        balances: {
          pKLIMA: ethers.utils.formatEther(ohmBalance),
          bctBalance: ethers.utils.formatEther(sohmBalance),
        },
        exercise: {
          pklimaVestable,
        },
      }),
    );
  };
