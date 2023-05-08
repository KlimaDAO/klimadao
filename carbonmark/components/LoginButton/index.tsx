import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { useFetchUser } from "hooks/useFetchUser";
import { LO } from "lib/luckyOrange";
import { useEffect } from "react";

export const LoginButton = (props: { className?: string }) => {
  const { address, isConnected, toggleModal, disconnect } = useWeb3();
  const label = !address && !isConnected ? t`Log in` : t`Log out`;
  const handleClick = !address && !isConnected ? toggleModal : disconnect;
  const { carbonmarkUser } = useFetchUser(address);

  useEffect(() => {
    if (carbonmarkUser) {
      LO.identify("wallet", {
        user: carbonmarkUser.handle,
        name: carbonmarkUser.username,
      });
    }
  }, [carbonmarkUser]);

  return (
    <ButtonPrimary
      label={label}
      onClick={handleClick}
      className={props.className}
    />
  );
};
