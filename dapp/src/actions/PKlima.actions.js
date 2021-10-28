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
