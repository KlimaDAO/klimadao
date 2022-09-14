import React from "react";
import { providers } from "ethers";
import { Trans } from "@lingui/macro";
import Payment from "@mui/icons-material/Payment";

import { Anchor, ButtonPrimary, Text } from "@klimadao/lib/components";

import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import * as styles from "./styles";
import Image from "next/image";
import TransakLogoWordmark from "../../../public/transak_logo_wordmark.png";
import MobilumLogoWordmark from "../../../public/mobilum_logo_wordmark.png";
import { useAppDispatch } from "../../../state";
import { setAppState } from "../../../state/app";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
}

export const Buy = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleBuyClick = (serviceName: string) => {
    dispatch(setAppState({ buyModalService: serviceName }));
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
              Buy KLIMA directly using our partners,{" "}
              <Anchor href="https://mobilum.com/">Mobilum</Anchor> and{" "}
              <Anchor href="https://transak.com/">Transak</Anchor>. Double check
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
        {props.isConnected && props.address && (
          <div className={styles.buyCard_service_wrapper}>
            <div className={styles.buyCard_service}>
              <div className={"header"}>
                <div className={"logo"}>
                  <Image
                    src={TransakLogoWordmark}
                    layout={"intrinsic"}
                    objectPosition={"center"}
                    alt={"Transak logo and wordmark"}
                  />
                </div>
              </div>
              <ul>
                <li>
                  <span className={"key"}>Regions:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>All, excluding USA</span>
                </li>
                <li>
                  <span className={"key"}>Fee:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>3%</span>
                </li>
                <li>
                  <span className={"key"}>Minimum buy:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>$1</span>
                </li>
              </ul>
              <button onClick={() => handleBuyClick("transak")}>
                Buy KLIMA
              </button>
            </div>
            <div className={styles.buyCard_service}>
              <div className={"header"}>
                <div className={"logo"}>
                  <Image
                    src={MobilumLogoWordmark}
                    layout={"intrinsic"}
                    alt={"Mobilum logo and wordmark"}
                  />
                </div>
              </div>
              <ul>
                <li>
                  <span className={"key"}>Regions:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>All</span>
                </li>
                <li>
                  <span className={"key"}>Fee:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>6%</span>
                </li>
                <li>
                  <span className={"key"}>Minimum buy:</span>
                  <span>&nbsp;</span>
                  <span className={"value"}>$50</span>
                </li>
              </ul>
              <button onClick={() => handleBuyClick("mobilum")}>
                Buy KLIMA
              </button>
            </div>
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
