import { cx } from "@emotion/css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import * as styles from "./styles";

/* example from https://www.rainbowkit.com/docs/custom-connect-button */
export const Connect: FC<{
  className?: string;
}> = ({ className }) => (
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
      const buttonClassName = cx(styles.connectButton, className);
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
                  label="Connect"
                  onClick={openConnectModal}
                  className={buttonClassName}
                />
              );
            }
            if (chain.unsupported) {
              return (
                <ButtonPrimary
                  label="Wrong network"
                  onClick={openChainModal}
                  className={buttonClassName}
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
                  className={buttonClassName}
                />
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);
