import React, { FC } from "react";
import { providers } from "ethers";

import t from "@klimadao/lib/theme/typography.module.css";
import { concatAddress } from "@klimadao/lib/utils";
import { addresses, urls } from "@klimadao/lib/constants";
import { BASE_URL } from "lib/constants";
import CopyAddressButton from "./CopyAddressButton";
import AddToWalletButton from "./AddToWalletButton";
import styles from "./index.module.css";

interface Props {
  provider: providers.JsonRpcProvider;
}

export const Info: FC<Props> = (props) => {
  const addressInfo = [
    {
      name: "KLIMA Token",
      address: addresses["mainnet"].klima,
      ariaLabel: "Copy KLIMA token address.",
      metamaskAriaLabel: "Add KLIMA token to wallet.",
      ticker: "KLIMA",
      image: `${BASE_URL}/icons/klima-logo.jpeg`,
    },
    {
      name: "sKLIMA Token",
      address: addresses["mainnet"].sklima,
      ariaLabel: "Copy sKLIMA token address.",
      metamaskAriaLabel: "Add sKLIMA token to wallet.",
      ticker: "sKLIMA",
      image: `${BASE_URL}/icons/klima-logo.jpeg`,
    },
    {
      name: "wsKLIMA Token",
      address: addresses["mainnet"].wsklima,
      ariaLabel: "Copy wsKLIMA token address.",
      metamaskAriaLabel: "Add wsKLIMA token to wallet.",
      ticker: "wsKlima",
      image: `${BASE_URL}/icons/klima-logo.jpeg`,
    },
    {
      name: "BCT Token",
      address: addresses["mainnet"].bct,
      ariaLabel: "Copy BCT token address.",
      metamaskAriaLabel: "Add BCT token to wallet.",
      ticker: "BCT",
      image: `${BASE_URL}/icons/bct-logo.jpeg`,
    },
    {
      name: "BCT/USDC Pool",
      address: addresses["mainnet"].bctUsdcLp,
      ariaLabel: "Copy BCT USDC pool address.",
    },
    {
      name: "BCT/KLIMA Pool",
      address: addresses["mainnet"].klimaBctLp,
      ariaLabel: "Copy KLIMA BCT pool address.",
    },
  ];

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>{"Info & FAQ"}</h2>
        <p className={t.body2}>
          Common app-related questions and useful links. For comprehensive
          reading on KlimaDAO, see our{" "}
          <a target="_blank" rel="noreferrer noopener" href={urls.officialDocs}>
            official docs
          </a>
        </p>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>FAQ</h3>
        <div style={{ display: "grid", gap: "2.4rem" }}>
          <div style={{ display: "grid", gap: "0.4rem" }}>
            <h4 className={t.h5}>Where can I get KLIMA?</h4>
            <p className={t.body2}>
              See our{" "}
              <a target="_blank" rel="noreferrer noopener" href={urls.tutorial}>
                tutorial for newcomers
              </a>
              .
            </p>
          </div>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            <h4 className={t.h5}>Why won't the dApp load for me?</h4>
            <p className={t.body2}>
              If the app says 'loading...' this is likely a problem with your
              network configuration in Metamask. To fix this: <br />
              1. Open Metamask and switch to Ethereum Mainnet <br />
              2. Go to Settings/Networks/Polygon and click 'delete' <br />
              3. Return to dapp.klimadao.finance and click 'switch to mainnet'.{" "}
              <br />
              Metamask should prompt you to add Polygon, with the correct RPC
              configuration.
            </p>
          </div>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            <h4 className={t.h5}>Why don't I see my sKLIMA balance?</h4>
            <p className={t.body2}>
              There is a small bug affecting users who staked in the first 18
              hours after launch. We have posted{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://klimadao.notion.site/sKLIMA-Bugfix-Instructions-079caaa21f6742daac201781ef5759da"
              >
                step-by-step instructions
              </a>{" "}
              to fix the issue.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>OFFICIAL POLYGON ADDRESSES</h3>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          {addressInfo.map((info) => (
            <div key={info.address}>
              <p>{info.name}</p>
              <div className={styles.addressRow}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://polygonscan.com/address/${info.address}`}
                >
                  {concatAddress(info.address)}
                </a>
                <CopyAddressButton
                  ariaLabel={info.ariaLabel}
                  address={info.address}
                />
                {info.metamaskAriaLabel && (
                  <AddToWalletButton
                    ariaLabel={info.metamaskAriaLabel}
                    address={info.address}
                    ticker={info.ticker}
                    image={info.image}
                    provider={props.provider}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>LINKS</h3>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <a target="_blank" rel="noopener noreferrer" href={urls.sushiUSDCBCT}>
            🍣 SushiSwap BCT/USDC
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={urls.sushiKLIMABCT}
          >
            🍣 SushiSwap KLIMA/BCT
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.communityHub}>
            👨‍👩‍👧‍👧 Community Hub (tutorials & more)
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.officialDocs}>
            📚 Official Docs
          </a>
        </div>
      </div>
    </div>
  );
};
