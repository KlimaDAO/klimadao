import React from "react";
import styles from "./Info.module.css";
import t from "../../styles/typography.module.css";

const addresses = {
  klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
  sklima: "0xb0C22d8D350C67420f06F48936654f567C73E8C8",
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  bctusdc: "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
  klimabct: "0x9803c7ae526049210a1725f7487af26fe2c24614"
}

const links = {
  sushiUSDCBCT: `https://app.sushi.com/swap?inputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&outputCurrency=${addresses.bct}`,
  sushiKLIMABCT: `https://app.sushi.com/swap?inputCurrency=${addresses.klima}&outputCurrency=${addresses.bct}`,
  communityHub: "https://klimadao.notion.site/",
  tutorial: "https://klimadao.notion.site/I-m-new-to-Klima-How-do-I-participate-c28426c5100244788f791f62e375ffcc",
  officialDocs: "https://docs.klimadao.finance/"
}

/**
 * @typedef {Object} Props
 * @property {any} provider
 * @property {string} address
 * @property {boolean} isConnected
 */

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function Info() {
  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>{"Info & FAQ"}</h2>
        <p className={t.body2}>Common app-related questions and useful links. For comprehensive reading on KlimaDAO, see our <a target="_blank" href={links.officialDocs}>official docs</a>.</p>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>FAQ</h3>
        <div style={{ display: 'grid', gap: "2.4rem" }}>
          <div style={{ display: 'grid', gap: "0.4rem" }}>
            <h4 className={t.h5}>Where can I get KLIMA?</h4>
            <p className={t.body2}>See our <a target="_blank" href={links.tutorial}>tutorial for newcomers</a>.</p>
          </div>
          <div style={{ display: 'grid', gap: "0.8rem" }}>
            <h4 className={t.h5}>Why won't the dApp load for me?</h4>
            <p className={t.body2}>If the app says 'loading...' this is likely a problem with your network configuration in Metamask. To fix this: <br />
              1. Open Metamask and switch to Ethereum Mainnet <br />
              2. Go to Settings/Networks/Polygon and click 'delete' <br />
              3. Return to dapp.klimadao.finance and click 'switch to mainnet'. <br />
              Metamask should prompt you to add Polygon, with the correct RPC configuration.
            </p>
          </div>
          <div style={{ display: 'grid', gap: "0.8rem" }}>
            <h4 className={t.h5}>Why don't I see my sKLIMA balance?</h4>
            <p className={t.body2}>
              There is a small bug affecting users who staked in the first 18 hours after launch. We have posted <a target="_blank" href="https://klimadao.notion.site/sKLIMA-Bugfix-Instructions-079caaa21f6742daac201781ef5759da">step-by-step instructions</a> to fix the issue.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>OFFICIAL POLYGON ADDRESSES</h3>
        <div style={{ display: 'grid', gap: "0.4rem" }}>
          <div>
            <p>KLIMA Token</p><a target="_blank" href={`https://polygonscan.com/address/${addresses.klima}`}>{addresses.klima}</a>
          </div>
          <div>
            <p>sKLIMA Token</p><a target="_blank" href={`https://polygonscan.com/address/${addresses.sklima}`}>{addresses.sklima}</a>
          </div>
          <div>
            <p>BCT Token</p><a target="_blank" href={`https://polygonscan.com/address/${addresses.bct}`}>{addresses.bct}</a>
          </div>
          <div>
            <p>BCT/USDC Pool</p><a target="_blank" href={`https://polygonscan.com/address/${addresses.bctusdc}`}>{addresses.bctusdc}</a>
          </div>
          <div>
            <p>KLIMA/BCT Pool</p><a target="_blank" href={`https://polygonscan.com/address/${addresses.klimabct}`}>{addresses.klimabct}</a>
          </div>
        </div>
      </div>
      <div className={styles.infoSection}>
        <h3 className={t.overline}>LINKS</h3>
        <div style={{ display: 'grid', gap: "0.4rem" }}>
          <a target="_blank" href={links.sushiUSDCBCT}>🍣 SushiSwap BCT/USDC</a>
          <a target="_blank" href={links.sushiKLIMABCT}>🍣 SushiSwap KLIMA/BCT</a>
          <a target="_blank" href={links.communityHub}>👨‍👩‍👧‍👧 Community Hub (tutorials & more)</a>
          <a target="_blank" href={links.officialDocs}>📚 Official Docs</a>
        </div>
      </div>
    </div>
  );
}

export default Info;
