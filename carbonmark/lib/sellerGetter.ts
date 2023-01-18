import { concatAddress } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";

export const getSellerAddress = (
  sellerID: string,
  connectedAddress?: string
) => {
  if (getIsConnectedSeller(sellerID, connectedAddress)) {
    return t({ id: "activity.you", message: "You" });
  }

  return concatAddress(sellerID);
};

export const getIsConnectedSeller = (
  sellerID: string,
  connectedAddress?: string
) =>
  !!connectedAddress &&
  sellerID.toLowerCase() === connectedAddress.toLowerCase();
