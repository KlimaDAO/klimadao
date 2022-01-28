import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Trans, t } from "@lingui/macro";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Columns,
  Section,
  ContentBox,
  ContentBoxImage,
  HeaderDesktop,
  Footer,
  NavItemDesktop,
  HeaderMobile,
  NavItemMobile,
  ButtonPrimary,
  Text,
} from "@klimadao/lib/components";

import { PageHead } from "components/PageHead";
import { IS_PRODUCTION } from "lib/constants";
import { urls } from "@klimadao/lib/constants";

import forest from "public/forest.jpg";
import cars from "public/cars.jpg";
import gasolina from "public/gasolina.jpg";
import windmills from "public/windmills.jpg";
import oceans from "public/oceans.jpg";
import steams from "public/steams.jpg";
import burningForest from "public/burning-forest.jpg";
import sprouts from "public/sprouts.jpg";
import dummyswap from "public/dummyswap.jpg";

import * as styles from "./styles";
import { ParralaxWormhole } from "./ParralaxWormhole";
export interface Props {
  treasuryBalance: number;
  stakingAPY: number;
  price: number;
}

export const Home: NextPage<Props> = (props) => {
  const formattedTreasuryBalance = props.treasuryBalance.toLocaleString();

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />
      <HeaderDesktop
        link={Link}
        buttons={[
          <ButtonPrimary
            key="Enter App"
            label={t`Enter App`}
            href={urls.app}
          />,
        ]}
      >
        <NavItemDesktop
          url={"/"}
          name={t({ message: "Home", id: "mainNav.home" })}
          link={Link}
          active={true}
        />
        <NavItemDesktop
          url={urls.tutorial}
          name={t({ message: "Buy Klima", id: "mainNav.buyKlima" })}
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemDesktop
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemDesktop
          url={urls.wrap}
          name={t({ message: "Wrap", id: "mainNav.wrap" })}
        />
        <NavItemDesktop
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
        <NavItemDesktop
          url={"/resources"}
          name={t({ message: "Resources", id: "mainNav.resources" })}
          link={Link}
        />
      </HeaderDesktop>
      <HeaderMobile>
        <NavItemMobile
          url={urls.home}
          name={t({ message: "Home", id: "mainNav.home" })}
        />
        <NavItemMobile
          url={urls.tutorial}
          name={t({ message: "Buy Klima", id: "mainNav.buyKlima" })}
          target="_blank"
          rel="noreferrer noopener"
        />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Stake", id: "mainNav.stake" })}
        />
        <NavItemMobile
          url={urls.stake}
          name={t({ message: "Wrap", id: "mainNav.wrap" })}
        />
        <NavItemMobile
          url={urls.bond}
          name={t({ message: "Bond", id: "mainNav.bond" })}
        />
      </HeaderMobile>
      <Section
        variant="gray"
        fillViewport
        style={{ minHeight: "calc(100vh - var(--header-height) * 2);" }}
      >
        <div className={styles.heroSection}>
          <Columns>
            <ContentBox variant="hero">
              <div className="hero_title">
                <Text t="h5" color="lighter">
                  <Trans>👋 WELCOME TO</Trans>
                </Text>
                <Text t="h1">KlimaDAO</Text>
              </div>
              <Text t="body2">
                <Trans>
                  Fight climate change and earn rewards with KLIMA, a digital
                  currency backed by real carbon assets.
                </Trans>
              </Text>
              <div className="hero_button">
                <ButtonPrimary
                  key="Enter App"
                  label={t({ message: "Enter App" })}
                  href={urls.app}
                />
              </div>
            </ContentBox>
            <ContentBoxImage variant="belowTextBox">
              <Image
                alt="Intro"
                src={forest}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
            </ContentBoxImage>
          </Columns>
          <div className="hero_learnMore">
            <p>LEARN MORE</p>
            <ArrowDownwardIcon className="downArrow" />
          </div>
        </div>
      </Section>
      <Section variant="white" style={{ paddingBottom: "unset" }}>
        <div className={styles.blackHoleSection}>
          <div className="blackHole_textGroup">
            <Text t="h2_alt" align="center" color="lightest">
              <Trans>
                KlimaDAO is a <span>black hole for carbon</span> at the center
                of a <span>new green economy</span>.
              </Trans>
            </Text>
            <div className="blackHole_columns">
              <Text t="body2" color="lighter">
                <Trans>
                  We’ve kickstarted a{" "}
                  <span>decentralized and open market for carbon</span>. Our
                  token incentivizes investors, citizens, and organizations to
                  participate in and govern this new economy.
                </Trans>
              </Text>
              <Text t="body2" color="lighter">
                <Trans>
                  By increasing access and demand for carbon offsets, we make
                  pro-climate projects more profitable, while forcing companies
                  to adapt more quickly to the realities of climate change.
                </Trans>
              </Text>
            </div>
          </div>

          <ParralaxWormhole />
        </div>
      </Section>
      <Section variant="gray" fillViewport>
        <div className={styles.mechanicsSection}>
          <div className="mechanics_textGroup">
            <Text t="h2" as="h2">
              <Trans>MECHANICS</Trans>
            </Text>
            <Text t="body2">
              <Trans>
                The DAO sells bonds and distributes profits to KLIMA holders.
                Every bond we sell adds to an ever-growing green treasury, or
                improves liquidity for key environmental assets. A win-win for
                people and planet.
              </Trans>
            </Text>
          </div>
          <div className="mechanics_itemGroup">
            <div className="mechanics_item">
              <Image
                className="mechanics_img shadow-03"
                src={windmills}
                alt="Windmills"
                width={240}
                height={360}
                placeholder="blur"
              />
              <div className="mechanics_label">
                <Text t="h4" color="lighter" className="align-end">
                  /01
                </Text>
                <Text t="h1" className="align-end">
                  <Trans>Backed by Carbon.</Trans>
                </Text>
              </div>
            </div>
            <div className="mechanics_item">
              <Image
                className="mechanics_img shadow-04"
                src={steams}
                alt="Windmills"
                width={240}
                height={360}
                placeholder="blur"
              />
              <div className="mechanics_label">
                <Text t="h4" color="lighter" className="align-start">
                  /02
                </Text>
                <Text t="h1" className="align-start">
                  <Trans>Strong incentives.</Trans>
                </Text>
              </div>
            </div>
            <div className="mechanics_item">
              <Image
                className="mechanics_img shadow-05"
                src={oceans}
                alt="an ocean"
                width={240}
                height={360}
                placeholder="blur"
              />
              <div className="mechanics_label">
                <Text t="h4" color="lighter" className="align-end">
                  /03
                </Text>
                <Text t="h1" className="align-end">
                  <Trans>Massive impact.</Trans>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section variant="white" fillViewport>
        <div className={styles.carbonSection}>
          <div className="carbon_counterGroup">
            <Text t="h3" as="h2" color="lightest" align="center">
              <Trans>
                TONS OF <span>CARBON ABSORBED</span> BY KLIMA
              </Trans>
            </Text>
            <Text className="carbon_counter" align="center">
              <Trans>{formattedTreasuryBalance}</Trans>
            </Text>
          </div>
          <div className="carbon_cardGroup">
            <Text t="h5" align="center">
              <Trans>EQUIVALENT TO</Trans>
            </Text>
            <Columns size="small" wrapItems>
              <div className="carbon_card">
                <Image
                  alt="Forest"
                  src={forest}
                  width={284}
                  height={200}
                  placeholder="blur"
                />
                <div className="carbon_card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Hectares of forest</Trans>
                  </Text>
                  <Text t="h3">1234</Text>
                </div>
              </div>
              <div className="carbon_card">
                <Image
                  alt="Cars"
                  src={cars}
                  width={284}
                  height={200}
                  placeholder="blur"
                />
                <div className="carbon_card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Passenger vehicles</Trans>
                  </Text>
                  <Text t="h3">1234</Text>
                </div>
              </div>
              <div className="carbon_card">
                <Image
                  alt="Gasolina"
                  src={gasolina}
                  width={284}
                  height={200}
                  placeholder="blur"
                />
                <div className="carbon_card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Liters of gasoline</Trans>
                  </Text>
                  <Text t="h3">1234</Text>
                </div>
              </div>
            </Columns>
            <a href={urls.epaSource} rel="noopener noreferrer" target="_blank">
              <Text
                align="center"
                t="caption"
                color="lightest"
                style={{ textDecoration: "underline" }}
              >
                <Trans>Source</Trans>
              </Text>
            </a>
          </div>
        </div>
      </Section>
      <Section className={styles.forestSection}>
        <Image
          src={burningForest}
          layout="fill"
          alt="A burning forest"
          objectFit="cover"
        />
        <Text
          className="forest_label"
          t="h1"
          style={{ color: "white", textTransform: "uppercase" }}
        >
          <Trans>IT’S TIME TO ACT.</Trans>
        </Text>
      </Section>
      <Section variant="white" style={{ paddingBottom: "unset" }}>
        <div className={styles.sproutsSection}>
          <div className="sprouts_col1">
            <Text t="h1" as="h2" uppercase>
              <Trans>Invest in the future.</Trans>
            </Text>
            <Image
              src={sprouts}
              width={420}
              height={340}
              alt="A small cute green sprout in a log"
            />
          </div>
          <div className="sprouts_col2">
            <div>
              <Text t="h4" color="lighter">
                <Trans>001</Trans>
              </Text>
              <div className="sprouts_col2_textGroup">
                <Text t="h2" uppercase>
                  Reserve Asset
                </Text>
                <Text t="h4" color="lightest" uppercase>
                  Of the carbon economy
                </Text>
                <Text t="body2" color="lighter">
                  Every KLIMA token is backed by a real-world carbon asset.
                  Tokens are used to offset carbon emissions, interact with DeFi
                  applications, and get exposure to the rapidly growing global
                  carbon market.
                </Text>
              </div>
            </div>
            <div>
              <Text t="h4" color="lighter">
                <Trans>002</Trans>
              </Text>
              <div className="sprouts_col2_textGroup">
                <Text t="h2" uppercase>
                  6% WEEKLY YIELD
                </Text>
                <Text t="h4" color="lightest" uppercase>
                  FOR TOKEN HOLDERS
                </Text>
                <Text t="body2" color="lighter">
                  KLIMA tokens are minted and distributed automatically every ~7
                  hours to staked KLIMA holders. Grow your KLIMA holdings as we
                  usher in a more sustainable future together.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="gray">
        <div className={styles.buySection}>
          <div className="buy_col1">
            <Text t="h2" as="h2">
              <Trans>BUY KLIMA</Trans>
            </Text>
            <Text t="body2" color="lighter">
              <Trans>
                Invest in Klima and be rewarded for participating in financial
                activism for the climate. Get exposure to the on-chain carbon
                economy today.
              </Trans>
            </Text>
            <ButtonPrimary
              key="See Tutorial"
              label={t`See Tutorial`}
              href={urls.tutorial}
            />
          </div>
          <div className="buy_col2">
            <div className="buy_dummy">
              <Image src={dummyswap} width={764} height={500} alt="" />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="white">
        <div className={styles.newsletterSection}>
          <div className="newsletter_titleGroup">
            <Text t="caption" color="lighter" uppercase>
              <Trans>All the Alpha, straight to your inbox</Trans>
            </Text>
            <Text t="h2" as="h2" uppercase>
              <Trans>Newsletter</Trans>
            </Text>
            <Text t="body2" color="lighter">
              <Trans>
                Get the latest updates on Klima, as we build the future of the
                carbon economy.
              </Trans>
            </Text>
          </div>
          <div className="newsletter_buttonGroup">
            <ButtonPrimary label={t`Sign up`} href={urls.emailSignUp} />
            <Text t="caption" color="lighter">
              <Trans>Never shared. Never spammed.</Trans>
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
