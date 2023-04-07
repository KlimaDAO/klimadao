import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";

export const LoginButton = (props: { className?: string }) => {
  const { address, isConnected, toggleModal, disconnect } = useWeb3();
  const label = !address && !isConnected ? t`Log in` : t`Log out`;
  const handleClick = !address && !isConnected ? toggleModal : disconnect;
  return (
    <ButtonPrimary
      label={label}
      onClick={handleClick}
      className={props.className}
    />
  );
};
