import { AppNotificationStatus, TxnStatus } from "state/app";
import { t } from "@lingui/macro";
import { Domain } from "state/user";
import { Contract, ethers } from "ethers";
export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

export const getStatusMessage = (status: AppNotificationStatus) => {
  const { statusType, message } = status;
  if (statusType === "error" && message) {
    if (message === "userRejected")
      return t({
        id: "status.user_rejected",
        message: "You chose to reject the transaction",
      });
    return message;
  } else if (statusType === "error") {
    return t({
      id: "status.error",
      message: "❌ Error: something went wrong...",
    });
  } else if (statusType === "done") {
    return t({ id: "status.done", message: "Transaction complete." });
  } else if (statusType === "userConfirmation") {
    return t({
      id: "status.user_confirmation",
      message: "Please click 'confirm' in your wallet to continue.",
    });
  } else if (statusType === "networkConfirmation") {
    return t({
      id: "status.network_confirmation",
      message: "Transaction initiated. Waiting for network confirmation.",
    });
  }
  return null;
};

type DefaultDomainData = {
  name: string;
  description: string;
  image: string;
};

export const getKNS = async (params: {
  address: string;
  contract: Contract;
}): Promise<Domain | null> => {
  try {
    // const domainName = await params.contract.defaultNames(params.address);
    // if (!domainName) return null;
    const domainName = await params.contract.defaultNames(
      "0x293Ed38530005620e4B28600f196a97E1125dAAc".toLowerCase()
    );

    const domainData = await params.contract.getDomainData(domainName);
    const parsedDomainData = domainData ? JSON.parse(domainData) : null;
    const customKnsImage = parsedDomainData
      ? parsedDomainData.imgAddress
      : null;

    if (customKnsImage) {
      return {
        name: `${domainName}.klima`,
        imageUrl: customKnsImage,
      };
    } else {
      // return default domain image if custom kns profile image not set by owner
      const domainStruct = await params.contract.domains(domainName);
      const tokenURI: string = await params.contract.tokenURI(
        domainStruct.tokenId
      );
      const defaultDomainData: DefaultDomainData = await (
        await fetch(tokenURI)
      ).json();

      return {
        name: `${domainName}.klima`,
        imageUrl: defaultDomainData.image,
      };
    }
  } catch (error) {
    console.log("getKNS error", error);
    return Promise.reject(error);
  }
};

export const getENS = async (params: {
  address: string;
}): Promise<Domain | null> => {
  try {
    const ethProvider = ethers.getDefaultProvider();
    const ensDomain = await ethProvider.lookupAddress(params.address);
    const imageUrl = ensDomain ? await ethProvider.getAvatar(ensDomain) : null;

    if (ensDomain && imageUrl) {
      return {
        name: ensDomain,
        imageUrl,
      };
    }

    return null;
  } catch (error) {
    console.log("getENS error", error);
    return Promise.reject(error);
  }
};
