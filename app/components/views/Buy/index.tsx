import React from "react";
import { providers } from "ethers";
import { Trans, t } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";
import LoginIcon from "@mui/icons-material/Login";

import { Text, ConnectModal } from "@klimadao/lib/components";

import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import * as styles from "./styles";
import Link from "next/link";
import { urls } from "@klimadao/lib/constants";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
}

export const Buy = (props: Props) => {
  return (
    <>
      <div className={styles.buyCard}>
        <div className={styles.buyCard_header}>
          {props.isConnected && props.address ? (
            <div>
              <Text t="h4" className={styles.buyCard_header_title}>
                <Payment />
                <Trans id="buy.buy_klima">Buy KLIMA</Trans>
              </Text>
              <Text t="caption" className={styles.buyCard_header_subtitle}>
                <Trans id="buy.buy_link_description">
                  To buy Klima, follow the 3 simple steps outlined in
                </Trans>{" "}
                <Link href={urls.buy}>
                  <Trans id="buy.in_article">this article.</Trans>
                </Link>
              </Text>
            </div>
          ) : (
            <>
              <Text t="h4" className={styles.buyCard_header_title}>
                <LoginIcon />
                <Trans id="buy.please_log_in">
                  Please Log In Or Connect A Wallet
                </Trans>
              </Text>
              <Text t="body2">
                <Trans id="buy.connect_to_buy" comment="Long sentence">
                  This feature is available only to users who are logged in. You
                  can log in or create an account via the button below.
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
                buttonText={t({
                  id: "shared.login_connect",
                  message: "Login / Connect",
                })}
                buttonClassName={styles.connect_button}
              />
            </>
          )}
        </div>
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
