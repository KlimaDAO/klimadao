import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
// import Link from "next/link";
import { Trans, t } from "@lingui/macro";
import {
  Section,
  ButtonPrimary,
  ButtonSecondary,
  Text,
} from "@klimadao/lib/components";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { LatestPost } from "lib/queries";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaunchIcon from "@mui/icons-material/Launch";
import klimaInfinityLogo from "public/logo-klima-infinity.png";
import klimaInfinityBackground from "public/bg-infinity.png";
import affordableMountain from "public/green-cliff-canyon.png";
import fastMountain from "public/green-mountainside.jpg";
import transparentTrees from "public/trees-and-water.png";
import infiniteNightCliffs from "public/infinite_night_cliffs.png";
import infinityWave from "public/infinity_wave.png";
import hazyWindmills from "public/hazy_windmills.png";
import forestCanopy from "public/forest_canopy.png";
import cars from "public/cars.jpg";
import wavyLines from "public/bg_wavy_lines.png";
import gasPump from "public/gas_pump.png";
import logoForbes from "public/logo-forbes.png";
import logoWired from "public/logo-wired.png";
import logoWSJ from "public/logo-WSJ.png";
import logoBloomberg from "public/logo-Bloomberg.png";
import logoCoinTelegraph from "public/logo-Cointelegraph.png";
import logoNasdaq from "public/logo-Nasdaq.png";
import logoTheTimes from "public/logo-theTimes.png";
import logoYahoo from "public/logo-yahoofinance.png";

import { cards } from "./cards";
import * as styles from "./styles";

export interface Props {
  latestPost: LatestPost;
  treasuryBalance: number;
  weeklyStakingRewards: number;
}

export const Infinity: NextPage<Props> = () => {
  // function useOnScreen(ref: any) {
  //   const [isIntersecting, setIntersecting] = useState(false);

  //   useEffect(() => {
  //     const observer = new IntersectionObserver(([entry]) =>
  //       setIntersecting(entry.isIntersecting)
  //     );
  //     observer.observe(ref.current);
  //     // Remove the observer as soon as the component is unmounted
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, []);
  //   return isIntersecting;
  // }
  const ref = useRef<null | HTMLDivElement>(null);
  const scrollToRefEnd = useRef<null | HTMLDivElement>(null);
  const scrollToRefStart = useRef<null | HTMLDivElement>(null);
  // const isVisible = useOnScreen(ref);
  // console.log(isVisible);
  const scrollToEnd = () =>
    scrollToRefEnd.current &&
    scrollToRefEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const scrollToStart = () => {
    return (
      scrollToRefStart.current &&
      scrollToRefStart.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    );
  };
  const getRef = (index: number, length: number) => {
    if (index === 0) {
      return scrollToRefStart;
    }
    if (index === length - 1) {
      return scrollToRefEnd;
    } else {
      return null;
    }
  };
  const [currentOpenQuestions, setCurrentOpenQuestions] = useState({
    1: false,
    2: false,
    3: false,
  });
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

      <Navigation activePage="Infinity" />

      <Section variant="black" className={styles.heroSection}>
        <div className="hero_blur"></div>
        <div className="hero_container">
          <div className="hero_image_container">
            <Image
              src={klimaInfinityBackground}
              alt="Infinity background "
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="hero_title_container">
            <Image src={klimaInfinityLogo} alt="Klima Infinity logo" />
            <Trans
              id="infinity.welcome_to_infinity"
              comment="<0>WELCOME TO</0><1>KlimaInfinity</1>"
            >
              <Text t="h2" className="hero_title">
                The easiest way to go carbon neutral
              </Text>
              <Text t="body2">
                Klima Infinity is a next-generation carbon toolkit for your
                organization
              </Text>
            </Trans>
            <div className="hero_buttons">
              <ButtonPrimary
                className="hero_button_primary"
                variant="blueRounded"
                label="Get started"
              />
              <ButtonSecondary variant="blueRounded" label="Contact sales" />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.sliderSection}>
        <div className="slider_container">
          <Trans id="infinity.organizations">
            <Text t="h3" className="slider_title">
              Dozens of organizations have offset over 150,000 carbon tonnes
              with Klima Infinity
            </Text>
          </Trans>
          <div className="slider_button_container">
            <div className="slider_arrow" onClick={scrollToStart}>
              <ArrowBackIcon color="secondary" />
            </div>
            <div className="slider_arrow" onClick={scrollToEnd}>
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.sliderSection}>
        <div className="slider_cards_container">
          {cards.map((card, index) => (
            <div
              className="slider_card"
              key={card.link}
              ref={getRef(index, cards.length)}
            >
              <div className="slider_title_container">
                <div className="slider_image_container">
                  <Image layout="intrinsic" src={card.logo} alt="logo" />
                </div>
                <LaunchIcon className="slider_launch_icon" />
              </div>
              <div className="slider_content">
                <Trans id="infinity.quote">
                  <Text t="body4" className="slider_quote">
                    “{card.description}”
                  </Text>
                </Trans>
                <div className="slider_footer">
                  <div>
                    <Trans>
                      <Text t="h3">{card.tonsRetired}k</Text>
                      <Text>Tonnes</Text>
                    </Trans>
                  </div>
                  <Trans>
                    <Text t="badge" className="slider_date">
                      {card.date}
                    </Text>
                  </Trans>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="black" className={styles.infoSection}>
        <div className="info_blur" />
        <div className="info_container">
          <div className="info_left_container">
            <div className="info_image_box_alt">
              <div className="info_image_description">
                <Trans>
                  <Text t="body4">Offset in seconds, with no red tape</Text>
                  <Text t="h2_alt" className="info_image_title">
                    Fast
                  </Text>
                </Trans>
              </div>
              <Image
                src={fastMountain}
                alt="Fast: Offset in seconds, with no red tape"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="info_image_box">
              <div className="info_image_description">
                <Trans>
                  <Text t="body4">Real time pricing, saving 30% or more</Text>
                  <Text t="h2_alt" className="info_image_title">
                    Affordable
                  </Text>
                </Trans>
              </div>
              <Image
                src={affordableMountain}
                alt="Affordable: Real time pricing, saving 30% or more"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="info_right_container">
            <div>
              <Trans>
                <Text t="body6" className="info_subtitle">
                  For the planet's pioneering organizations
                </Text>
                <Text t="h2_alt">
                  The world's most powerful and easy to use offsetting solution
                </Text>
              </Trans>
            </div>
            <div className="info_image_box">
              <div className="info_image_description">
                <Trans>
                  <Text t="body4">Immutably recorded on the blockchain</Text>
                  <Text t="h2_alt" className="info_image_title">
                    Tranparent
                  </Text>
                </Trans>
              </div>
              <Image
                src={transparentTrees}
                alt="Tranparent: Immutably recorded on the blockchain"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.whySection}>
        <div className="why_container">
          <div className="why_left_container">
            <Trans>
              <Text t="body6">Why KlimaDAO?</Text>
              <Text t="h2_alt" className="why_title">
                DeFi that defies climate change
              </Text>
              <Text t="body5">
                KlimaDAO is leveraging a stack of DeFi technologies to reduce
                market fragmentation and accelerate the delivery of climate
                finance to sustainability projects globally.
              </Text>
            </Trans>
          </div>
          <div className="why_right_container">
            <Image
              src={infiniteNightCliffs}
              alt="flashlight shining on dark cliffs"
            />
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.getStartedSection} ref={ref}>
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
              <Trans>
                <Text t="h1" className="getStarted_number">
                  1
                </Text>
                <Text t="h3" className="getStarted_title">
                  Calculate
                </Text>
                <Text t="body6" className="getStarted_description">
                  Calculate your organization's carbon footprint and define the
                  scope of your offset with Klima Infinity.
                </Text>
              </Trans>
            </div>
            <div className="getStarted_section getStarted2">
              <Trans>
                <Text t="h1" className="getStarted_number">
                  2
                </Text>
                <Text t="h3" className="getStarted_title">
                  Implement
                </Text>
                <Text t="body6" className="getStarted_description">
                  Implement your offset with just a few clicks, and with
                  near-instant transaction time.
                </Text>
              </Trans>
            </div>
            <div className="getStarted_section getStarted3">
              <Trans>
                <Text t="h1" className="getStarted_number">
                  3
                </Text>
                <Text t="h3" className="getStarted_title">
                  Amplify
                </Text>
                <Text t="body6" className="getStarted_description">
                  Track your commitment, and amplify awareness around your
                  Climate Positive actions.
                </Text>
              </Trans>
            </div>
          </div>
          <div className="getStarted_right_container">
            <Trans>
              <Text t="h2_alt">
                Accelerate your path to Net Zero - and beyond
              </Text>
            </Trans>
            <ButtonPrimary
              className="getStarted_button"
              variant="blueRounded"
              label="Get started"
            />
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.carouselSection}>
        <div className="carousel_blur" />
        <div className="carousel_container">
          <div className="carousel_left_container">
            <Image
              src={hazyWindmills}
              alt="hazy air and windmills"
              layout="responsive"
              className="carousel_image"
            />
            <Trans>
              <Text t="body3" className="carousel_image_description">
                Wind power project at Jaibhim, India
              </Text>
            </Trans>
          </div>
          <div className="carousel_right_container">
            <Trans>
              <Text t="badge">Support high quality projects</Text>
              <Text t="h2_alt">
                Drive funding to projects that move the needle on climate change
                mitigation
              </Text>
            </Trans>
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.polygonSection}>
        <div className="polygon_blur" />
        <div className="polygon_container">
          <div className="polygon_left_container">
            <Trans>
              <Text t="h2_alt">
                Polygon chose Klima Infinity to offset their blockchain network
              </Text>
              <Text t="body5">
                Polygon offset the network's carbon emissions since inception -
                roughly 90,000 tonnes - and pledged to go carbon negative for
                all of the network's future transactions.
              </Text>
            </Trans>
            <ButtonPrimary label="Read Polygon's Story" />
          </div>
          <div className="polygon_right_container">
            <div className="polygon_full_blox">
              <Trans>
                <Text>The offset is part of Polygon's Green Manifesto</Text>
                <Text t="badge">
                  By offsetting the historical emissions of their entire
                  network, Polygon has ensured that every single interaction
                  with the network - whether an NFT mint or a DeFi transaction -
                  is accounted for and its environmental impact is offset. This
                  is a key reason why Meta chose Polygon to issue its NFTs.
                </Text>
              </Trans>
            </div>
            <div className="polygon_half_blox">
              <Trans>
                <Text>Last Carbon Offset</Text>
                <Text>11k</Text>
                <Text>Tonnes</Text>
              </Trans>
            </div>
            <div className="polygon_half_blox">
              <Trans>
                <Text>Total Carbon Retired</Text>
                <Text>104k</Text>
                <Text>Tonnes</Text>
              </Trans>
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
          <Trans>
            <Text t="h2_alt" align="center" className="mission_header">
              KlimaDAO's mission is to democratize climate action
            </Text>
          </Trans>
          <div className="mission_cards_container">
            <div className="mission_card">
              <div className="mission_card_text">
                <Trans>
                  <Text t="h2_alt" align="center">
                    18.1 million
                  </Text>
                  <Text t="body7" align="center">
                    Carbon tonnes held by KlimaDAO
                  </Text>
                </Trans>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={forestCanopy}
                  alt="forest canopy from above"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="mission_card">
              <div className="mission_card_text">
                <Trans>
                  <Text t="h2_alt" align="center">
                    $10m+
                  </Text>
                  <Text t="body7" align="center">
                    Carbon liquidity held by KlimaDAO
                  </Text>
                </Trans>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={cars}
                  alt="heavy traffic in a city"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="mission_card">
              <div className="mission_card_text">
                <Trans>
                  <Text t="h2_alt" align="center">
                    150,000+
                  </Text>
                  <Text t="body7" align="center">
                    Carbon tonnes offset via KlimaDAO
                  </Text>
                </Trans>
              </div>
              <div className="mission_card_image_box">
                <Image
                  src={gasPump}
                  alt="gas pump handle"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <ButtonPrimary
            label="Visit the KlimaDAO Blog"
            variant="blueRounded"
          />
        </div>
      </Section>
      <Section variant="black" className={styles.featuredSection}>
        <div className="featured_container">
          <Trans>
            <Text t="body4" align="center" className="featured_title">
              KlimaDAO featured on
            </Text>
          </Trans>
          <div className="featured_logo_container">
            <div className="featured_logo_wrapper">
              <Image src={logoForbes} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoWired} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoWSJ} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoBloomberg} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoCoinTelegraph} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoNasdaq} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoTheTimes} alt="" />
            </div>
            <div className="featured_logo_wrapper">
              <Image src={logoYahoo} alt="" />
            </div>
          </div>
        </div>
      </Section>
      <Section className={styles.faqSection}>
        <div className="faq_container">
          {/* <div className="faq_blur" /> */}
          <Trans>
            <Text t="h2_alt" align="center" className="faq_title">
              Frequently Asked Questions
            </Text>
          </Trans>
          <div className="faq_question_container">
            <div className="faq_title_container">
              <Trans>
                <Text>1. What is a carbon offset?</Text>
              </Trans>
              <Text
                className="faq_expand"
                onClick={() =>
                  setCurrentOpenQuestions({
                    ...currentOpenQuestions,
                    1: !currentOpenQuestions[1],
                  })
                }
              >
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[1]}
            >
              <Trans>
                <Text t="body6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna
                  fringilla urna, porttitor
                </Text>
              </Trans>
            </div>
          </div>
          <div className="faq_divider" />
          <div className="faq_question_container">
            <div className="faq_title_container">
              <Trans>
                <Text>
                  2. How does offsetting help in the fight against climate
                  change?
                </Text>
              </Trans>
              <Text
                className="faq_expand"
                onClick={() =>
                  setCurrentOpenQuestions({
                    ...currentOpenQuestions,
                    2: !currentOpenQuestions[2],
                  })
                }
              >
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[2]}
            >
              <Trans>
                <Text t="body6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna
                  fringilla urna, porttitor
                </Text>
              </Trans>
            </div>
          </div>
          <div className="faq_divider" />
          <div className="faq_question_container">
            <div className="faq_title_container">
              <Trans>
                <Text>3. What are carbon markets?</Text>
              </Trans>
              <Text
                className="faq_expand"
                onClick={() =>
                  setCurrentOpenQuestions({
                    ...currentOpenQuestions,
                    3: !currentOpenQuestions[3],
                  })
                }
              >
                +
              </Text>
            </div>
            <div
              className="faq_answer_text"
              data-display={currentOpenQuestions[3]}
            >
              <Trans>
                <Text t="body6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna
                  fringilla urna, porttitor
                </Text>
              </Trans>
            </div>
          </div>
          <div className="faq_button_container">
            <ButtonPrimary
              className="faq_button"
              variant="blueRounded"
              label="Read in-depth FAQs for KI Clients"
            />
          </div>
        </div>
      </Section>
      <Section variant="black" className={styles.ctaSection}>
        <div className="cta_blur" />

        <div className="cta_container">
          <div className="cta_left_container">
            <div className="cta_logo">
              <Image
                src={klimaInfinityLogo}
                alt="Klima Infinity logo"
                layout="responsive"
              />
            </div>
            <Trans>
              <Text t="body7">
                The next-generation carbon toolkit for your organization
              </Text>
            </Trans>
          </div>
          <div className="cta_right_container">
            <ButtonPrimary label="Get Started" variant="blueRounded" />
            <ButtonSecondary label="Contact sales" variant="blueRounded" />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
