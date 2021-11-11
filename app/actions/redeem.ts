import { ethers, providers } from "ethers";
import { OnStatusHandler } from "./utils";

import { addresses } from "@klimadao/lib/constants";
import IERC20 from "@klimadao/lib/abi/IERC20.json";
import AlphaKlimaRedeemUpgradeable from "@klimadao/lib/abi/AlphaKlimaRedeemUpgradeable.json";

export const changeApprovalTransaction = async (params: {
  provider: ethers.providers.JsonRpcProvider;
  action: "aklima" | "alklima";
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = {
      aklima: new ethers.Contract(
        addresses["mainnet"].aklima,
        IERC20.abi,
        params.provider.getSigner()
      ),
      alklima: new ethers.Contract(
        addresses["mainnet"].alklima,
        IERC20.abi,
        params.provider.getSigner()
      ),
    }[params.action];
    const approvalAddress = {
      aklima: addresses["mainnet"].aklima_migrate,
      alklima: addresses["mainnet"].alklima_migrate,
    }[params.action];
    const value = ethers.utils.parseUnits("120000000000000000000000", "wei");
    params.onStatus("userConfirmation");
    const txn = await contract.approve(approvalAddress, value.toString());
    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
    return value;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    params.onStatus("error");
    throw error;
  }
};

export const redeemTransaction = async (params: {
  action: "aklima" | "alklima";
  provider: providers.JsonRpcProvider;
  value: string;
  onStatus: OnStatusHandler;
}) => {
  try {
    const contract = {
      aklima: new ethers.Contract(
        addresses["mainnet"].aklima_migrate,
        AlphaKlimaRedeemUpgradeable.abi,
        params.provider.getSigner()
      ),
      alklima: new ethers.Contract(
        addresses["mainnet"].alklima_migrate,
        AlphaKlimaRedeemUpgradeable.abi,
        params.provider.getSigner()
      ),
    }[params.action];
    params.onStatus("userConfirmation");
    const txn = await contract.migrate(
      ethers.utils.parseUnits(params.value, "ether")
    );
    params.onStatus("networkConfirmation");
    await txn.wait(1);
    params.onStatus("done");
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("userRejected");
      throw error;
    }
    if (error.data && error.data.message) {
      alert(error.data.message);
    } else {
      alert(error.message);
    }
    params.onStatus("error");
    throw error;
  }
};
