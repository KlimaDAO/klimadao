import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import * as styles from "./styles";

export const LoginButton = (props: { className?: string }) => {
  const { address, isConnected, toggleModal, disconnect, initializing } =
    useWeb3();
  const label = initializing ? (
    <Trans>Loading...</Trans>
  ) : !address && !isConnected ? (
    <Trans>Log in</Trans>
  ) : (
    <Trans>Log out</Trans>
  );
  const handleClick = !address && !isConnected ? toggleModal : disconnect;

  return (
    <div className={styles.buttons}>
      <ChangeLanguageButton />
      <ButtonPrimary
        label={label}
        onClick={handleClick}
        className={props.className}
        disabled={initializing}
      />
    </div>
  );
};
