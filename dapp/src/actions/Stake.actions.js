import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as KlimaStaking } from "../abi/klimadao/contracts/KlimaStakingv2.json";
import { abi as KlimaStakingHelper } from "../abi/klimadao/contracts/KlimaStakingHelper.json";

export const fetchStakeSuccess = payload => ({
  type: Actions.FETCH_STAKE_SUCCESS,
  payload,
});

export const incrementStake = payload => ({
  type: Actions.INCREMENT_STAKE,
  payload,
});
export const decrementStake = payload => ({
  type: Actions.DECREMENT_STAKE,
  payload,
});
export const incrementStakeApproval = payload => ({
  type: Actions.INCREMENT_STAKE_APPROVAL,
  payload,
});
export const incrementUnstakeApproval = payload => ({
  type: Actions.INCREMENT_UNSTAKE_APPROVAL,
  payload,
});

export const changeApprovalTransaction = async ({ provider, networkID, onStatus, action }) => {
  try {
    const contract = {
      stake: new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, provider.getSigner()),
      unstake: new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, provider.getSigner()),
    }[action];
    const address = {
      stake: addresses[networkID].STAKING_HELPER_ADDRESS,
      unstake: addresses[networkID].STAKING_ADDRESS,
    }[action];
    const value = ethers.utils.parseUnits("1000000000", "gwei"); //bignumber
    onStatus("userConfirmation");
    const txn = await contract.approve(address, value.toString());
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

export const changeStakeTransaction = async ({ value, provider, networkID, onStatus, action }) => {
  try {
    const parsedValue = ethers.utils.parseUnits(value, "gwei");
    const contract = {
      stake: new ethers.Contract(addresses[networkID].STAKING_HELPER_ADDRESS, KlimaStakingHelper, provider.getSigner()),
      unstake: new ethers.Contract(addresses[networkID].STAKING_ADDRESS, KlimaStaking, provider.getSigner()),
    }[action];
    onStatus("userConfirmation");
    const txn = action === "stake" ? await contract.stake(parsedValue) : await contract.unstake(parsedValue, true); // always trigger rebase because gas is cheap
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
