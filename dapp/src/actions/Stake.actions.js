import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";
import Web3 from "web3";
import { RelayProvider } from "@opengsn/provider";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as KlimaStaking } from "../abi/klimadao/contracts/KlimaStakingv2.json";
import { abi as KlimaStakingHelper } from "../abi/klimadao/contracts/KlimaStakingHelper.json";
import abi from "ethereumjs-abi";
import {toBuffer} from "ethereumjs-util";


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

export const changeApproval =
  ({ token, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const signer = provider.getSigner();
    const ohmContract = await new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, signer);
    const sohmContract = await new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, signer);

    let stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);
    let unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    console.log("old stake Allowance: ", stakeAllowance);
    console.log("old unstake Allowance: ", unstakeAllowance);

    let approveTx;
    try {
      if (token === "ohm") {
        approveTx = await ohmContract.approve(
          addresses[networkID].STAKING_HELPER_ADDRESS,
          ethers.utils.parseUnits("1000000000", "gwei").toString(),
        );
      } else if (token === "sohm") {
        approveTx = await sohmContract.approve(
          addresses[networkID].STAKING_ADDRESS,
          ethers.utils.parseUnits("1000000000", "gwei").toString(),
        );
      }

      await approveTx.wait();
    } catch (error) {
      alert(error.message);
      return;
    }

    const newStakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);
    const newUnstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    return dispatch(
      fetchStakeSuccess({
        staking: {
          ohmStake: newStakeAllowance,
          ohmUnstake: newUnstakeAllowance,
        },
      }),
    );
  };

export const changeStake =
  ({ action, value, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const signer = provider.getSigner();


    let stakeTx;

    try {
      if (action === "stake") {
        const staking = await new ethers.Contract(addresses[networkID].STAKING_HELPER_ADDRESS, KlimaStakingHelper, signer);
        stakeTx = await staking.stake(ethers.utils.parseUnits(value, "gwei"));
        await stakeTx.wait();
      } else {
        const staking = await new ethers.Contract(addresses[networkID].STAKING_ADDRESS, KlimaStaking, signer);
        stakeTx = await staking.unstake(ethers.utils.parseUnits(value, "gwei"));
        await stakeTx.wait();
      }
    } catch (error) {
      if (error.code === -32603 && error.message.indexOf("ds-math-sub-underflow") >= 0) {
        alert("You may be trying to stake more than your balance! Error code: 32603. Message: ds-math-sub-underflow");
      } else {
        alert(error.message);
      }
      return;
    }

    const ohmContract = new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, provider);
    const ohmBalance = await ohmContract.balanceOf(address);
    const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, provider);
    const sohmBalance = await sohmContract.balanceOf(address);

    return dispatch(
      fetchStakeSuccess({
        balances: {
          ohm: ethers.utils.formatUnits(ohmBalance, "gwei"),
          sohm: ethers.utils.formatUnits(sohmBalance, "gwei"),
        },
      }),
    );
  };

//////////
/**helpers**/

const getSignatureParameters = signature => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toNumber();
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v
  };
};

const constructMetaTransactionMessage = (nonce, salt, functionSignature, contractAddress) => {
  return abi.soliditySHA3(
    ["uint256","address","uint256","bytes"],
    [nonce, contractAddress, salt, toBuffer(functionSignature)]
  );
}


export const changeApprovalGasLess =
  ({ token, provider, address, networkID }) =>
  async dispatch => {
    if (!provider) {
      alert("Please connect your wallet!");
      return;
    }

    const biconomy = new Biconomy(provider,{apiKey: "dn4WMmxh8.ba205b72-87e4-4245-aa55-374f76b17e73", debug: true});
    biconomy.onEvent(biconomy.READY, async () =>{
      const ethersBiconomy = new ethers.providers.Web3Provider(biconomy);
      let walletProvider, walletSigner;

      // Initialize Constants
      const ohmContract = await new ethers.Contract(addresses[networkID].OHM_ADDRESS, ierc20Abi, biconomy.getSignerByAddress(address));
      const sohmContract = await new ethers.Contract(addresses[networkID].SOHM_ADDRESS, ierc20Abi, biconomy.getSignerByAddress(address));
      let contractInterface = new ethers.utils.Interface(ierc20Abi);

      /*
      This provider is linked to your wallet.
      If needed, substitute your wallet solution in place of window.ethereum
      */
      walletProvider = new ethers.providers.Web3Provider(window.ethereum);
      walletSigner = walletProvider.getSigner();

      let nonce = await provider.getTransactionCount(address); //BigNumber
      let functionSignature = contractInterface.encodeFunctionData("approve", [ addresses[networkID].STAKING_ADDRESS, ethers.utils.parseUnits("1000000000", "gwei").toString()]);

      let messageToSign = constructMetaTransactionMessage(nonce,networkID ,functionSignature, addresses[networkID].OHM_ADDRESS);
      const signature = await walletSigner.signMessage(messageToSign);
      let { r, s, v } = getSignatureParameters(signature);
      let tx = ohmContract.executeMetaTransaction(address,
        functionSignature, r, s, v);

      await tx.wait(1);
      console.log("Transaction hash : ", tx.hash);
      // const signer = provider.getSigner();

      //const userAddr = gsnProvider.origProvider.selectedAddress;
      //const ohmContract = await new gsnWeb3.eth.Contract(ierc20Abi, addresses[networkID].OHM_ADDRESS);
      //const sohmContract = await new gsnWeb3.eth.Contract(ierc20Abi, addresses[networkID].SOHM_ADDRESS);


      let stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
      let unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
      //let stakeAllowance = await ohmContract.methods.allowance(address, addresses[networkID].STAKING_ADDRESS).call();
      //let unstakeAllowance = await sohmContract.methods.allowance(address, addresses[networkID].STAKING_ADDRESS).call();
      console.log("old stake Allowance: ", stakeAllowance);
      console.log("old unstake Allowance: ", unstakeAllowance);

      stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
      unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
      console.log("new stake Allowance: ", stakeAllowance);
      console.log("new unstake Allowance: ", unstakeAllowance);
      return dispatch(
        fetchStakeSuccess({
          staking: {
            ohmStake: stakeAllowance,
            ohmUnstake: unstakeAllowance,
          },
        }),
      );
    }).onEvent(biconomy.ERROR, (error,message) => {
      console.log("BICONOMY FAILED")
    });

  };
