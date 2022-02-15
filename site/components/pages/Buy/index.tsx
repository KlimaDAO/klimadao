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
      <Navigation activePage="Get KLIMA" />

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
      <Section className={styles.section} style={{ paddingBottom: "5rem" }}>
        <div className={styles.cryptoSafteyTips}>
          <Text t="h4" as="h4" align="center">
            Quick Disclaimer & Safety Tips
          </Text>
          <Text t="body3" color="lighter">
            Please be aware that KLIMA does not hold or control your assets; you
            do. If you are scammed, lose your password/seed phrase, make a bad
            trade, or send assets to the wrong address, KlimaDAO can do nothing
            to undo your personal transactions. There are no backups or support
            hotlines that will be able to reverse completed transactions or
            restore assets that are lost or stolen. KlimaDAO cannot assume any
            responsibility, liability, or offer any guarantees that you will not
            lose your assets while making transactions on the blockchain outside
            of the official KlimaDAO website. In addition, while we actively
            guide policy, development, liquidity, and governance of the KLIMA
            ecosystem, markets can move independently and with high volatility.
          </Text>
          <Text t="body3" color="lighter">
            We recommend that you visit our{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.notion.so/klima-dao/Crypto-Security-101-Advanced-Guide-to-Staying-Safe-in-Crypto-3f577a5b2857428a99caf9470490ad39"
            >
              Crypto Security 101
            </a>{" "}
            page for safety tips before you get started. REMEMBER: never share
            your private key or seed phrase with anyone - neither our members
            nor our dApp will ever ask for or request this from you. While our
            support team may assist you with issues that you have, please note
            that they cannot guarantee the safety or return of any lost funds as
            a result of a scam or a financial loss.
          </Text>
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
            <ButtonPrimary
              label="ENTER APP"
              href={urls.bonds}
              target="_blank"
              rel="noopener noreferrer"
            />
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
