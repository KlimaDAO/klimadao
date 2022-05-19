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
export const getKns = async (params: {
  address: string;
  contract: Contract;
}): Promise<Domain | null> => {
  const domain: any = {};
  try {
    const domainName = await params.contract.defaultNames(params.address);
    console.log(domainName);
    // what do we do if this is false?
    const isNameVerified =
      (await params.contract.getDomainHolder(domainName)) === params.address;
    if (!isNameVerified || !domainName) return null;
    domain.name = `${domainName}.klima`;
    const customImage = await params.contract.getDomainData(domainName);
    console.log("customImage", customImage);
    const imageUrl = customImage ? JSON.parse(customImage).imgAddress : undefined;
    console.log("imageUrl", imageUrl);
    if (customImage && imageUrl) {
      domain.image = JSON.parse(customImage).imgAddress;
    } else {
      const domains = await params.contract.domains(domainName);
      console.log("domains", domains);
      const tokenId = domains.tokenId;
      // if no image is in getDomainData get metadata from tokenURI and parse+decode it
      const domainData = await params.contract.tokenURI(tokenId);
      console.log("domainData", domainData);
      const domainDataDecoded = parseURL(domainData);
      const domainMetadata = atob(domainDataDecoded!.data);
      console.log("domainDataDecoded", domainDataDecoded);
      // base64 decode metadata and get default image
      const decodedDefaultImage = atob(
        parseURL(JSON.parse(domainMetadata).image)!.data
      );
      domain.defaultImage = decodedDefaultImage;
    }
  } catch (error: any) {
    console.log("kns error", error);
  }
  return domain;
};
export const getEns = async (params: { address: string }): Promise<Domain> => {
  const ethProvider = ethers.getDefaultProvider(1);
  const ens: any = {};
  try {
    const ensDomain: string | null = await ethProvider.lookupAddress(
      params.address
    );
    if (ensDomain) {
      const avatar = ethProvider.getAvatar(ensDomain);
      ens.avatar = avatar;
    }
    if (ensDomain) {
      ens.name = `${ensDomain}`;
    }
  } catch (error: any) {
    console.log("ens error", error);
  }
  return ens;
};

interface ParsedDataUrl {
  data: string;
  contentType: string;
  mediaType: string;
  base64: string;
}

// urls are returned as data url so this parses the url and returns an object of type ParsedDataUrl
const parseURL = (url: string): ParsedDataUrl | undefined => {
  const regex =
    /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i;
  if (!regex.test((url || "").trim())) {
    return undefined;
  }
  const parts = url.trim().match(regex);
  const parsed: any = {};
  if (!parts) {
    return undefined;
  }
  if (parts[1]) {
    parsed.mediaType = parts[1].toLowerCase();

    const mediaTypeParts = parts[1]
      .split(";")
      .map((x: string) => x.toLowerCase());

    parsed.contentType = mediaTypeParts[0];

    mediaTypeParts.slice(1).forEach((attribute) => {
      const p = attribute.split("=");
      parsed[p[0]] = p[1];
    });
  }

  parsed.base64 = !!parts[parts.length - 2];
  parsed.data = parts[parts.length - 1] || "";

  parsed.toBuffer = () => {
    const encoding = parsed.base64 ? "base64" : "utf8";

    return Buffer.from(parsed.data, encoding);
  };

  return parsed;
};
