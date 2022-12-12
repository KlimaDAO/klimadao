import React, { FC } from "react";
import { providers } from "ethers";

import { concatAddress } from "@klimadao/lib/utils";
import { addresses, urls } from "@klimadao/lib/constants";
import { BASE_URL } from "lib/constants";
import AddToMetaMaskButton from "./AddToMetaMaskButton";
import * as styles from "./styles";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Trans } from "@lingui/macro";
import { Anchor as A, Text } from "@klimadao/lib/components";
import { ImageCard } from "components/ImageCard";
import { CopyAddressButton } from "@klimadao/lib/components";

export interface AddressInfo {
  name: string;
  address: string;
  ariaLabel: string;
  metamaskAriaLabel: string;
  ticker: string;
  image: string;
  decimals: number;
}

interface Props {
  provider?: providers.Web3Provider;
}

const addressInfo: AddressInfo[] = [
  {
    name: "KLIMA Token",
    address: addresses["mainnet"].klima,
    ariaLabel: "Copy KLIMA token address.",
    metamaskAriaLabel: "Add KLIMA token to wallet.",
    ticker: "KLIMA",
    image: `${BASE_URL}/icons/KLIMA.png`,
    decimals: 9,
  },
  {
    name: "sKLIMA Token",
    address: addresses["mainnet"].sklima,
    ariaLabel: "Copy sKLIMA token address.",
    metamaskAriaLabel: "Add sKLIMA token to wallet.",
    ticker: "sKLIMA",
    image: `${BASE_URL}/icons/KLIMA.png`,
    decimals: 9,
  },
  {
    name: "wsKLIMA Token",
    address: addresses["mainnet"].wsklima,
    ariaLabel: "Copy wsKLIMA token address.",
    metamaskAriaLabel: "Add wsKLIMA token to wallet.",
    ticker: "wsKLIMA",
    image: `${BASE_URL}/icons/KLIMA.png`,
    decimals: 18,
  },
  {
    name: "BCT Token",
    address: addresses["mainnet"].bct,
    ariaLabel: "Copy BCT token address.",
    metamaskAriaLabel: "Add BCT token to wallet.",
    ticker: "BCT",
    image: `${BASE_URL}/icons/BCT.png`,
    decimals: 18,
  },
  {
    name: "MCO2 Token",
    address: addresses["mainnet"].mco2,
    ariaLabel: "Copy MCO2 token address.",
    metamaskAriaLabel: "Add MCO2 token to wallet.",
    ticker: "MCO2",
    image: `${BASE_URL}/icons/MCO2.png`,
    decimals: 18,
  },
  {
    name: "UBO Token",
    address: addresses["mainnet"].ubo,
    ariaLabel: "Copy UBO token address.",
    metamaskAriaLabel: "Add UBO token to wallet.",
    ticker: "UBO",
    image: `${BASE_URL}/icons/UBO.png`,
    decimals: 18,
  },
  {
    name: "NBO Token",
    address: addresses["mainnet"].nbo,
    ariaLabel: "Copy NBO token address.",
    metamaskAriaLabel: "Add NBO token to wallet.",
    ticker: "NBO",
    image: `${BASE_URL}/icons/NBO.png`,
    decimals: 18,
  },

  {
    name: "KLIMA/BCT LP",
    address: addresses["mainnet"].klimaBctLp,
    ariaLabel: "Copy KLIMA BCT LP address.",
    metamaskAriaLabel: "Add KLIMA BCT LP to wallet.",
    ticker: "KLIMA/BCT",
    image: `${BASE_URL}/icons/BCT-KLIMA-LP.png`,
    decimals: 18,
  },
];

export const Info: FC<Props> = (props) => (
  <>
    <ImageCard />
    <div className={styles.container}>
      <div className={styles.stakeCard_header}>
        <Text t="h4" as="h1" className={styles.stakeCard_header_title}>
          <InfoOutlined />
          <Trans id="info.info_and_faq">Info & FAQ</Trans>
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="info.common_app_related_questions" comment="Long sentence">
            Common app-related questions and useful links. For comprehensive
            reading on KlimaDAO, see our{" "}
            <A href={urls.officialDocs}>official documentation</A>.
          </Trans>
        </Text>
      </div>

      <div className="infoSection">
        <div style={{ display: "grid", gap: "2.4rem" }}>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            <Text t="h5" as="h2">
              <Trans id="info.app_not_loading.title" comment="Long sentence">
                Why won't the app load for me?
              </Trans>
            </Text>
            <Text t="caption" color="lightest">
              <Trans
                id="info.app_not_loading.if_app_says_loading"
                comment="Long sentence"
              >
                If the app says 'loading...' this is likely a problem with your
                network configuration in Metamask. To fix this:
              </Trans>{" "}
              <br />
              <Trans
                id="info.app_not_loading.1_open_metamask"
                comment="Long sentence"
              >
                1. Open Metamask and switch to Ethereum Mainnet{" "}
              </Trans>
              <br />
              <Trans
                id="info.app_not_loading.2_go_to_settings"
                comment="Long sentence"
              >
                2. Go to Settings/Networks/Polygon and click 'delete'{" "}
              </Trans>
              <br />
              <Trans
                id="info.app_not_loading.3_return_to_app"
                comment="Long sentence"
              >
                3. Return to app.klimadao.finance and click 'switch to mainnet'.{" "}
              </Trans>
              <br />
              <Trans
                id="info.app_not_loading.metamask_should_prompt"
                comment="Long sentence"
              >
                Metamask should prompt you to add Polygon, with the correct RPC
                configuration.
              </Trans>
            </Text>
          </div>
        </div>
      </div>

      <div className="infoSection">
        <Text t="h5" as="h2">
          <Trans id="info.official_contract_addresses">
            Official Contract Addresses
          </Trans>
        </Text>

        <div style={{ display: "grid", gap: "1.2rem" }}>
          {addressInfo.map((info) => (
            <div key={info.address}>
              <p>{info.name}</p>
              <div className="addressRow">
                <A href={`https://polygonscan.com/address/${info.address}`}>
                  {concatAddress(info.address)}
                </A>

                <CopyAddressButton
                  aria-label={info.ariaLabel}
                  address={info.address}
                />

                {typeof props.provider?.provider?.request === "function" &&
                  props.provider.provider.isMetaMask && (
                    <AddToMetaMaskButton
                      info={info}
                      provider={props.provider}
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
