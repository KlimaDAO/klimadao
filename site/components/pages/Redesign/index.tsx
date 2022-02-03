import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Trans, t } from "@lingui/macro";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Section, ButtonPrimary, Text } from "@klimadao/lib/components";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
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

const hectaresForestPerTonne = 1 / 200;
const passengerVehiclesPerTonne = 1 / 4.6;
const litersGasPerTonne = 1 / 0.03368173;

export const Home: NextPage<Props> = (props) => {
  const formattedTreasuryBalance = props.treasuryBalance.toLocaleString();
  const hectaresForest = Math.floor(
    props.treasuryBalance * hectaresForestPerTonne
  ).toLocaleString();
  const passengerVehicles = Math.floor(
    props.treasuryBalance * passengerVehiclesPerTonne
  ).toLocaleString();
  const litersGas = Math.floor(
    props.treasuryBalance * litersGasPerTonne
  ).toLocaleString();

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription="Drive climate action and earn rewards with a carbon-backed digital currency."
        mediaImageSrc="/og-media.jpg"
      />

      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.heroSection}>
        <div className="hero_container">
          <div className="hero_cardsGroup">
            <div className="hero_whiteCard">
              <div className="hero_title">
                <Text t="h5" color="lighter">
                  <Trans>👋 WELCOME TO</Trans>
                </Text>
                <Text t="h1" as="h1">
                  KlimaDAO
                </Text>
              </div>
              <Text t="body3">
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
            </div>
            <div className="hero_imageCard">
              <Image
                alt="Intro"
                src={forest}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="hero_learnMore">
            <p>LEARN MORE</p>
            <ArrowDownwardIcon className="downArrow" />
          </div>
        </div>
      </Section>
      <Section variant="white" style={{ paddingBottom: "unset" }}>
        <div className={styles.blackHoleSection}>
          <div className="blackHole_textGroup">
            <Text t="h2_alt" as="h2" color="lightest">
              <Trans>
                KlimaDAO is a <span>black hole for carbon</span> at the center
                of a <span>new green economy</span>.
              </Trans>
            </Text>
            <div className="blackHole_columns">
              <Text t="body3" color="lighter">
                <Trans>
                  We’ve kickstarted a{" "}
                  <span>decentralized and open market for carbon</span>. Our
                  token incentivizes investors, citizens, and organizations to
                  participate in and govern this new economy.
                </Trans>
              </Text>
              <Text t="body3" color="lighter">
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
            <Text t="body3">
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
                className="mechanics_img"
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
                className="mechanics_img"
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
                className="mechanics_img"
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
                TONS OF <span>CARBON ABSORBED</span> BY KLIMADAO
              </Trans>
            </Text>
            <Text className="carbon_counter" align="center">
              {formattedTreasuryBalance}
            </Text>
          </div>
          <div className="carbon_cardGroup">
            <Text t="h5" align="center">
              <Trans>EQUIVALENT TO</Trans>
            </Text>
            <div className="carbon_cardGroup_stack">
              <div className="carbon_card">
                <Image
                  alt="Forest"
                  src={forest}
                  width={284}
                  height={200}
                  objectFit="cover"
                  placeholder="blur"
                />
                <div className="carbon_card_label">
                  <Text color="lighter" t="caption" uppercase>
                    <Trans>Hectares of forest</Trans>
                  </Text>
                  <Text t="h3">{hectaresForest}</Text>
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
                    <Trans>Cars (annual)</Trans>
                  </Text>
                  <Text t="h3">{passengerVehicles}</Text>
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
                  <Text t="h3">{litersGas}</Text>
                </div>
              </div>
            </div>
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
                <Text t="body3" color="lighter">
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
                <Text t="body3" color="lighter">
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
              <Trans>GET KLIMA</Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans>
                Get exposure to the growing carbon economy today. Acquire,
                stake, and get rewarded. Financial activism for the climate.
              </Trans>
            </Text>
            <ButtonPrimary
              key="See Tutorial"
              label={t`See Tutorial`}
              href={urls.tutorial}
              rel="noopener noreferrer"
              target="_blank"
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
            <Text t="body3" color="lighter">
              <Trans>
                Get the latest updates on Klima, as we build the future of the
                carbon economy.
              </Trans>
            </Text>
          </div>
          <div className="newsletter_buttonGroup">
            <ButtonPrimary
              label={t`Sign up`}
              href={urls.emailSignUp}
              rel="noopener noreferrer"
              target="_blank"
            />
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
