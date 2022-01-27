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
      <Section variant="gray">
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
      <Section variant="white">
        <div className={styles.blackHoleSection}>
          <Text t="h2_alt" align="center" color="lightest">
            <Trans>
              KlimaDAO is a <span>black hole for carbon</span> at the center of
              a <span>new green economy</span>.
            </Trans>
          </Text>
          <Columns variant="contained" size="small">
            <Text t="body2" color="lighter">
              <Trans>
                We’ve kickstarted a{" "}
                <span>decentralized and open market for carbon</span>. Our token
                incentivizes investors, citizens, and organizations to own and
                govern this new economy.
              </Trans>
            </Text>
            <Text t="body2" color="lighter">
              <Trans>
                By increasing access and demand for carbon offsets, we make
                pro-climate projects more profitable, while forcing companies to
                adapt more quickly to the realities of climate change.
              </Trans>
            </Text>
          </Columns>
          <ParralaxWormhole />
        </div>
      </Section>
      <Section variant="gray">
        <div className={styles.mechanicsSection}>
          <Text t="h2" as="h2">
            <Trans>MECHANICS</Trans>
          </Text>
          <Text t="body2">
            <Trans>
              We sell bonds and distribute rewards to KLIMA holders. Every bond
              we sell adds to an ever-growing green treasury, or improves
              liquidity for environmental assets. A win-win for people and
              planet.
            </Trans>
          </Text>
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
              <Text t="h4" color="lighter">
                /01
              </Text>
              <Text t="h1">
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
              <Text t="h4" color="lighter">
                /02
              </Text>
              <Text t="h1">
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
              <Text t="h4" color="lighter">
                /03
              </Text>
              <Text t="h1">
                <Trans>Massive impact.</Trans>
              </Text>
            </div>
          </div>
        </div>
      </Section>
      <Section variant="white">
        <div className={styles.carbonSection}>
          <Text t="h3" as="h2" color="lightest" align="center">
            <Trans>
              TONS OF <span>CARBON ABSORBED</span> BY KLIMA
            </Trans>
          </Text>
          <Text className="carbon_counter" align="center">
            <Trans>{formattedTreasuryBalance}</Trans>
          </Text>
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
                <Text
                  color="lighter"
                  t="caption"
                  style={{ textTransform: "uppercase" }}
                >
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
                <Text
                  color="lighter"
                  t="caption"
                  style={{ textTransform: "uppercase" }}
                >
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
                <Text
                  color="lighter"
                  t="caption"
                  style={{ textTransform: "uppercase" }}
                >
                  <Trans>Liters of gasoline</Trans>
                </Text>
                <Text t="h3">1234</Text>
              </div>
            </div>
          </Columns>
          <Link href={urls.epaSource} passHref>
            <a>
              <Text
                align="center"
                t="caption"
                color="lightest"
                style={{ textDecoration: "underline" }}
              >
                <Trans>Source</Trans>
              </Text>
            </a>
          </Link>
        </div>
      </Section>
      <Section className={styles.forestSection}>
        <Image
          src={burningForest}
          layout="fill"
          width={1600}
          height={640}
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
      <Section variant="white">
        <div className={styles.sproutsSection}>
          <div className="sprouts_col1">
            <Text>
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
              <Text>
                <Trans>001</Trans>
              </Text>
              <Text>Reserve Currency</Text>
              <Text>Of the carbon economy</Text>
              <Text>
                KLIMA tokens are backed by real-world carbon assets, and are
                used to interact with applications, offset carbon emissions,
                borrow, and more.
              </Text>
            </div>
            <div>
              <Text>
                <Trans>002</Trans>
              </Text>
              <Text>6% WEEKLY YIELD</Text>
              <Text>FOR TOKEN HOLDERS</Text>
              <Text>
                KLIMA tokens are minted and distributed automatically every ~7
                hours to staked KLIMA holders. Grow your KLIMA holdings as we
                usher in a more sustainable future together.
              </Text>
            </div>
          </div>
        </div>
      </Section>
      <Section variant="gray">
        <div className={styles.buySection}>
          <div className="buy_col1">
            <Text>
              <Trans>BUY KLIMA</Trans>
            </Text>
            <Text>
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
            <Image src={dummyswap} width={765} height={500} />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
