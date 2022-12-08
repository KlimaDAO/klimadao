import React, { useState } from "react";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";
import Check from "@mui/icons-material/Check";
import ContentCopy from "@mui/icons-material/ContentCopy";

import {
  Anchor,
  ButtonPrimary,
  Spinner,
  Text,
  ConnectModal,
} from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import * as styles from "./styles";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
}

export const Buy = (props: Props) => {
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const handleCopyAddressClick = (): void => {
    if (props.address) {
      setIsAddressCopied(true);
      navigator.clipboard.writeText(props.address);
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      setTimeout(() => {
        setIsAddressCopied(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className={styles.buyCard}>
        <div className={styles.buyCard_header}>
          <Text t="h4" className={styles.buyCard_header_title}>
            <Payment />
            <Trans id="buy.buy_klima">Buy KLIMA</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="buy.how_to_buy" comment="Long sentence">
              Buy KLIMA directly using our partner,{" "}
              <Anchor href="https://mobilum.com/">Mobilum</Anchor>. Double check
              that you are connected with your own secure wallet, and that the
              provided address is correct.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="buy.data_disclaimer" comment="Long sentence">
              KlimaDAO does not receive any personal data whatsoever. Review the
              Mobilum{" "}
              <Anchor href="https://mobilum.com/privacy-policy/">
                Privacy Policy
              </Anchor>{" "}
              and{" "}
              <Anchor href="https://mobilum.com/terms-and-conditions/">
                Terms and Conditions
              </Anchor>
              .
            </Trans>
          </Text>
        </div>
        {props.isConnected && props.address && (
          <div className={styles.buyCard_iframeStack}>
            <ButtonPrimary
              label={
                !isAddressCopied ? (
                  <>
                    <ContentCopy />
                    <Trans id="shared.copy_wallet_address">
                      Copy Address {concatAddress(props.address)}
                    </Trans>
                  </>
                ) : (
                  <>
                    <Check />
                    <Trans id="shared.wallet_address_copied">Copied!</Trans>
                  </>
                )
              }
              onClick={handleCopyAddressClick}
              className={styles.copyButton}
            />
            <div className={styles.buyCard_iframeContainer}>
              <iframe
                className={styles.buyCard_iframe}
                src={"https://klima.mobilum.com/"}
              ></iframe>
              <div className="spinner_container">
                <Spinner />
              </div>
            </div>
          </div>
        )}
        {!props.isConnected && (
          <div className={styles.buyCard_ui}>
            <Text t="h4" className={styles.buyCard_header_title}>
              <Trans id="buy.not_connected">Not Connected</Trans>
            </Text>
            <Text t="caption" color="lightest">
              <Trans id="buy.connect_wallet" comment="Long sentence">
                You must connect a wallet in order to purchase KLIMA.
              </Trans>
            </Text>
            <ConnectModal
              errorMessage={t({
                message: "We had some trouble connecting. Please try again.",
                id: "connect_modal.error_message",
              })}
              torusText={t({
                message: "or continue with",
                id: "connectModal.continue",
              })}
              titles={{
                connect: t({
                  id: "connect_modal.sign_in",
                  message: "Sign In / Connect",
                }),
                loading: t({
                  id: "connect_modal.connecting",
                  message: "Connecting...",
                }),
                error: t({
                  id: "connect_modal.error_title",
                  message: "Connection Error",
                }),
              }}
              buttonText={t({ id: "shared.connect", message: "Connect" })}
            />
          </div>
        )}
      </div>
      <BalancesCard
        assets={["klima", "sklima"]}
        tooltip={
          <Trans id="stake.balancescard.tooltip" comment="Long sentence">
            Stake your KLIMA tokens to receive sKLIMA. After every rebase, your
            sKLIMA balance will increase by the given percentage.
          </Trans>
        }
      />
      <ImageCard />
    </>
  );
};
