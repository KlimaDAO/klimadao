import { useWeb3 } from "@klimadao/lib/utils";
import { useFetchUser } from "hooks/useFetchUser";
import { LO } from "lib/luckyOrange";
import { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

/** A component that tracks user logins  */
export const UserTracker: FC<Props> = (props) => {
  const { address } = useWeb3();
  const { carbonmarkUser, isLoading } = useFetchUser(address);
  useEffect(() => {
    // Start tracking only if we finished loading carbonmarkUser data
    if (address && !isLoading) {
      LO.identify({
        wallet: address,
        user: carbonmarkUser ? carbonmarkUser.handle : undefined,
        name: carbonmarkUser ? carbonmarkUser.username : undefined,
      });
      LO.track("Login");
    }
  }, [isLoading]);
  return <>{props.children}</>;
};
