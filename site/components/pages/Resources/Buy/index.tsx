import { NextPage } from "next";
import Image from "next/image";

import { Text, Section } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";

import * as styles from "./styles";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import mastercard from "public/mastercard.jpg";
import zapper from "public/zapper.jpg";
import bondCarbon from "public/bond-carbon.jpg";

import { IS_PRODUCTION } from "lib/constants";
import BuyKlimaTimeline from "components/BuyKlimaTimeline";
import { MutableRefObject, useRef } from "react";

export type Props = HTMLHtmlElement;

export const Buy: NextPage<Props> = ({}) => {
  const begginerSectionRef = useRef<null | HTMLDivElement>(null);
  const intermediateSectionRef = useRef<null | HTMLDivElement>(null);
  const advancedSectionRef = useRef<null | HTMLDivElement>(null);

  const scrollToNextSection = (ref?: MutableRefObject<HTMLDivElement | null>) =>
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="How to buy KLIMA"
        mediaTitle="How to buy KLIMA"
        metaDescription="How to buy KLIMA"
      />
      <Navigation activePage="Get Klima" />

      <Section variant="gray" className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans>How to buy KLIMA</Trans>
            </Text>
            <Text t="body3" align="center" color="lighter">
              <Trans>
                You can get KLIMA in three ways: from decentralized exchanges
                (DEXs), using Visa/Mastercard (coming soon), or by bonding.
                Check which option suits you best.
              </Trans>
            </Text>
          </div>
          <div className={styles.cardGroup}>
            <div className="cardGroup_stack">
              <button
                onClick={() => scrollToNextSection(begginerSectionRef)}
                className="card"
              >
                <Image
                  alt="Visa / mastercard"
                  src={mastercard}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Visa / Mastercard</Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    Beginner
                  </Text>
                </div>
              </button>
              <button
                onClick={() => scrollToNextSection(intermediateSectionRef)}
                className="card"
              >
                <Image
                  alt="Zapper decentralized exchange"
                  src={zapper}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Decentralized Exchange</Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    Intermediate
                  </Text>
                </div>
              </button>
              <button
                onClick={() => scrollToNextSection(advancedSectionRef)}
                className="card"
              >
                <Image
                  alt="Bond carbon"
                  src={bondCarbon}
                  width={284}
                  height={200}
                  objectFit="contain"
                  placeholder="blur"
                  className="bondCarbon"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Bonding</Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    Advanced
                  </Text>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Section>
      <div ref={begginerSectionRef}></div>
      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter">
              001
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans>Visa / Mastercard</Trans>
            </Text>
            <Text t="body3" align="center" color="lighter">
              <Trans>
                Use your card directly on our website to buy with 82 different
                traditional currencies - powered by our partners at Mobilum.
                Coming Soon!
              </Trans>
            </Text>
            <button disabled={true} className={styles.comingSoonButton}>
              <Trans>Coming Soon</Trans>
            </button>
            <div className={styles.hero}>
              <Image
                alt="Master card"
                src={mastercard}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                className="image"
              />
            </div>
          </div>
        </div>
      </Section>
      <div ref={intermediateSectionRef}></div>
      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter">
              002
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans>Decentralized exchanges (DEXs)</Trans>
            </Text>
            <div className={styles.decentralizedExchangeText}>
              <Text t="body3" color="lighter">
                <Trans>
                  Decentralized exchanges are open marketplaces where you can
                  trade KLIMA, and other tokens. They connect buyers and sellers
                  directly. As you are not using a trusted third party to
                  safeguard funds in the transaction, you will need a wallet to
                  use a DEX. Read our Crypto Safety Tips if this is your first
                  time using a wallet!
                </Trans>
              </Text>
              <Text t="body3" color="lighter">
                <Trans>
                  There are many different DEXs, so when you interact with KLIMA
                  and the carbon economy, we recommend that you use Zapper.
                  Zapper is an aggregator of DEXs: rather than browsing through
                  multiple websites to find what you're looking for, you can
                  simply connect to Zapper, and it will route your trade through
                  the best path available
                </Trans>
              </Text>
            </div>
            <div className={styles.hero}>
              <Image
                alt="Decentralized exchanges"
                src={zapper}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                className="image"
              />
            </div>
            <Text t="h3" as="h3" align="center">
              <Trans>What do I need to buy KLIMA on Zapper?</Trans>
            </Text>
          </div>
          <BuyKlimaTimeline />
        </div>
      </Section>
      <div ref={advancedSectionRef}></div>
      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter">
              003
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans>Bonding</Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans>
                Through the process of bonding, you can deposit carbon and
                receive KLIMA at a discounted rate. The Treasury accepts carbon
                in the form of carbon tokens (BCT, MCO2) or Liquidity Pool (LP)
                tokens (KLIMA/BCT, KLIMA/MCO2, KLIMA/USD, BCT/USDC). This is one
                of the ways the Klima Treasury absorbs carbon credits. Head to
                our Bonding dApp in order to purchase KLIMA bonds.
              </Trans>
            </Text>
            <button disabled={true} className={styles.comingSoonButton}>
              <Trans>Coming Soon</Trans>
            </button>
            <div className={styles.hero}>
              <Image
                alt="Bond"
                src={bondCarbon}
                placeholder="blur"
                layout="fill"
                objectFit="contain"
                className="image"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section className={styles.section}>
        <div className={styles.cryptoSafteyTips}>
          <div className={styles.br} />
          <Text t="h4" as="h4" align="center">
            <Trans>Crypto Safety Tips</Trans>
          </Text>
          <br />
          <Text t="body3" color="lighter">
            <Trans>
              If this is your first time using KLIMA, be sure to read through
              these safety tips. Using a blockchain-based currency gives you
              full control your funds. And with great power comes great
              responsibility.
              <br />
              <br />
              Please be aware that KLIMA exists only on the blockchain. You and
              only you are in control of your funds. If you are scammed, lose
              your password, make a bad trade, or send to the wrong address,
              there is no backup, hotline, or central entity to help you.
              KlimaDAO cannot assume any responsibility. Here are some measures
              you can take to keep yourself safe: Use a different browser for
              crypto investments than you use for everyday browsing. Make sure
              to keep only one tab open in this browser at a time. For example,
              if you use Safari for your regular browsing, use Chrome or Brave
              for your crypto investments. Watch this video for information on
              how to stay secure. Only use links from trustworthy sources, and
              make sure to bookmark them. This is the official KlimaDAO website:
              klimadao.finance. Scammers try to steal your information by
              creating websites that look very similar to ours, with similar
              addresses. We work very hard to find these and get them shut down,
              but you should always be on alert! Always keep your software and
              hardware wallets up to date.
            </Trans>
          </Text>
        </div>
      </Section>
      <Footer />
    </>
  );
};
