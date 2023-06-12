import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

export const LoginButton = (props: { className?: string }) => {
  const { address, isConnected, toggleModal, disconnect } = useWeb3();
  const label =
    !address && !isConnected ? <Trans>Log in</Trans> : <Trans>Log out</Trans>;
  const handleClick = !address && !isConnected ? toggleModal : disconnect;

  return (
    <div style={{ display: "flex" }}>
      <ChangeLanguageButton />
      <ButtonPrimary
        label={label}
        onClick={handleClick}
        className={props.className}
      />
    </div>
  );
};
