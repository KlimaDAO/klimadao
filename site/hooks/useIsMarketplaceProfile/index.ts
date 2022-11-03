import { useRouter } from "next/router";
import { useWeb3 } from "@klimadao/lib/utils";

export const useIsMarketplaceProfile = (
  userAddress?: string
): { isConnectedProfile: boolean; isUnconnectedProfile: boolean } => {
  const { address, isConnected } = useWeb3();
  const { query } = useRouter();

  if (!userAddress) {
    return {
      isConnectedProfile: false,
      isUnconnectedProfile: false,
    };
  }

  const hasUserInURL = !!query?.user;
  const connectedUser = isConnected && !!address;
  const isConnectedProfile =
    connectedUser && hasUserInURL && address === userAddress;
  const isUnconnectedProfile = hasUserInURL && !isConnectedProfile;

  return {
    isConnectedProfile,
    isUnconnectedProfile,
  };
};
