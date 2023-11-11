import { useWeb3 } from "@klimadao/lib/utils";
import { useFetchUser } from "hooks/useFetchUser";
import { LO } from "lib/luckyOrange";
import { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

/** A component that tracks user logins  */
export const UserTracker: FC<Props> = (props) => {
  const { address = "", isConnectionFromCache } = useWeb3();
  const { carbonmarkUser, isLoading } = useFetchUser(
    {
      params: { walletOrHandle: address },
    },
    { disabled: !address }
  );
  useEffect(() => {
    // Start tracking only if we finished loading carbonmarkUser data
    if (
      address &&
      !isLoading &&
      carbonmarkUser?.handle &&
      carbonmarkUser.username
    ) {
      LO.identify(address, {
        user: carbonmarkUser.handle,
        name: carbonmarkUser.username,
      });
      if (!isConnectionFromCache) {
        LO.track("Login");
      }
    }
  }, [isLoading]);
  return <>{props.children}</>;
};
