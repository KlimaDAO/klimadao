import { useWeb3 } from "@klimadao/lib/utils";
import { useRouter } from "next/router";

export const useConnectedUser = (
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
    connectedUser &&
    hasUserInURL &&
    address.toLowerCase() === userAddress.toLowerCase();
  const isUnconnectedUser = hasUserInURL && !isConnectedUser;

  return {
    isConnectedUser,
    isUnconnectedUser,
  };
};
