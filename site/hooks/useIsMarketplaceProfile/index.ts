import { useRouter } from "next/router";
import { useWeb3 } from "@klimadao/lib/utils";

export const useIsMarketplaceProfile = (
  domainName: string | null
): { isConnectedUserProfile: boolean; isUnconnectedUserProfile: boolean } => {
  const { address, isConnected } = useWeb3();
  const { query } = useRouter();

  const hasUserInURL = !!query?.user;
  const hasConnectedUserParams =
    (hasUserInURL && query.user === address) ||
    (hasUserInURL && query.user === domainName);

  const isConnectedUserProfile = isConnected && hasConnectedUserParams;
  const isUnconnectedUserProfile = hasUserInURL && !hasConnectedUserParams;

  return { isConnectedUserProfile, isUnconnectedUserProfile };
};
