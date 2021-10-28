import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as RedeemUpgradeable } from "../abi/klimadao/contracts/AlphaKlimaRedeemUpgradeable.json";

export const fetchMigrateSuccess = payload => ({
  type: Actions.FETCH_MIGRATE_SUCCESS,
  payload,
});
export const decrementAklima = payload => ({
  type: Actions.DECREMENT_AKLIMA,
  payload,
});
export const decrementAlklima = payload => ({
  type: Actions.DECREMENT_ALKLIMA,
  payload,
});
export const incrementAklimaApproval = payload => ({
  type: Actions.INCREMENT_AKLIMA_APPROVAL,
  payload,
});
export const incrementAlklimaApproval = payload => ({
  type: Actions.INCREMENT_ALKLIMA_APPROVAL,
  payload,
});

export const changeApprovalTransaction = async ({ provider, networkID, action, onStatus }) => {
  try {
    const contract = {
      aKLIMA: new ethers.Contract(addresses[networkID].AKLIMA_ADDRESS, ierc20Abi, provider.getSigner()),
      alKLIMA: new ethers.Contract(addresses[networkID].ALKLIMA_ADDRESS, ierc20Abi, provider.getSigner()),
    }[action];
    const approvalAddress = {
      aKLIMA: addresses[networkID].AMIGRATE_ADDRESS,
      alKLIMA: addresses[networkID].ALMIGRATE_ADDRESS,
    }[action];
    const value = ethers.utils.parseUnits("120000000000000000000000", "wei");
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

export const redeemTransaction = async ({ action, provider, networkID, value, onStatus }) => {
  try {
    const contract = {
      aKLIMA: new ethers.Contract(addresses[networkID].AMIGRATE_ADDRESS, RedeemUpgradeable, provider.getSigner()),
      alKLIMA: new ethers.Contract(addresses[networkID].ALMIGRATE_ADDRESS, RedeemUpgradeable, provider.getSigner()),
    }[action];
    onStatus("userConfirmation");
    const txn = await contract.migrate(ethers.utils.parseUnits(value, "ether"));
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
