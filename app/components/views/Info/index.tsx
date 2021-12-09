import React, { useState, useEffect, FC, useRef } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { concatAddress } from "@klimadao/lib/utils";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { addresses, TOKEN_DECIMALS, urls } from "@klimadao/lib/constants";

const CopyAddressButton = (params: { address: string; ariaLabel: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(params.address);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        !!timer && clearTimeout(timer);
      };
    }
  }, [copied]);

  return !copied ? (
    <div>
      <button
        aria-label={params.ariaLabel}
        onClick={handleCopy}
        className={styles.copyAddressButton}
      >
        <FileCopyOutlinedIcon className={styles.copyAddressButtonIcon} />
      </button>
    </div>
  ) : (
    <p>✔️ Copied!</p>
  );
};

const AddTokenButton = (params: {
  address: string;
  symbol: string;
  ariaLabel: string;
}) => {
  let tokenDecimals = TOKEN_DECIMALS;
  const addTokenToWallet = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: params.address,
            symbol: params.symbol,
            decimals: tokenDecimals,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={addTokenToWallet}
        aria-label={params.ariaLabel}
        className={styles.addTokenButton}
      >
        Add to wallet
      </button>
    </div>
  );
};

export const Info: FC = () => {
  const addressInfo = [
    {
      name: "KLIMA Token",
      symbol: "KLIMA",
      address: addresses["mainnet"].klima,
      ariaLabelCopyAddress: "Copy KLIMA token address.",
      ariaLabelAddToken: "Add KLIMA token to the wallet.",
    },
    {
      name: "sKLIMA Token",
      symbol: "sKLIMA",
      address: addresses["mainnet"].sklima,
      ariaLabelCopyAddress: "Copy sKLIMA token address.",
      ariaLabelAddToken: "Add sKLIMA token to the wallet.",
    },
    {
      name: "wsKLIMA Token",
      symbol: "wsKLIMA",
      address: addresses["mainnet"].wsklima,
      ariaLabelCopyAddress: "Copy wsKLIMA token address.",
      ariaLabelAddToken: "Add wsKLIMA token to the wallet.",
    },
    {
      name: "BCT Token",
      symbol: "BCT",
      address: addresses["mainnet"].bct,
      ariaLabelCopyAddress: "Copy BCT token address.",
      ariaLabelAddToken: "Add BCT token to the wallet.",
    },
    {
      name: "BCT/USDC Pool",
      symbol: "BCT/USDC",
      address: addresses["mainnet"].bctUsdcLp,
      ariaLabelCopyAddress: "Copy BCT USDC pool address.",
      ariaLabelAddToken: "Add BCT USDC pool token to the wallet.",
    },
    {
      name: "BCT/KLIMA Pool",
      symbol: "BCT/KLIMA",
      address: addresses["mainnet"].klimaBctLp,
      ariaLabelCopyAddress: "Copy KLIMA BCT pool address.",
      ariaLabelAddToken: "Add KLIMA BCT pool token to the wallet.",
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
        <div style={{ display: "grid", gap: "1rem" }}>
          {addressInfo.map((info) => (
            <div key={info.address}>
              <p>{info.name}</p>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <AddTokenButton
                  ariaLabel={info.ariaLabelAddToken}
                  address={info.address}
                  symbol={info.symbol}
                />
                <div className={styles.addressRow}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://polygonscan.com/address/${info.address}`}
                  >
                    {concatAddress(info.address)}
                  </a>
                  <CopyAddressButton
                    ariaLabel={info.ariaLabelCopyAddress}
                    address={info.address}
                  />
                </div>
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
