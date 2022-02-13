import { NextPage } from "next";
import Image from "next/image";

import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";

import * as styles from "./styles";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import mastercard from "public/mastercard.jpg";
import mastercardSmall from "public/mastercard-small.jpg";
import zapper from "public/zapper.jpg";
import zapperSmall from "public/zapper-small.jpg";

import bondCarbon from "public/bond-carbon.jpg";

import { IS_PRODUCTION } from "lib/constants";
import BuyKlimaTimeline from "components/pages/Buy/BuyKlimaTimeline";
import { MutableRefObject, useRef } from "react";
import { urls } from "@klimadao/lib/constants";

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
              How to buy KLIMA
            </Text>
            <Text t="body3" align="center" color="lighter">
              You can get KLIMA in three ways: from decentralized exchanges
              (DEXs), using Visa/Mastercard (coming soon), or by bonding. Check
              which option suits you best.
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
                  src={mastercardSmall}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    Visa / Mastercard
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
                  src={zapperSmall}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    Decentralized Exchange
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
                    Bonding
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
      <Section className={styles.section}>
        <div className={styles.cryptoSafteyTips}>
          <Text t="h4" as="h4" align="center">
            Quick Disclaimer & Safety Tips
          </Text>
          <Text t="body3" color="lighter">
            👉 Please be aware that KLIMA exists only on the blockchain. You are
            the only person in control of your assets. If you are scammed, lose
            your password, make a bad trade, or send to the wrong address, there
            is nothing that can be done to help you. There are no data backups,
            no support hotlines. KlimaDAO cannot assume any responsibility nor
            offer any guarantees.
          </Text>
          <Text t="body3" color="lighter">
            👉 The DAO has no direct control over the market value. Even while
            we actively guide policy, development, liquidity and governance of
            the ecosystem, markets can move independently and with high
            volatility.
          </Text>
          <Text t="body3" color="lighter">
            Here are some measures you can take to keep yourself safe:
          </Text>
          <ul>
            <li>
              <Text t="body3" color="lighter">
                NEVER share your private key or seed phrase with ANYONE, EVER!
              </Text>
            </li>
            <li>
              <Text t="body3" color="lighter">
                Always keep your operating systems, browser, and hardware
                wallets up to date.
              </Text>
            </li>
            <li>
              <Text t="body3" color="lighter">
                Only use bookmarked links - klimadao.finance is the ONLY trusted
                domain. Don't use Google to navigate here. Scammers can steal
                your information by creating websites that look very similar to
                ours, with similar URLs, and by buying ads. We work very hard to
                find these and get them shut down, but you should always be on
                alert!
              </Text>
            </li>
            <li>
              <Text t="body3" color="lighter">
                Use a different browser for crypto than you use for everyday
                browsing.
              </Text>
            </li>
          </ul>
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
              Visa / Mastercard
            </Text>
            <Text t="body3" align="center" color="lighter">
              Use your card directly on our website to buy with 82 different
              traditional currencies - powered by our partners at Mobilum.
              Coming Soon!
            </Text>
            <button disabled={true} className={styles.comingSoonButton}>
              Coming Soon
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
      <Section className={styles.section} variant="gray">
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter">
              002
            </Text>
            <Text t="h2" as="h2" align="center">
              Decentralized exchanges (DEXs)
            </Text>
            <div className={styles.decentralizedExchangeText}>
              <Text t="body3" color="lighter">
                Decentralized exchanges are open marketplaces where you can
                trade KLIMA, and other tokens. They connect buyers and sellers
                directly. As you are not using a trusted third party to
                safeguard funds in the transaction, you will need a wallet to
                use a DEX. Read our Crypto Safety Tips if this is your first
                time using a wallet!
              </Text>
              <Text t="body3" color="lighter">
                There are many different DEXs, so when you interact with KLIMA
                and the carbon economy, we recommend that you use Zapper. Zapper
                is an aggregator of DEXs: rather than browsing through multiple
                websites to find what you're looking for, you can simply connect
                to Zapper, and it will route your trade through the best path
                available
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
              What do I need to buy KLIMA on Zapper?
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
              Bonding
            </Text>
            <Text t="body3" color="lighter">
              Through the process of bonding, you can deposit carbon and receive
              KLIMA at a discounted rate. The Treasury accepts carbon in the
              form of carbon tokens (BCT, MCO2) or Liquidity Pool (LP) tokens
              (KLIMA/BCT, KLIMA/MCO2, KLIMA/USD, BCT/USDC). This is one of the
              ways the Klima Treasury absorbs carbon credits. Head to our app in
              order to purchase KLIMA bonds.
            </Text>
            <ButtonPrimary label="ENTER APP" href={urls.bonds} />
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
      <Footer />
    </>
  );
};
