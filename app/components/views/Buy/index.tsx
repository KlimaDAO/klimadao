import React, { useState } from "react";
import { providers } from "ethers";
import { Link } from "react-router-dom";
import { Trans, t } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";
import Check from "@mui/icons-material/Check";
import ContentCopy from "@mui/icons-material/ContentCopy";

import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";

import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import * as styles from "./styles";

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
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
              Purchase KLIMA in a few clicks. Our partner Mobilum will send your
              purchased KLIMA to whichever address you provide. Double check
              that you are connected with a secure and private wallet, and that
              the address is correct. After purchase is complete, refresh the
              page and <Link to="/stake">stake</Link> your KLIMA!
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
              disabled={false}
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
            <ButtonPrimary
              label={<Trans id="shared.connect_wallet">Connect wallet</Trans>}
              onClick={props.loadWeb3Modal}
              disabled={false}
              className={styles.submitButton}
            />
          </div>
        )}
      </div>
      <BalancesCard
        assets={["klima", "sklima"]}
        tooltip={t({
          id: "stake.balancescard.tooltip",
          message:
            "Stake your KLIMA tokens to receive sKLIMA. After every rebase, your sKLIMA balance will increase by the given percentage.",
          comment: "Long sentence",
        })}
      />
      <ImageCard />
    </>
  );
};
