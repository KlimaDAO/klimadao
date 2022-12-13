import { useRouter } from "next/router";
import { useWeb3 } from "@klimadao/lib/utils";

export const useConnectedMarketplaceUser = (
  userAddress?: string
): { isConnectedUser: boolean; isUnconnectedUser: boolean } => {
  const { address, isConnected } = useWeb3();
  const { query } = useRouter();

  if (!userAddress) {
    return {
      isConnectedUser: false,
      isUnconnectedUser: false,
    };
  }

  const hasUserInURL = !!query?.user;
  const connectedUser = isConnected && !!address;
  const isConnectedUser =
    connectedUser && hasUserInURL && address === userAddress;
  const isUnconnectedUser = hasUserInURL && !isConnectedUser;

  return {
    isConnectedUser,
    isUnconnectedUser,
  };
};
