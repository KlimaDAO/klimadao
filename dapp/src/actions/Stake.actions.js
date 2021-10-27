import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";
import { toBuffer } from "ethereumjs-util";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as KlimaStaking } from "../abi/klimadao/contracts/KlimaStakingv2.json";
import { abi as KlimaStakingHelper } from "../abi/klimadao/contracts/KlimaStakingHelper.json";
import abi from "ethereumjs-abi";

const paymasterAddress = "0xca94abedcc18a10521ab7273b3f3d5ed28cf7b8a";

const gsnConfig = {
  paymasterAddress,
  loggerConfiguration: {
    logLevel: "debug",
    // loggerUrl: 'logger.opengsn.org',
  },
};

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

const getSignatureParameters = signature => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'));
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toNumber();
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v,
  };
};

const constructMetaTransactionMessage = (nonce, salt, functionSignature, contractAddress) => {
  return abi.soliditySHA3(
    ["uint256", "address", "uint256", "bytes"],
    [nonce, contractAddress, salt, toBuffer(functionSignature)],
  );
};

export const changeApprovalGasLess =
  ({ token, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const biconomy = new Biconomy(provider, { apiKey: "dn4WMmxh8.ba205b72-87e4-4245-aa55-374f76b17e73", debug: true });
    biconomy
      .onEvent(biconomy.READY, async () => {
        const ethersBiconomy = new ethers.providers.Web3Provider(biconomy);
        let walletProvider, walletSigner;

        // Initialize Constants
        const ohmContract = await new ethers.Contract(
          addresses[networkID].OHM_ADDRESS,
          ierc20Abi,
          biconomy.getSignerByAddress(address),
        );
        const sohmContract = await new ethers.Contract(
          addresses[networkID].SOHM_ADDRESS,
          ierc20Abi,
          biconomy.getSignerByAddress(address),
        );
        let contractInterface = new ethers.utils.Interface(ierc20Abi);

        /*
      This provider is linked to your wallet.
      If needed, substitute your wallet solution in place of window.ethereum
      */
        walletProvider = new ethers.providers.Web3Provider(window.ethereum);
        walletSigner = walletProvider.getSigner();

        let nonce = await provider.getTransactionCount(address); //BigNumber
        let functionSignature = contractInterface.encodeFunctionData("approve", [
          addresses[networkID].STAKING_ADDRESS,
          ethers.utils.parseUnits("1000000000", "gwei").toString(),
        ]);

        let messageToSign = constructMetaTransactionMessage(
          nonce,
          networkID,
          functionSignature,
          addresses[networkID].OHM_ADDRESS,
        );
        const signature = await walletSigner.signMessage(messageToSign);
        let { r, s, v } = getSignatureParameters(signature);
        let tx = ohmContract.executeMetaTransaction(address, functionSignature, r, s, v);

        await tx.wait(1);

        const stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
        const unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
        return dispatch(
          fetchStakeSuccess({
            staking: {
              ohmStake: stakeAllowance,
              ohmUnstake: unstakeAllowance,
            },
          }),
        );
      })
      .onEvent(biconomy.ERROR, (error, message) => {
        console.log("BICONOMY FAILED");
      });
  };
