import React, { useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Trans, t } from "@lingui/macro";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { urls } from "@klimadao/lib/constants";
import {
  Section,
  ButtonPrimary,
  ButtonSecondary,
  Text,
} from "@klimadao/lib/components";
import { getImageSizes } from "@klimadao/lib/utils";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { SocialProof } from "components/SocialProof";
import { createLinkWithLocaleQuery } from "lib/i18n";
import { LatestPost } from "lib/queries";

import forest from "public/forest.jpg";
import cars from "public/cars.jpg";
import gasolina from "public/gasolina.jpg";
import windmills from "public/windmills.jpg";
import oceans from "public/oceans.jpg";
import steams from "public/steams.jpg";
import burningForest from "public/burning-forest.jpg";
import sprouts from "public/sprouts.jpg";
import dummyswap from "public/dummyswap.png";

import * as styles from "./styles";

export interface Props {
  latestPost: LatestPost;
  treasuryBalance: number;
  monthlyStakingRewards: number;
}

const hectaresForestPerTonne = 1 / 200;
const passengerVehiclesPerTonne = 1 / 4.6;
const litersGasPerTonne = 1 / 0.03368173;

export const Home: NextPage<Props> = (props) => {
  const { locale } = useRouter();

  const formattedTreasuryBalance = props.treasuryBalance.toLocaleString(locale);
  const hectaresForest = Math.floor(
    props.treasuryBalance * hectaresForestPerTonne
  ).toLocaleString(locale);
  const passengerVehicles = Math.floor(
    props.treasuryBalance * passengerVehiclesPerTonne
  ).toLocaleString(locale);
  const litersGas = Math.floor(
    props.treasuryBalance * litersGasPerTonne
  ).toLocaleString(locale);

  const scrollToRef = useRef<null | HTMLDivElement>(null);
  const scrollToNextSection = () =>
    scrollToRef.current &&
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <>
      <PageHead
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />

      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.heroSection}>
        <div className="hero_container">
          {props.latestPost && (
            <div className="hero_newsBanner">
              <Text t="button" align="end">
                <Trans id="home.latest_news">📰 Latest News: </Trans>
              </Text>
              <Link href={`/blog/${props.latestPost.slug}`}>
                <a>{props.latestPost.title}</a>
              </Link>
            </div>
          )}

          <div className="hero_cardsGroup">
            <div className="hero_whiteCard">
              <div className="hero_title">
                <Trans
                  id="home.welcome_to_klimadao"
                  comment="<0>WELCOME TO</0><1>KlimaDAO</1>"
                >
                  <Text t="h5" color="lighter">
                    WELCOME TO
                  </Text>
                  <Text t="h1" as="h1">
                    KlimaDAO
                  </Text>
                </Trans>
              </div>
              <Text t="body3">
                <Trans id="home.fight_climate_change" comment="Long sentence">
                  Fight climate change and earn rewards with KLIMA, a digital
                  currency backed by real carbon assets.
                </Trans>
              </Text>
              <div className="hero_button">
                <ButtonPrimary
                  key="Enter App"
                  label={t({ id: "shared.enter_app", message: "Enter App" })}
                  href={createLinkWithLocaleQuery(urls.app, locale)}
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
                sizes={getImageSizes({ large: "524px" })}
              />
            </div>
          </div>

          <div className="hero_learnMore">
            <button
              type="button"
              onClick={scrollToNextSection}
              className="hero_scrollToButton"
            >
              <Text>
                <Trans id="home.learn_more">LEARN MORE</Trans>
              </Text>
              <ArrowDownwardIcon className="downArrow" />
            </button>
          </div>
        </div>
      </Section>

      <div ref={scrollToRef}></div>

      <Section variant="white">
        <div className={styles.klimaVideoSection}>
          <div className="klimaVideo_textGroup">
            <Text t="h2_alt" as="h2" color="lightest">
              <span>
                <Trans
                  id="home.klima_defies_climate_change"
                  comment="Long sentence"
                >
                  KlimaDAO is DeFi that defies climate change
                </Trans>
              </span>
            </Text>
            <div>
              <Text t="body3" color="lighter" className="klimaVideo_caption">
                <Trans id="home.klima_is_the_center" comment="Long sentence">
                  KlimaDAO is the center of a new green economy. Built on the
                  energy efficient Polygon network, KlimaDAO uses a stack of
                  technologies to reduce market fragmentation and accelerate the
                  delivery of climate finance to sustainability projects
                  globally.
                </Trans>
              </Text>
            </div>
          </div>
          <div className="klimaVideo_video">
            <iframe
              src="https://www.youtube.com/embed/eRmmDh1ingU?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className={styles.ctaButtonContainer}>
          <ButtonSecondary
            label={t({
              id: "shared.infinity_cta",
              message: "DEFI FOR ORGANIZATIONS",
            })}
            href="/infinity"
          />
          <ButtonPrimary
            label={t({
              id: "shared.loveletter_cta",
              message: "DEFI FOR INDIVIDUALS",
            })}
            href={urls.loveletter}
          />
        </div>

        <div className={styles.socialProofContainer}>
          <SocialProof />
        </div>
      </Section>

      <Section variant="gray" fillViewport style={{ overflow: "hidden" }}>
        <div className={styles.mechanicsSection}>
          <div className="mechanics_textGroup">
            <Text t="h2" as="h2">
              <Trans id="home.mechanics">MECHANICS</Trans>
            </Text>
            <Text t="body3">
              <Trans id="home.the_dao_sell_bonds" comment="Long sentence">
                The DAO sells bonds and distributes rewards to KLIMA holders.
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
                  <Trans id="home.backed_by_carbon">Backed by Carbon.</Trans>
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
                  <Trans id="home.strong_incentives">Strong incentives.</Trans>
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
                  <Trans id="home.massive impact">Massive impact.</Trans>
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
              <Trans
                id="home.tons_of_carbon_absorbed_by_klimadao"
                comment="TONS OF <0>CARBON ABSORBED</0> BY KLIMADAO"
              >
                TONS OF <span>CARBON ABSORBED</span> BY KLIMADAO
              </Trans>
            </Text>
            <Text className="carbon_counter" align="center">
              {formattedTreasuryBalance}
            </Text>
          </div>
          <div className="carbon_cardGroup">
            <Text t="h5" align="center">
              <Trans id="home.equivalent_to">EQUIVALENT TO</Trans>
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
                    <Trans id="home.hectares_of_forest">
                      Hectares of forest
                    </Trans>
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
                    <Trans id="home.cars_annual">Cars (annual)</Trans>
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
                    <Trans id="home.liters_if_gasoline">
                      Liters of gasoline
                    </Trans>
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
                <Trans id="home.source">Source</Trans>
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
          // don't translate this
        >
          IT’S <br />
          TIME <br /> TO ACT.
        </Text>
      </Section>
      <Section variant="white" style={{ paddingBottom: "unset" }}>
        <div className={styles.sproutsSection}>
          <div className="sprouts_col1">
            <Text t="h1" as="h2" uppercase>
              <Trans id="invest_in_the_future">Invest in the future.</Trans>
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
                001
              </Text>
              <div className="sprouts_col2_textGroup">
                <Trans
                  id="home.reserve_asset_of_the_carbon_economy"
                  comment="<0>Reserve Asset</0><1>Of the carbon economy</1>"
                >
                  <Text t="h2" uppercase>
                    Reserve Asset
                  </Text>
                  <Text t="h4" color="lightest" uppercase>
                    Of the carbon economy
                  </Text>
                </Trans>
                <Text t="body3" color="lighter">
                  <Trans
                    id="home.every_klima_token_is_backed"
                    comment="Long sentence"
                  >
                    Every KLIMA token is backed by a real-world carbon asset.
                    Tokens are used to offset carbon emissions, interact with
                    DeFi applications, and get exposure to the rapidly growing
                    global carbon market.
                  </Trans>
                </Text>
              </div>
            </div>
            <div>
              <Text t="h4" color="lighter">
                002
              </Text>
              <div className="sprouts_col2_textGroup">
                <Trans
                  id="home.monthly_rewards_for_token_holders"
                  comment="<0>{0}% MONTHLY REWARDS</0><1>FOR TOKEN HOLDERS</1>"
                >
                  <Text t="h2" uppercase>
                    {props.monthlyStakingRewards}% MONTHLY REWARDS
                  </Text>
                  <Text t="h4" color="lightest" uppercase>
                    FOR TOKEN HOLDERS
                  </Text>
                </Trans>
                <Text t="body3" color="lighter">
                  <Trans
                    id="home.klima_tokens_are_minted"
                    comment="Long sentence"
                  >
                    KLIMA tokens are minted and distributed automatically every
                    ~7 hours to staked KLIMA holders. Grow your KLIMA holdings
                    as we usher in a more sustainable future together.
                  </Trans>
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
              <Trans id="home.get_klima">GET KLIMA</Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans id="home.get_exposure_to_the_growing_carbon_economy">
                Get exposure to the growing carbon economy today. Acquire,
                stake, and get rewarded. Financial activism for the climate.
              </Trans>
            </Text>
            <ButtonPrimary
              key="See Tutorial"
              label={t({ id: "home.see_tutorial", message: "See Tutorial" })}
              href="/buy"
              renderLink={(linkProps) => <Link {...linkProps} />}
            />
          </div>
          <div className="buy_col2">
            <div className="buy_dummy">
              <Image
                src={dummyswap}
                width={710}
                height={597}
                alt="Buy Klima"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="white">
        <div className={styles.newsletterSection}>
          <div className="newsletter_titleGroup">
            <Text t="caption" color="lighter" uppercase>
              <Trans id="home.newletter.all_the_alpha_straight_to_your_inbox">
                All the Alpha, straight to your inbox
              </Trans>
            </Text>
            <Text t="h2" as="h2" uppercase>
              <Trans id="home.newsletter">Newsletter</Trans>
            </Text>
            <Text t="body3" color="lighter">
              <Trans
                id="home.newletter.get_the_latest_updates"
                comment="Long sentence"
              >
                Get the latest updates on KlimaDAO, as we build the future of
                the carbon economy.
              </Trans>
            </Text>
          </div>
          <div className="newsletter_buttonGroup">
            <ButtonPrimary
              label={t({ id: "home.newletter.sign_up", message: "Sign up" })}
              href={urls.emailSignUp}
              rel="noopener noreferrer"
              target="_blank"
            />
            <Text t="caption" color="lighter">
              <Trans id="home.newletter.never_shared_never_spammed">
                Never shared. Never spammed.
              </Trans>
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
