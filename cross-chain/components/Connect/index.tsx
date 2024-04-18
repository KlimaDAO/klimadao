import { cx } from "@emotion/css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import * as styles from "./styles";

/* example from https://www.rainbowkit.com/docs/custom-connect-button */
export const Connect = () => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== "loading";
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === "authenticated");

      return (
        <div
          {...(!ready && { "aria-hidden": true })}
          className={cx({ [styles.connectWrapper]: !ready })}
        >
          {(() => {
            if (!connected) {
              return (
                <ButtonPrimary
                  label="Login / Connect"
                  onClick={openConnectModal}
                  className={styles.connectButton}
                />
              );
            }
            if (chain.unsupported) {
              return (
                <ButtonPrimary
                  label="Wrong network"
                  onClick={openChainModal}
                  className={styles.connectButton}
                />
              );
            }
            return (
              <div className={styles.buttons}>
                <ButtonPrimary
                  className={styles.networkSwitchButton}
                  onClick={openChainModal}
                  label={chain.name}
                  icon={
                    <div
                      className="icon"
                      style={{ background: chain.iconBackground }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                        />
                      )}
                    </div>
                  }
                />
                <ButtonPrimary
                  label={account.displayName}
                  onClick={openAccountModal}
                  className={styles.connectButton}
                />
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);
