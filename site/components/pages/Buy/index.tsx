import { NextPage } from "next";
import Image from "next/image";

import { useRouter } from "next/router";
import { createLinkWithLocaleQuery } from "lib/i18n";

import {
  Anchor as A,
  Text,
  Section,
  ButtonPrimary,
} from "@klimadao/lib/components";

import * as styles from "./styles";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { ZapperTimeline } from "components/pages/Buy/ZapperTimeline";
import { CreditCardTimeline } from "components/pages/Buy/CreditCardTimeline";
import mastercard from "public/mastercard.jpg";
import mastercardSmall from "public/mastercard-small.jpg";
import zapper from "public/zapper.jpg";
import zapperSmall from "public/zapper-small.jpg";

import bondCarbon from "public/bond-carbon.jpg";

import { MutableRefObject, useRef } from "react";
import { urls } from "@klimadao/lib/constants";
import { t, Trans } from "@lingui/macro";

export type Props = HTMLHtmlElement;

export const Buy: NextPage<Props> = ({}) => {
  const { locale } = useRouter();

  const begginerSectionRef = useRef<null | HTMLDivElement>(null);
  const intermediateSectionRef = useRef<null | HTMLDivElement>(null);
  const advancedSectionRef = useRef<null | HTMLDivElement>(null);

  const scrollToNextSection = (ref?: MutableRefObject<HTMLDivElement | null>) =>
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHead
        title={t({ id: "buy.head.title", message: "How to buy KLIMA" })}
        mediaTitle={t({ id: "buy.head.title", message: "How to buy KLIMA" })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />
      <Navigation activePage="Buy" />

      <Section variant="gray" className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans id="buy.title">How to buy KLIMA</Trans>
            </Text>
            <Text t="body3" align="center" color="lighter">
              <Trans id="buy.subtitle">
                You can get KLIMA in three ways: using a credit card, from
                decentralized exchanges (DEXs), or by bonding carbon assets.
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
                  src={mastercardSmall}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans id="buy.credit_card">Credit Card</Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    <Trans id="buy.beginner">Beginner</Trans>
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
                    <Trans id="buy.decentralized_exchange">
                      Decentralized Exchange
                    </Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    <Trans id="buy.intermediate">Intermediate</Trans>
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
                    <Trans id="buy.bonding">Bonding</Trans>
                  </Text>
                  <Text t="h3" uppercase>
                    <Trans id="buy.advanced">Advanced</Trans>
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
            <Trans id="buy.disclaimer">
              Safety Tips & Important Disclaimer
            </Trans>
          </Text>
          <Text t="body3" color="lighter">
            <Trans id="buy.disclaimer_01">
              Never share your private key or seed phrase with anyone, ever. We
              recommend that you visit our{" "}
              <A href="https://www.notion.so/klima-dao/Crypto-Security-101-Advanced-Guide-to-Staying-Safe-in-Crypto-3f577a5b2857428a99caf9470490ad39">
                Crypto Security 101
              </A>{" "}
              page for safety tips before you get started.
            </Trans>
          </Text>
          <Text t="body3" color="lighter">
            <Trans id="buy.disclaimer_02">
              Blockchain transactions are permanent and irreversible. Our team
              is not able to retrieve lost or stolen assets. KlimaDAO does not
              assume any responsibility, liability, nor offer any guarantees.
              All markets and exchanges operate independently and with high
              volatility.
            </Trans>
          </Text>
        </div>
      </Section>
      <div ref={begginerSectionRef}></div>
      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter" uppercase>
              <Trans id="buy.beginner">Beginner</Trans>
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans id="buy.credit_card">Credit Card</Trans>
            </Text>
            <Text t="body3" align="center" color="lighter">
              <Trans id="buy.credit_card.summary">
                You can now use your credit card to purchase KLIMA tokens
                directly to your wallet! Our payment partners support most major
                currencies.
              </Trans>
            </Text>
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
          <CreditCardTimeline />
        </div>
      </Section>
      <div ref={intermediateSectionRef}></div>
      <Section className={styles.section} variant="gray">
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter" uppercase>
              <Trans id="buy.intermediate">Intermediate</Trans>
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans id="buy.dex">Decentralized exchanges (DEXs)</Trans>
            </Text>
            <div className={styles.decentralizedExchangeText}>
              <Text t="body3" color="lighter">
                <Trans id="buy.dex.summary_01">
                  If you already have a Polygon wallet with MATIC, you can use
                  decentralized exchanges to swap for KLIMA. This helps you to
                  avoid paying extra fees, and represents the fair market price.
                </Trans>
              </Text>
              <Text t="body3" color="lighter">
                <Trans id="buy.dex.summary_02">
                  KLIMA can be found on{" "}
                  <A href="https://app.sushi.com">Sushi Swap</A>, but we
                  recommend that you use a DEX aggregator called Zapper. Just
                  connect your wallet to Zapper, and it will route your trade
                  through the best DEX available.
                </Trans>
              </Text>
            </div>
            <div className={styles.hero}>
              <Image
                alt="Zapper"
                src={zapper}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                className="image"
              />
            </div>
            <Text t="h3" as="h3" align="center">
              <Trans id="buy.dex.how_zapper">
                How do I buy KLIMA on Zapper?
              </Trans>
            </Text>
          </div>
          <ZapperTimeline />
        </div>
      </Section>
      <div ref={advancedSectionRef}></div>
      <Section className={styles.section}>
        <div className={styles.buyContainer}>
          <div className={styles.buy_textGroup}>
            <Text t="h4" align="center" color="lighter" uppercase>
              <Trans id="buy.advanced">Advanced</Trans>
            </Text>
            <Text t="h2" as="h2" align="center">
              <Trans id="buy.bonding">Bonding</Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans id="buy.bonding.description_01">
                Bonding is the process of depositing carbon assets in exchange
                for discounted KLIMA. This is one of the ways the Klima Treasury
                absorbs carbon credits for positive climate impact. Bonding also
                provides the backing for each new KLIMA token.
              </Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans id="buy.bonding.description_02">
                The discount fluctuates depending on market conditions. The
                Treasury accepts carbon in the form of carbon tokens (such as
                UBO, BCT, or MCO2) or Liquidity Pool (LP) tokens (such as
                KLIMA/BCT, KLIMA/MCO2).
              </Trans>
            </Text>
            <ButtonPrimary
              label={t`Enter App`}
              href={createLinkWithLocaleQuery(urls.bonds, locale)}
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
