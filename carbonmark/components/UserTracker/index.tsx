import { useWeb3 } from "@klimadao/lib/utils";
import { useFetchUser } from "hooks/useFetchUser";
import { LO } from "lib/luckyOrange";
import { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

/** Init the web3Modal and expose via react context  */
export const UserTracker: FC<Props> = (props) => {
  const { address } = useWeb3();
  const { carbonmarkUser } = useFetchUser(address);
  useEffect(() => {
    if (carbonmarkUser) {
      LO.identify("wallet", {
        user: carbonmarkUser.handle,
        name: carbonmarkUser.username,
      });
      LO.track("login");
    }
  }, [carbonmarkUser]);
  return <>{props.children}</>;
};
