import {
  Anchor as A,
  ButtonPrimary,
  ButtonSecondary,
  Section,
  Text,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { getImageSizes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { NextPage } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { SocialProof } from "components/SocialProof";
import { createLinkWithLocaleQuery } from "lib/i18n";
import { LatestPost } from "lib/queries";

import burningForest from "public/burning-forest.jpg";
import cars from "public/cars.jpg";
import dummyswap from "public/dummyswap.png";
import forest from "public/forest.jpg";
import gasolina from "public/gasolina.jpg";
import oceans from "public/oceans.jpg";
import sprouts from "public/sprouts.jpg";
import steams from "public/steams.jpg";
import windmills from "public/windmills.jpg";

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
              <Link href={`/blog/${props.latestPost.slug}`} passHref>
                {props.latestPost.title}
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
                <Trans id="home.transparent_neutral" comment="Long sentence">
                  Transparent, neutral, public resources to accelerate climate
                  finance on a global scale.
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
                  id="home.public_good_for_the_planet"
                  comment="Long sentence"
                >
                  Public good for the planet
                </Trans>
              </span>
            </Text>
            <div>
              <Text t="body3" color="lighter" className="klimaVideo_caption">
                <Trans id="home.developed_by_klima" comment="Long sentence">
                  Developed by KlimaDAO, the Digital Carbon Market (DCM) enables
                  the scale-up of climate finance - with over $4 billion traded
                  to date. Explore the DCM via{" "}
                  <A href={urls.carbonmark}>Carbonmark.com</A> - the universal
                  marketplace - and the{" "}
                  <A href={urls.carbonDashboard}>Carbon Dashboard</A>.
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
              id: "shared.dcm_cta",
              message: "EXPLORE THE DCM",
            })}
            href={urls.carbonDashboard}
          />
          <ButtonPrimary
            label={t({
              id: "shared.carbonmark_cta",
              message: "OFFSET YOUR FOOTPRINT",
            })}
            href={urls.carbonmark}
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
              <Trans id="home.benefits">BENEFITS</Trans>
            </Text>
            <Text t="body3">
              <Trans id="home.klima_is_creating" comment="Long sentence">
                KlimaDAO is creating a public and open-source social and
                technology layer to shape the future of the carbon markets.
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
                  <Trans id="home.transparent_and_efficient">
                    Transparent and efficient
                  </Trans>
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
                  <Trans id="home.neutral_and_trusted">
                    Neutral and trusted
                  </Trans>
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
                  <Trans id="home.public_and_open-source">
                    Public and open-source
                  </Trans>
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
                id="home.tonnes_of_carbon_held_by_klimadao"
                comment="TONNES OF <0>CARBON HELD</0> BY KLIMADAO"
              >
                TONNES OF <span>CARBON HELD</span> BY KLIMADAO
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
              <Trans id="home.govern_the_market">
                Govern the market, for the planet
              </Trans>
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
                <Text t="body3" color="lighter">
                  <Trans
                    id="home.join_over_100k_members"
                    comment="Long sentence"
                  >
                    Join over 100,000 members who hold the $KLIMA token, using
                    it to steward KlimaDAO's resources and grow the Digital
                    Carbon Market.
                  </Trans>
                </Text>
              </div>
            </div>
            <div>
              <Text t="h4" color="lighter">
                002
              </Text>
              <div className="sprouts_col2_textGroup">
                <Text t="body3" color="lighter">
                  <Trans
                    id="home.take_climate_action_now"
                    comment="Long sentence"
                  >
                    Take climate action now by using{" "}
                    <A href={urls.carbonmark}>Carbonmark</A> to buy, sell, or
                    retire digital carbon.
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
