import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Trans, t } from "@lingui/macro";
import {
  Section,
  ButtonPrimary,
  ButtonSecondary,
  Text,
  KlimaInfinityLogo,
} from "@klimadao/lib/components";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { SocialProof } from "components/SocialProof";

import klimaInfinityBackground from "public/bg-infinity.png";
import affordableMountain from "public/green-cliff-canyon.png";
import fastMountain from "public/green-mountainside.jpg";
import transparentTrees from "public/trees-and-water.png";
import PartnersThumbnail from "public/bg-partners.jpg";
import infinityWave from "public/infinity_wave.jpg";
import hazyWindmills from "public/hazy_windmills.png";
import forestCanopy from "public/forest_canopy.png";
import cars from "public/cars.jpg";
import wavyLines from "public/bg_wavy_lines.png";
import gasPump from "public/gas_pump.png";
import greenCloud from "public/green-cloud.png";
import greenFire from "public/green-fire.png";
import logoPolygonInfinity from "public/logo-polygon-infinity.png";
import GetStartedModal from "./GetStartedModal";
import { getImageSizes } from "@klimadao/lib/utils";

import { CardsSlider } from "./Cards/CardsSlider";
import * as styles from "./styles";

import { urls } from "@klimadao/lib/constants";
import { YoutubeEmbed } from "components/YoutubeEmbed";
import { cx } from "@emotion/css";

const linkToBlogFAQ = `${urls.siteBlog}/klima-infinity-faqs`;
const linkToBlogPolygon = `${urls.siteBlog}/polygon-goes-carbon-neutral-via-klimadao`;

export interface Props {
  fixedThemeName: string;
}

export const Infinity: NextPage<Props> = () => {
  const [currentOpenQuestions, setCurrentOpenQuestions] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <PageHead
        title={t({
          id: "infinity.head.title",
          message: "KlimaDAO | Klima Infinity",
        })}
        mediaTitle={t({
          id: "infinity.head.metaTitle",
          message: `Klima Infinity - Go carbon neutral`,
        })}
        metaDescription={t({
          id: "infinity.head.metaDescription",
          message: "A next-generation carbon toolkit for your organization.",
        })}
      />

      <Navigation activePage="Infinity" showThemeToggle={false} transparent />

      <GetStartedModal showModal={showModal} setShowModal={setShowModal} />

      <Section variant="black" className={styles.gradientBackgroundTop}>
        <div className={styles.heroSection}>
          <div className="hero_container">
            <div className="hero_image_container">
              <Image
                src={klimaInfinityBackground}
                alt="Infinity background"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="hero_title_container">
              <div className={styles.heroKlimaLogo}>
                <KlimaInfinityLogo />
              </div>
              <Text t="h2" className="hero_title">
                <Trans id="infinity.welcome_title">
                  The easiest way to go carbon neutral
                </Trans>
              </Text>
              <Text t="body2">
                <Trans id="infinity.welcome_subtitle">
                  Klima Infinity is a next-generation carbon toolkit for your
                  organization
                </Trans>
              </Text>
              <div className="hero_buttons">
                <ButtonPrimary
                  className="hero_button_primary"
                  variant="blueRounded"
                  label={t({
                    message: "Get Started",
                    id: "shared.infinity.get_started",
                  })}
                  onClick={() => setShowModal(true)}
                />
                <ButtonSecondary
                  variant="blueRounded"
                  label={t({
                    message: "Contact Sales",
                    id: "shared.contact_sales",
                  })}
                  href={urls.klimaInfinityContactForm}
                  target="_blank"
                />
              </div>
            </div>
          </div>
        </div>
        <CardsSlider />
      </Section>

      <Section variant="black" className={styles.infoSection}>
        <div className="info_container">
          <div className="info_left_container">
            <div className="info_image_box_alt">
              <div className="info_image_description">
                <Text t="body4">
                  <Trans id="infinity.fast_subtitle">
                    Offset in seconds, with no red tape
                  </Trans>
                </Text>
                <Text t="h2_alt" className="info_image_title">
                  <Trans id="infinity.fast_title">Fast</Trans>
                </Text>
              </div>
              <Image
                src={fastMountain}
                alt="Fast: Offset in seconds, with no red tape"
                layout="fill"
                objectFit="cover"
                sizes={getImageSizes({ large: "404px" })}
                placeholder="blur"
              />
            </div>
            <div className="info_image_box">
              <div className="info_image_description">
                <Text t="body4">
                  <Trans id="infinity.affordable_title">
                    Real-time pricing, low transaction costs
                  </Trans>
                </Text>
                <Text t="h2_alt" className="info_image_title">
                  <Trans id="infinity.affordable_subtitle">Affordable</Trans>
                </Text>
              </div>
              <Image
                src={affordableMountain}
                alt="Affordable: Real time pricing, saving 30% or more"
                layout="fill"
                objectFit="cover"
                sizes={getImageSizes({ large: "504px" })}
                placeholder="blur"
              />
            </div>
          </div>
          <div className="info_right_container">
            <div className="info_title_container">
              <Text t="body6" className="info_subtitle">
                <Trans id="infinity.info_subtitle1">
                  For the planet's pioneering organizations
                </Trans>
              </Text>
              <Text t="h2_alt">
                <Trans id="infinity.info_subtitle2">
                  The world's most powerful and easy-to-use offsetting solution
                </Trans>
              </Text>
            </div>
            <div className="info_image_box">
              <div className="info_image_description">
                <Text t="body4">
                  <Trans id="infinity.transparent_title">
                    Immutably recorded on the blockchain
                  </Trans>
                </Text>
                <Text t="h2_alt" className="info_image_title">
                  <Trans id="infinity.transparent_subtitle">Transparent</Trans>
                </Text>
              </div>
              <Image
                src={transparentTrees}
                alt="Tranparent: Immutably recorded on the blockchain"
                layout="fill"
                objectFit="cover"
                sizes={getImageSizes({ large: "504px" })}
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section variant="black" className={styles.whySection}>
        <div className="why_container">
          <div className="why_left_container">
            <Text t="caption">
              <Trans id="infinity.why_title">Why KlimaDAO?</Trans>
            </Text>
            <Text t="h2_alt" className="why_title">
              <Trans id="infinity.why_subtitle">
                DeFi that defies climate change
              </Trans>
            </Text>
            <Text t="body5">
              <Trans id="infinity.why_description">
                KlimaDAO is leveraging a stack of DeFi technologies to reduce
                market fragmentation and accelerate the delivery of climate
                finance to sustainability projects worldwide.
              </Trans>
            </Text>
          </div>
          <div className="why_right_container">
            <YoutubeEmbed
              videoId="eRmmDh1ingU"
              hideControls
              hideFullscreen
              posterImg={{
                src: PartnersThumbnail,
                alt: "various klimaDAO partners",
              }}
            />
          </div>
        </div>
      </Section>

      <Section variant="black" className={styles.getStartedSection}>
        <Image
          src={infinityWave}
          alt="waves on the sand"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="getStarted_image"
        />
        <div className="getStarted_container">
          <div className="getStarted_left_container">
            <div className="getStarted_section getStarted1">
              <Text t="h1" className="getStarted_number">
                <Trans id="infinity.getStarted_1">1</Trans>
              </Text>
              <Text t="h3" className="getStarted_title">
                <Trans id="infinity.getStarted_calculate">Calculate</Trans>
              </Text>
              <Text t="body2" className="getStarted_description">
                <Trans id="infinity.getStarted_calculate_subtitle">
                  Calculate your organization's carbon footprint and define the
                  scope of your offset with Klima Infinity.
                </Trans>
              </Text>
            </div>
            <div className="getStarted_section getStarted2">
              <Text t="h1" className="getStarted_number">
                <Trans id="infinity.getStarted_2">2</Trans>
              </Text>
              <Text t="h3" className="getStarted_title">
                <Trans id="infinity.getStarted_second_title">Implement</Trans>
              </Text>
              <Text t="body2" className="getStarted_description">
                <Trans id="infinity.getStarted_second_subtitle">
                  Implement your offset with just a few clicks, and with
                  near-instant transaction time.
                </Trans>
              </Text>
            </div>
            <div className="getStarted_section getStarted3">
              <Text t="h1" className="getStarted_number">
                <Trans id="infinity.getStarted_third">3</Trans>
              </Text>
              <Text t="h3" className="getStarted_title">
                <Trans id="infinity.getStarted_third_title">Amplify</Trans>
              </Text>
              <Text t="body2" className="getStarted_description">
                <Trans id="infinity.getStarted_third_subtitle">
                  Track your commitment, and amplify awareness around your
                  Climate Positive actions.
                </Trans>
              </Text>
            </div>
          </div>
          <div className="getStarted_right_container">
            <Text t="h2_alt">
              <Trans id="infinity.getStarted_cta">
                Accelerate your path to carbon neutral - and beyond
              </Trans>
            </Text>
            <ButtonPrimary
              className="getStarted_button"
              variant="blueRounded"
              label={t({
                message: "Get Started",
                id: "shared.infinity.get_started",
              })}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </Section>

      <Section variant="black" className={styles.carouselSection}>
        <div className="carousel_container">
          <div className="carousel_left_container">
            <Image
              src={hazyWindmills}
              alt="hazy air and windmills"
              layout="responsive"
              className="carousel_image"
              sizes={getImageSizes({ large: "616px" })}
              placeholder="blur"
            />
            <Text t="body3" className="carousel_image_description">
              <Trans id="infinity.carousel_image_description">
                Wind power project at Jaibhim, India
              </Trans>
            </Text>
          </div>
          <div className="carousel_right_container">
            <Text t="caption">
              <Trans id="infinity.carousel_info_title">
                Support high quality projects
              </Trans>
            </Text>
            <Text t="h2_alt">
              <Trans id="infinity.carousel_info_subtitle">
                Drive funding to projects that move the needle on climate change
                mitigation
              </Trans>
            </Text>
          </div>
        </div>
      </Section>

      <Section variant="black" className={styles.polygonSection}>
        <div className="polygon_container">
          <div className="polygon_left_container">
            <Text t="h2_alt">
              <Trans id="infinity.polygon_story_title">
                Polygon chose Klima Infinity to offset their blockchain network
              </Trans>
            </Text>
            <Text t="body5">
              <Trans id="infinity.polygon_story_description">
                Polygon offset the network's carbon emissions since inception -
                roughly 90,000 tonnes - and pledged to go climate positive for
                all of the network's future transactions.
              </Trans>
            </Text>
            <ButtonPrimary
              label={t({
                id: "infinity.button.read_blog_polygon",
                message: "Read Polygon's Story",
              })}
              className="polygon_button"
              href={linkToBlogPolygon}
            />
          </div>
          <div className="polygon_right_container">
            <div className="polygon_full_blox">
              <div className="polygon_subtitle">
                <Image src={logoPolygonInfinity} alt="green polygon logo" />
                <Text t="body6" color="lightest">
                  <Trans id="infinity.polygon_manifesto_title">
                    The offset is part of Polygon's Green Manifesto
                  </Trans>
                </Text>
              </div>
              <Text t="body6">
                <Trans id="infinity.polygon_manifesto_description">
                  By offsetting the historical emissions of their entire
                  network, Polygon has ensured that every interaction within its
                  network - whether an NFT mint or a DeFi transaction - is taken
                  into account. This is a key reason why Meta chose Polygon to
                  issue its NFTs.
                </Trans>
              </Text>
            </div>
            <div className="polygon_half_blox">
              <div className="polygon_subtitle">
                <Image src={greenCloud} alt="green cloud outline" />
                <Text t="body6" color="lightest">
                  <Trans id="infinity.box_title">Last Carbon Offset</Trans>
                </Text>
              </div>
              <Text className="polygon_number">
                <Trans id="infinity.box_amount_11k">11k</Trans>
              </Text>
              <Text t="body5">
                <Trans id="infinity.tonnes">Tonnes</Trans>
              </Text>
            </div>
            <div className="polygon_half_blox">
              <div className="polygon_subtitle">
                <Image src={greenFire} alt="green fire outline" />
                <Text t="body6" color="lightest">
                  <Trans id="infinity.box_title2">Total Carbon Retired</Trans>
                </Text>
              </div>
              <Text className="polygon_number">
                <Trans id="infinity.box_amount_104k">104k</Trans>
              </Text>
              <Text t="body5">
                <Trans id="infinity.tonnes">Tonnes</Trans>
              </Text>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="black" className={styles.missionSection}>
        <div className="mission_image_container">
          <Image
            src={wavyLines}
            alt="wavy lines in background "
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="mission_container">
          <Text t="h2_alt" align="center" className="mission_header">
            <Trans id="mission.header">
              KlimaDAO's mission is to democratize climate action
            </Trans>
          </Text>
          <div className="mission_cards_container">
            <div className="mission_card">
              <div className="mission_card_text">
                <Text t="h2_alt" align="center">
                  <Trans id="infinity.mission_card1_title">18.1 million</Trans>
                </Text>
                <Text t="body7" align="center">
                  <Trans id="infinity.mission_card1_subtitle">
                    Carbon tonnes held by KlimaDAO
                  </Trans>
                </Text>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={forestCanopy}
                  alt="forest canopy from above"
                  layout="fill"
                  objectFit="cover"
                  sizes={getImageSizes({ desktop: "350px" })}
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="mission_card">
              <div className="mission_card_text">
                <Text t="h2_alt" align="center">
                  <Trans id="infinity.mission_card2_number">$10m+</Trans>
                </Text>
                <Text t="body7" align="center">
                  <Trans id="infinity.mission_card2_description">
                    Carbon liquidity held by KlimaDAO
                  </Trans>
                </Text>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={cars}
                  alt="heavy traffic in a city"
                  layout="fill"
                  objectFit="cover"
                  sizes={getImageSizes({ desktop: "350px" })}
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="mission_card">
              <div className="mission_card_text">
                <Text t="h2_alt" align="center">
                  <Trans id="infinity.mission_card3_number">150,000+</Trans>
                </Text>
                <Text t="body7" align="center">
                  <Trans id="infinity.mission_card3_description">
                    Carbon tonnes offset via KlimaDAO
                  </Trans>
                </Text>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={gasPump}
                  alt="gas pump handle"
                  layout="fill"
                  objectFit="cover"
                  sizes={getImageSizes({ desktop: "350px" })}
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
          <ButtonPrimary
            label={t({
              message: "Visit the KlimaDAO Blog",
              id: "shared.visit_klimadao_blog",
            })}
            variant="blueRounded"
            href={urls.siteBlog}
          />
        </div>
      </Section>

      <Section variant="black">
        <SocialProof />
      </Section>

      <Section className={styles.faqSection}>
        <div className="faq_container">
          <Text t="h2_alt" align="center" className="faq_title">
            <Trans>Frequently Asked Questions</Trans>
          </Text>
          <div className="faq_question_container">
            <div
              className="faq_title_container"
              onClick={() =>
                setCurrentOpenQuestions({
                  ...currentOpenQuestions,
                  1: !currentOpenQuestions[1],
                })
              }
            >
              <Text t="body7">
                <Trans id="infinity.faq_question1">
                  1. What is a carbon offset?
                </Trans>
              </Text>

              <Text t="h3" className="faq_expand">
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[1]}
            >
              <Text t="body6">
                <Trans id="infinity.faq_answer1">
                  A carbon offset unit represents the removal of one tonne of
                  carbon dioxide equivalent (tCO2e) from the atmosphere, or the
                  avoidance of one tonne of emissions.
                </Trans>
              </Text>
            </div>
          </div>
          <div className="faq_divider" />
          <div className="faq_question_container">
            <div
              className="faq_title_container"
              onClick={() =>
                setCurrentOpenQuestions({
                  ...currentOpenQuestions,
                  2: !currentOpenQuestions[2],
                })
              }
            >
              <Text t="body7">
                <Trans id="infinity.faq_question2">
                  2. How does offsetting help in the fight against climate
                  change?
                </Trans>
              </Text>

              <Text t="h3" className="faq_expand">
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[2]}
            >
              <Text t="body6" className="faq_answer2">
                <div>
                  <Trans id="infinity.faq_answer2_paragraph1">
                    Carbon credits are a high-integrity mechanism that allow
                    carbon finance to flow from those who pollute, to projects
                    across the globe that help to mitigate or remove carbon from
                    the atmosphere. They are a valuable tool to cover
                    hard-to-abate emissions that may be costly or technically
                    challenging to eliminate today.
                  </Trans>
                </div>
                <div>
                  <Trans id="infinity.faq_answer2_paragraph2">
                    When you purchase a carbon credit, Klima Infinity enables
                    you to retire this carbon credit, permanently removing it
                    from circulation. This retirement is the point at which you
                    can claim the benefit of the carbon offset.
                  </Trans>
                </div>
                <div>
                  <Trans id="infinity.faq_answer2_paragraph3">
                    Purchased offsets lead to measurable and accountable
                    emissions reductions elsewhere in the economy, and can be
                    used to ‘offset’ an unavoidable carbon footprint. The trade
                    and retirement of carbon credits enables a market mechanism
                    to emerge that puts a price on carbon.
                  </Trans>
                </div>
              </Text>
            </div>
          </div>
          <div className="faq_divider" />
          <div className="faq_question_container">
            <div
              className="faq_title_container"
              onClick={() =>
                setCurrentOpenQuestions({
                  ...currentOpenQuestions,
                  3: !currentOpenQuestions[3],
                })
              }
            >
              <Text t="body7">
                <Trans id="infinity.faq_question3">
                  3. What are carbon markets?
                </Trans>
              </Text>

              <Text t="h3" className="faq_expand">
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[3]}
            >
              <Text t="body6">
                <Trans id="infinity.faq_answer3">
                  The objective of carbon markets is to reduce greenhouse gas
                  (GHG, or “carbon”) emissions cost-effectively by setting
                  limits on emissions and enabling the trading of emission
                  units, which are financial instruments representing emission
                  reductions. Trading enables entities that can reduce emissions
                  at lower cost to be paid to do so by higher-cost emitters,
                  thus lowering the economic cost of reducing emissions.
                </Trans>
              </Text>
            </div>
          </div>
          <div className="faq_button_container">
            <ButtonPrimary
              className="faq_button"
              variant="blueRounded"
              label={t({
                id: "infinity.button.read_blog_faq",
                message: "Read in-depth FAQs for KI Clients",
              })}
              href={linkToBlogFAQ}
            />
          </div>
        </div>
      </Section>

      <Section
        variant="black"
        className={cx(styles.ctaSection, styles.footerContainer)}
      >
        <div className="cta_container">
          <div className="cta_left_container">
            <div className="cta_logo">
              <KlimaInfinityLogo />
            </div>
            <Text t="body7">
              <Trans id="infinity.cta_title">
                The next-generation carbon toolkit for your organization
              </Trans>
            </Text>
          </div>
          <div className="cta_right_container">
            <ButtonPrimary
              label={t({
                message: "Get Started",
                id: "shared.infinity.get_started",
              })}
              variant="blueRounded"
              onClick={() => setShowModal(true)}
            />
            <ButtonSecondary
              label={t({
                message: "Contact Sales",
                id: "shared.contact_sales",
              })}
              variant="blueRounded"
              href={urls.klimaInfinityContactForm}
              target="_blank"
            />
          </div>
        </div>
        <div className={styles.divider} />
        <Footer transparent />
      </Section>
    </>
  );
};
