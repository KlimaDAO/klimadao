import React, { useRef } from "react";
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
import { cards } from "./cards";
import * as styles from "./styles";

export interface Props {
  latestPost: LatestPost;
  treasuryBalance: number;
  weeklyStakingRewards: number;
}

export const Infinity: NextPage<Props> = () => {
  const scrollToRefEnd = useRef<null | HTMLDivElement>(null);
  const scrollToRefStart = useRef<null | HTMLDivElement>(null);
  const scrollToEnd = () =>
    scrollToRefEnd.current &&
    scrollToRefEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const scrollToStart = () => {
    console.log(scrollToRefStart.current);
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

      <Section variant="gray" className={styles.heroSection}>
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
      <Section variant="gray" className={styles.sliderSection}>
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
      <Section variant="gray" className={styles.sliderSection}>
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
      <Footer />
    </>
  );
};
