import { FC } from "react";
import * as styles from "./styles";
import { Trans } from "@lingui/macro";
import React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

export const MetamaskOnboardButton: FC = () => {
  const onboarding = React.useRef<MetaMaskOnboarding>();
  const [isMetaMaskInstalled, setMetaMaskInstalled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);

  // Initialize MetaMaskOnboarding
  React.useEffect(() => {
    setMetaMaskInstalled(MetaMaskOnboarding.isMetaMaskInstalled());
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  // Check metamask accounts
  React.useEffect(() => {
    function handleNewAccounts(newAccounts: any) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  // Stop onboarding if an account is detected
  React.useEffect(() => {
    if (accounts.length > 0 && onboarding.current) {
      onboarding.current.stopOnboarding();
    }
  }, [accounts]);

  const onClick = () => {
    if (!isMetaMaskInstalled && onboarding.current) {
      onboarding.current.startOnboarding();
    }
  };

  return !isMetaMaskInstalled ? (
    <button type="button" className={styles.connect} onClick={onClick}>
      <Trans id="wallet.metamask_onboard">Need a wallet?</Trans>
    </button>
  ) : (
    <></>
  );
};
