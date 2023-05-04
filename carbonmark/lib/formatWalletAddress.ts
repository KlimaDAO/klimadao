import { concatAddress } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";

export const formatWalletAddress = (
  address: string,
  connectedAddress?: string
) => {
  if (isConnectedAddress(address, connectedAddress)) {
    return t`You`;
  }

  return concatAddress(address);
};

export const isConnectedAddress = (
  sellerID: string,
  connectedAddress?: string
) =>
  !!connectedAddress &&
  sellerID.toLowerCase() === connectedAddress.toLowerCase();
