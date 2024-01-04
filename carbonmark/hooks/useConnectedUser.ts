import { useWeb3 } from "@klimadao/lib/utils";
import { useRouter } from "next/router";

/**
 * Returns information about the app user
 * isConnectedUser is true if
 *  - the user query param is provided
 *  - there is a wallet connected to the app
 *  - the wallet address the same as the provided userAddress
 * isUnconnectedUser is true if:
 *  - the user query param is provided
 *  - there is no connected wallet
 * @param userAddress
 * @returns
 */
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
