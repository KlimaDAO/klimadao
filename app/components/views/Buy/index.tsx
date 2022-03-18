import React from "react";
import { providers } from "ethers";
import { ImageCard } from "../../ImageCard";
import * as styles from "./styles";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
}

export const Buy = (props: Props) => {
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
              We've partnered with Mobilum so you can purchase Klima with a
              credit card in just a few clicks. After your purchase is complete,
              be sure to stake your KLIMA to start earning rewards. You may need
              to refresh the page to see your new KLIMA balance.
            </Trans>
          </Text>
        </div>
        {props.isConnected && (
          <iframe
            className={styles.buyCard_iframe}
            src={"https://klima.mobilum.com/"}
          ></iframe>
        )}
        {!props.isConnected && (
          <div className={styles.buyCard_ui}>
            <Text t="h4" className={styles.buyCard_header_title}>
              <Trans id="buy.not_connected">Not Connected</Trans>
            </Text>
            <Text t="caption" color="lightest">
              <Trans id="buy.how_to_buy" comment="Long sentence">
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
      <ImageCard />
    </>
  );
};
